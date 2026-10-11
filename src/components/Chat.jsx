import React, { useEffect, useRef, useState } from 'react';
import { traduzir } from '../content/i18n.js';
import { chatDisponivel, ouvirChat, enviarMensagem } from '../chat.js';

export default function Chat({ idioma, usuario, onFechar }) {
  const t = (k) => traduzir(idioma, k);
  const [msgs, setMsgs] = useState([]);
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (!chatDisponivel()) return;
    const unsub = ouvirChat((lista) => {
      // Ordena crescente por ts
      setMsgs(lista.slice().sort((a, b) => a.ts - b.ts));
    });
    return unsub;
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  async function enviar(ev) {
    ev?.preventDefault();
    if (!texto.trim() || enviando) return;
    if (!usuario || usuario.offline || !chatDisponivel()) return;
    setEnviando(true);
    try {
      await enviarMensagem(usuario.uid, usuario.nome || usuario.email?.split('@')[0] || 'Anônimo', texto);
      setTexto('');
    } catch (e) {
      console.warn(e);
    } finally {
      setEnviando(false);
    }
  }

  const podeEnviar = Boolean(usuario && !usuario.offline && chatDisponivel());

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal modal-chat" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💬 {t('chat.titulo')}</h2>
          <button className="modal-fechar" onClick={onFechar}>✕</button>
        </div>

        <div className="chat-lista" ref={listRef}>
          {!chatDisponivel() && <div className="chat-vazio">{t('chat.desativado')}</div>}
          {chatDisponivel() && !usuario?.uid && <div className="chat-vazio">{t('chat.entrar')}</div>}
          {chatDisponivel() && msgs.length === 0 && <div className="chat-vazio">{t('chat.vazio')}</div>}
          {msgs.map((m) => (
            <div key={m.id} className="chat-msg">
              <span className="chat-nome">{m.nome}</span>
              <span className="chat-texto">{m.texto}</span>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={enviar}>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={t('chat.placeholder')}
            maxLength={200}
            disabled={!podeEnviar}
          />
          <button className="botao primario" type="submit" disabled={!podeEnviar || enviando}>
            {t('chat.enviar')}
          </button>
        </form>
      </div>
    </div>
  );
}
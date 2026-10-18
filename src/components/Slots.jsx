import { useEffect, useRef, useState } from 'react';
import {
  SLOTS, lerSlot, apagarSlot, gravarSlot, exportarSave, lerArquivoSave,
} from '../saves';
import { resumoSlot } from '../engine/jogo';
import { traduzir } from '../content/i18n.js';
import { tocar } from '../audio.js';

export default function Slots({ usuario, usarNuvem, idioma = 'pt', onEscolher, onSair }) {
  const t = (k, v) => traduzir(idioma, k, v);
  const [resumos, setResumos] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [slotImport, setSlotImport] = useState(null);
  const fileInputRef = useRef(null);

  async function recarregar() {
    setCarregando(true);
    const mapa = {};
    for (const s of SLOTS) {
      const dados = await lerSlot(usuario.uid, s, usarNuvem);
      mapa[s] = { resumo: resumoSlot(dados), dados };
    }
    setResumos(mapa);
    setCarregando(false);
  }

  useEffect(() => {
    recarregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function apagar(slot) {
    if (!window.confirm(t('slots.confirmaApagar', { n: slot }))) return;
    tocar('clique');
    await apagarSlot(usuario.uid, slot, usarNuvem);
    recarregar();
  }

  function escolher(slot, continuar) {
    tocar('clique');
    onEscolher(slot, continuar);
  }

  /* ---------- EXPORTAR ---------- */
  async function exportar(slot) {
    try {
      const dados = resumos[slot]?.dados || (await lerSlot(usuario.uid, slot, usarNuvem));
      if (!dados) {
        alert('Este slot está vazio.');
        return;
      }
      exportarSave(dados, slot);
      tocar('moeda');
    } catch (e) {
      alert('Erro ao exportar: ' + e.message);
      tocar('erro');
    }
  }

  /* ---------- IMPORTAR ---------- */
  function pedirImport(slot) {
    tocar('clique');
    setSlotImport(slot);
    // Pequeno delay pra state atualizar antes de abrir o seletor
    setTimeout(() => fileInputRef.current?.click(), 10);
  }

  async function aoEscolherArquivo(ev) {
    const file = ev.target.files?.[0];
    ev.target.value = ''; // permite escolher o mesmo arquivo de novo
    if (!file || slotImport === null) return;

    try {
      const dados = await lerArquivoSave(file);

      const info = `${dados.nome} · Nível ${dados.nivel}`;
      const ok = window.confirm(
        `Importar "${info}" para o slot ${slotImport}?\n\n` +
        `O save atual desse slot será substituído.`,
      );
      if (!ok) return;

      dados.atualizadoEm = Date.now();
      await gravarSlot(usuario.uid, slotImport, dados, usarNuvem);
      tocar('moeda');
      await recarregar();
    } catch (e) {
      alert('Erro ao importar: ' + e.message);
      tocar('erro');
    } finally {
      setSlotImport(null);
    }
  }

  return (
    <div className="tela centro">
      <div className="painel slots">
        <h2 className="titulo-menor">{t('slots.titulo')}</h2>
        <p className="subtitulo">
          {usuario.email || (usuario.offline ? t('slots.modoOffline') : t('slots.convidado'))}
        </p>

        <div className="lista-slots">
          {SLOTS.map((s) => {
            const r = resumos[s]?.resumo;
            const temSave = !!r;
            return (
              <div key={s} className={temSave ? 'card-slot ocupado' : 'card-slot'}>
                <div className="slot-cabecalho">
                  <span className="slot-num">{t('slots.slot')} {s}</span>
                  <div className="slot-acoes">
                    {temSave && (
                      <button
                        className="link-acao"
                        onClick={() => exportar(s)}
                        title="Baixar arquivo .json do save"
                      >
                        ↓ exportar
                      </button>
                    )}
                    <button
                      className="link-acao"
                      onClick={() => pedirImport(s)}
                      title="Subir arquivo .json"
                    >
                      ↑ importar
                    </button>
                    {temSave && (
                      <button className="link-perigo" onClick={() => apagar(s)}>
                        {t('slots.apagar')}
                      </button>
                    )}
                  </div>
                </div>

                {carregando ? (
                  <div className="slot-vazio">{t('slots.carregando')}</div>
                ) : r ? (
                  <>
                    <div className="slot-nome">{r.emoji || ''} {r.nome}</div>
                    <div className="slot-info">Nv {r.nivel} · {r.local}</div>
                    <div className="slot-info">HP {r.hp}/{r.hpMax}</div>
                    <div className="slot-data">
                      {r.atualizadoEm
                        ? new Date(r.atualizadoEm).toLocaleString(idioma === 'en' ? 'en-US' : 'pt-BR')
                        : '—'}
                    </div>
                    <button className="botao primario" onClick={() => escolher(s, true)}>
                      {t('slots.continuar')}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="slot-vazio">{t('slots.vazio')}</div>
                    <button className="botao" onClick={() => escolher(s, false)}>
                      {t('slots.novo')}
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="rodape-painel">
          <button className="botao" onClick={recarregar}>{t('slots.recarregar')}</button>
          <button className="botao" onClick={onSair}>{t('slots.sair')}</button>
        </div>
      </div>

      {/* Input invisível — acionado pelos links "importar" */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={aoEscolherArquivo}
        style={{ display: 'none' }}
      />
    </div>
  );
}

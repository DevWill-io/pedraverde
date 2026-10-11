import React, { useEffect, useState } from 'react';
import { SLOTS, lerSlot, apagarSlot } from '../saves';
import { resumoSlot } from '../engine/jogo';
import { traduzir } from '../content/i18n.js';
import { tocar } from '../audio.js';

export default function Slots({ usuario, usarNuvem, idioma = 'pt', onEscolher, onSair }) {
  const t = (k, v) => traduzir(idioma, k, v);
  const [resumos, setResumos] = useState({});
  const [carregando, setCarregando] = useState(true);

  async function recarregar() {
    setCarregando(true);
    const mapa = {};
    for (const s of SLOTS) {
      const dados = await lerSlot(usuario.uid, s, usarNuvem);
      mapa[s] = resumoSlot(dados);
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

  return (
    <div className="tela centro">
      <div className="painel slots">
        <h2 className="titulo-menor">{t('slots.titulo')}</h2>
        <p className="subtitulo">
          {usuario.email || (usuario.offline ? t('slots.modoOffline') : t('slots.convidado'))}
        </p>

        <div className="lista-slots">
          {SLOTS.map((s) => {
            const r = resumos[s];
            return (
              <div key={s} className={r ? 'card-slot ocupado' : 'card-slot'}>
                <div className="slot-cabecalho">
                  <span className="slot-num">{t('slots.slot')} {s}</span>
                  {r && (
                    <button className="link-perigo" onClick={() => apagar(s)}>
                      {t('slots.apagar')}
                    </button>
                  )}
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
    </div>
  );
}
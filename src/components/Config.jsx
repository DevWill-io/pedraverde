import React, { useState } from 'react';
import { IDIOMAS, traduzir } from '../content/i18n.js';
import { jaInstalado, instalar } from '../pwa.js';

export default function Config({
  idioma, setarIdioma,
  som, setarSom,
  volume, setarVolume,
  musica, setarMusica,
  tema, setarTema,
  temPromptInstalar,
  onFechar,
}) {
  const t = (k) => traduzir(idioma, k);
  const [instalado, setInstalado] = useState(jaInstalado());

  async function tentarInstalar() {
    const ok = await instalar();
    if (ok) setInstalado(true);
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚙ {t('config.titulo')}</h2>
          <button className="modal-fechar" onClick={onFechar}>✕</button>
        </div>

        <div className="modal-corpo">
          <div className="config-linha">
            <label>{t('config.idioma')}</label>
            <div className="config-opcoes">
              {Object.values(IDIOMAS).map((i) => (
                <button
                  key={i.id}
                  className={idioma === i.id ? 'btn-opt ativa' : 'btn-opt'}
                  onClick={() => setarIdioma(i.id)}
                >
                  {i.emoji} {i.nome}
                </button>
              ))}
            </div>
          </div>

          <div className="config-linha">
            <label>{t('config.tema')}</label>
            <div className="config-opcoes">
              <button className={tema === 'escuro' ? 'btn-opt ativa' : 'btn-opt'} onClick={() => setarTema('escuro')}>
                🌙 {t('config.temaEscuro')}
              </button>
              <button className={tema === 'claro' ? 'btn-opt ativa' : 'btn-opt'} onClick={() => setarTema('claro')}>
                ☀ {t('config.temaClaro')}
              </button>
            </div>
          </div>

          <div className="config-linha">
            <label>{t('config.som')}</label>
            <button className={som ? 'btn-toggle on' : 'btn-toggle'} onClick={() => setarSom(!som)}>
              {som ? t('config.sim') : t('config.nao')}
            </button>
          </div>

          <div className="config-linha">
            <label>{t('config.volume')} ({Math.round(volume * 100)}%)</label>
            <input
              type="range" min="0" max="1" step="0.05"
              value={volume}
              onChange={(e) => setarVolume(parseFloat(e.target.value))}
              className="slider"
            />
          </div>

          <div className="config-linha">
            <label>{t('config.musica')}</label>
            <button className={musica ? 'btn-toggle on' : 'btn-toggle'} onClick={() => setarMusica(!musica)}>
              {musica ? t('config.sim') : t('config.nao')}
            </button>
          </div>

          <div className="config-linha">
            <label>📲</label>
            {instalado ? (
              <span className="config-instalado">{t('config.instalado')}</span>
            ) : temPromptInstalar ? (
              <button className="botao primario" onClick={tentarInstalar}>
                {t('config.instalar')}
              </button>
            ) : (
              <span className="config-info">Disponível no Chrome/Edge Android</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { traduzir } from '../content/i18n.js';
import { rankingDisponivel, lerRanking } from '../chat.js';
import { RACAS } from '../content/racas.js';
import { CLASSES } from '../content/classes.js';

export default function Ranking({ idioma, usuario, onFechar }) {
  const t = (k) => traduzir(idioma, k);
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function carregar() {
    setCarregando(true);
    const l = await lerRanking(20);
    setLista(l);
    setCarregando(false);
  }

  useEffect(() => { carregar(); }, []);

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🏆 {t('ranking.titulo')}</h2>
          <button className="modal-fechar" onClick={onFechar}>✕</button>
        </div>

        <div className="ranking-lista">
          {!rankingDisponivel() && <div className="ranking-vazio">{t('ranking.erro')}</div>}
          {rankingDisponivel() && carregando && <div className="ranking-vazio">{t('slots.carregando')}</div>}
          {rankingDisponivel() && !carregando && lista.length === 0 && (
            <div className="ranking-vazio">{t('ranking.vazio')}</div>
          )}
          {lista.map((r, i) => {
            const raca = RACAS[r.raca] || RACAS.humano;
            const classe = CLASSES[r.classe] || CLASSES.guerreiro;
            const ehVoce = usuario && r.uid === usuario.uid;
            const medalha = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}º`;
            return (
              <div key={r.uid || i} className={ehVoce ? 'rank-linha voce' : 'rank-linha'}>
                <span className="rank-pos">{medalha}</span>
                <span className="rank-nome">
                  {raca.emoji}{classe.emoji} {r.nome}
                  {ehVoce && <span className="rank-voce"> ({t('ranking.voce')})</span>}
                </span>
                <span className="rank-nivel">Nv {r.nivel}</span>
              </div>
            );
          })}
        </div>

        <div className="modal-rodape">
          <button className="botao" onClick={carregar}>{t('ranking.atualizar')}</button>
        </div>
      </div>
    </div>
  );
}
// src/components/TelaCriacao.jsx
import { useMemo, useState } from 'react';
import { RACAS } from '../content/racas.js';
import { CLASSES } from '../content/classes.js';
import { MAGIAS } from '../content/magias.js';
import { traduzir } from '../content/i18n.js';
import { tocar } from '../audio.js';

export default function TelaCriacao({ idioma, onConfirmar, onCancelar }) {
  const t = (k) => traduzir(idioma, k);
  const [nome, setNome] = useState('');
  const [racaId, setRacaId] = useState('humano');
  const [classeId, setClasseId] = useState('guerreiro');
  const raca = RACAS[racaId], classe = CLASSES[classeId];

  const preview = useMemo(() => {
    const base = { hpMax: 30, atk: 5, def: 2, manaMax: 10 };
    return {
      hpMax: Math.max(15, base.hpMax + (raca.bonus.hpMax || 0) + (classe.bonus.hpMax || 0)),
      manaMax: Math.max(0, base.manaMax + (raca.bonus.manaMax || 0) + (classe.bonus.manaMax || 0)),
      atk: base.atk + (raca.bonus.atk || 0) + (classe.bonus.atk || 0),
      def: base.def + (raca.bonus.def || 0) + (classe.bonus.def || 0),
    };
  }, [raca, classe]);

  function confirmar(ev) {
    ev?.preventDefault();
    tocar('clique');
    onConfirmar({ nome: nome.trim() || 'Herói', raca: racaId, classe: classeId });
  }

  return (
    <div className="tela tela-criacao">
      <div className="painel painel-criacao">
        <h2 className="titulo-menor">{t('criacao.titulo')}</h2>
        <p className="subtitulo">{t('criacao.sub')}</p>
        <form onSubmit={confirmar} className="form-criacao">
          <label className="campo-nome">
            {t('criacao.nome')}
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder={t('criacao.placeholder')}
              maxLength={20}
              autoFocus
            />
          </label>

          <div className="secao-criacao">
            <div className="secao-titulo">{t('criacao.raca')}</div>
            <div className="grade-opcoes">
              {Object.values(RACAS).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={racaId === r.id ? 'card-opcao ativa' : 'card-opcao'}
                  onClick={() => setRacaId(r.id)}
                >
                  <div className="opcao-emoji">{r.emoji}</div>
                  <div className="opcao-nome">{r.nome}</div>
                  <div className="opcao-desc">{r.desc}</div>
                  <div className="opcao-bonus">
                    {r.bonus.hpMax > 0 && `+${r.bonus.hpMax} HP `}
                    {r.bonus.atk > 0 && `+${r.bonus.atk} ATK `}
                    {r.bonus.def > 0 && `+${r.bonus.def} DEF `}
                    {r.bonus.manaMax > 0 && `+${r.bonus.manaMax} MP`}
                    {r.bonus.manaMax < 0 && `${r.bonus.manaMax} MP`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="secao-criacao">
            <div className="secao-titulo">{t('criacao.classe')}</div>
            <div className="grade-opcoes">
              {Object.values(CLASSES).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={classeId === c.id ? 'card-opcao ativa' : 'card-opcao'}
                  onClick={() => setClasseId(c.id)}
                >
                  <div className="opcao-emoji">{c.emoji}</div>
                  <div className="opcao-nome">{c.nome}</div>
                  <div className="opcao-desc">{c.desc}</div>
                  <div className="opcao-bonus">
                    {c.bonus.hpMax > 0 && `+${c.bonus.hpMax} HP `}
                    {c.bonus.atk > 0 && `+${c.bonus.atk} ATK `}
                    {c.bonus.def > 0 && `+${c.bonus.def} DEF `}
                    {c.bonus.manaMax > 0 && `+${c.bonus.manaMax} MP`}
                  </div>
                  {c.magias?.length > 0 && (
                    <div className="opcao-magias">
                      {c.magias.map((m) => MAGIAS[m]?.emoji).join(' ')}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="preview-stats">
            <div className="preview-titulo">{t('criacao.atributos')}</div>
            <div className="preview-grid">
              <div><span className="p-label">HP</span> <span className="p-valor p-hp">{preview.hpMax}</span></div>
              <div><span className="p-label">Mana</span> <span className="p-valor p-mana">{preview.manaMax}</span></div>
              <div><span className="p-label">ATK</span> <span className="p-valor p-atk">{preview.atk}</span></div>
              <div><span className="p-label">DEF</span> <span className="p-valor p-def">{preview.def}</span></div>
            </div>
            <div className="preview-combo">{raca.emoji} {raca.nome} · {classe.emoji} {classe.nome}</div>
          </div>

          <div className="botoes-criacao">
            <button type="button" className="botao" onClick={onCancelar}>{t('criacao.cancelar')}</button>
            <button type="submit" className="botao primario">{t('criacao.iniciar')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
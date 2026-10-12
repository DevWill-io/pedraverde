import React, { useEffect, useMemo, useRef, useState } from 'react';
import { firebaseAtivo, auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { novoJogo, processar, atkTotal, defTotal } from './engine/jogo';
import { lerSlot, gravarSlot } from './saves';
import { ITENS } from './content/itens.js';
import { MUNDO } from './content/mundo.js';
import { RACAS } from './content/racas.js';
import { CLASSES } from './content/classes.js';
import { MAGIAS } from './content/magias.js';
import { EFEITOS } from './content/efeitos.js';
import { ENCANTAMENTOS } from './content/encantamentos.js';
import { lerIdioma, gravarIdioma, traduzir } from './content/i18n.js';
import {
  tocar, somDeLinha, setSomHabilitado, setVolume,
  iniciarMusica, pararMusica, musicaEstaAtiva,
} from './audio.js';
import { ouvirPromptInstalar } from './pwa.js';
import { publicarRanking, chatDisponivel, rankingDisponivel } from './chat.js';
import Login from './components/Login.jsx';
import Slots from './components/Slots.jsx';
import Tutorial from './components/Tutorial.jsx';
import Config from './components/Config.jsx';
import Chat from './components/Chat.jsx';
import Ranking from './components/Ranking.jsx';

const MAX_LOG = 25;

const ACOES_COMBATE_RAPIDAS = ['atacar', 'forte', 'rapido', 'defender', 'esquivar', 'focar', 'fugir'];

const PREFIXOS = {
  jogador: '›', local: '◆', titulo: '◆', destaque: '◆',
  sucesso: '✓', erro: '✗', aviso: '!',
  npc: '☻', fala: ' ', atmosfera: ' ', saidas: ' ',
  combate: ' ', 'combate-turno': ' ', 'combate-inicio': ' ', 'combate-chefe': '★',
  'dano-causado': '⚔', 'dano-critico': '✦', 'dano-recebido': '💥', 'dano-magico': '✦',
  'dano-status': '☠', cura: '✚', defesa: '🛡', esquiva: '💨', 'critico-pronto': '🎯', fuga: '↩',
  morte: '☠', vitoria: '☠', xp: '★', 'level-up': '✦', loot: '◆',
  quest: '✓', 'quest-aceita': '◆', 'quest-ativa': ' ', 'quest-disp': ' ',
  pickup: '◆', equipar: '◆', compra: '◈', venda: '◈',
  'loja-info': ' ', 'loja-titulo': '◆', 'hp-info': ' ', stats: ' ', despedida: ' ',
  magia: '✦', 'magia-disponivel': ' ', 'magia-indisponivel': ' ', mana: ' ', buff: '✦',
  'evento-bom': '◆', 'evento-ruim': '⚠', 'evento-neutro': ' ', 'evento-epico': '✦',
  arena: '⚔', bestiario: '☠',
  'mapa-regiao': '🗺', 'mapa-local': ' ', 'mapa-atual': '▸', 'mapa-bloqueado': '🔒', 'mapa-saida': ' ',
  craft: '⚒', 'receita-ok': ' ', 'receita-bloq': '🔒',
  encantar: '✨', 'encantar-ok': ' ', 'encantar-bloq': '🔒',
  tutorial: '📖',
  'talento-ponto': '★', 'talento-info': ' ', 'talento-opcao': ' ', 'talento-ok': '★',
  'talento-bloq': '🔒', 'talento-comando': ' ', 'talento-aprendido': '★',
};

function lerConfig() {
  try {
    const raw = localStorage.getItem('pedraverde:config');
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function gravarConfig(c) {
  try { localStorage.setItem('pedraverde:config', JSON.stringify(c)); } catch {}
}

/* ============================================================ */
/* Tela de Criação                                              */
/* ============================================================ */
function TelaCriacao({ idioma, onConfirmar, onCancelar }) {
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
                    <div className="opcao-magias">{c.magias.map((m) => MAGIAS[m]?.emoji).join(' ')}</div>
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

/* ============================================================ */
/* Tela de Jogo                                                 */
/* ============================================================ */
function TelaJogo({
  usuario, usarNuvem, slot, estadoInicial, idioma,
  onSalvar, onCarregar, onVoltarSlots, onSair,
  onTutorial, onConfig, onChat, onRanking, temPromptInstalar,
}) {
  const t = (k) => traduzir(idioma, k);
  const [estado, setEstado] = useState(estadoInicial);
  const [log, setLog] = useState(() => (estadoInicial.log || []).slice(-MAX_LOG));
  const [entrada, setEntrada] = useState('');
  const [historico, setHistorico] = useState([]);
  const [idxHist, setIdxHist] = useState(-1);
  const [toast, setToast] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [painelMagias, setPainelMagias] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  useEffect(() => {
    if (!estadoInicial.log?.length) {
      empilhar([
        { texto: t('log.bemvindo'), tipo: 'titulo' },
        { texto: `${estado.nome}, ${idioma === 'en' ? 'you wake up near the village fountain.' : 'você acorda perto da fonte da vila.'}`, tipo: 'sistema' },
        { texto: t('log.dica'), tipo: 'sistema' },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function empilhar(linhas) {
    setLog((x) => [...x, ...linhas].slice(-MAX_LOG));
    for (const linha of linhas) {
      const s = somDeLinha(linha.tipo);
      if (s) { tocar(s); break; }
    }
  }

  function limparLog() { setLog([]); }

  function mostrarToast(m) {
    setToast(m);
    window.clearTimeout(mostrarToast._t);
    mostrarToast._t = window.setTimeout(() => setToast(''), 2200);
  }

  async function salvar(sil = false) {
    setSalvando(true);
    try {
      const p = { ...estado, log: log.slice(-MAX_LOG), atualizadoEm: Date.now() };
      await onSalvar(p);
      setEstado(p);
      if (!sil) {
        empilhar([{ texto: '💾 ' + t('toast.salvo'), tipo: 'sucesso' }]);
        mostrarToast(t('toast.salvo'));
        tocar('moeda');
      }
    } catch (e) {
      empilhar([{ texto: 'Erro: ' + e.message, tipo: 'erro' }]);
      tocar('erro');
    } finally {
      setSalvando(false);
    }
  }

  async function carregar() {
    const d = await onCarregar();
    if (!d) { empilhar([{ texto: 'Sem save.', tipo: 'erro' }]); tocar('erro'); return; }
    setEstado(d);
    const logCarregado = (d.log || []).slice(-MAX_LOG);
    setLog([...logCarregado, { texto: '↺ ' + t('toast.carregado'), tipo: 'sucesso' }].slice(-MAX_LOG));
    mostrarToast(t('toast.carregado'));
    tocar('clique');
  }

  function executarComando(cmd) {
    const b = cmd.toLowerCase().trim();

    if (b === 'salvar' || b === 'save') { empilhar([{ texto: `> ${cmd}`, tipo: 'jogador' }]); salvar(); return; }
    if (b === 'carregar' || b === 'load') { empilhar([{ texto: `> ${cmd}`, tipo: 'jogador' }]); carregar(); return; }
    if (b === 'clear' || b === 'limpar' || b === 'cls') { limparLog(); tocar('clique'); return; }
    if (b === 'tutorial' || b === 'guide') { empilhar([{ texto: `> ${cmd}`, tipo: 'jogador' }]); if (onTutorial) onTutorial(); return; }

    const { estado: n, linhas } = processar(estado, cmd);
    setEstado(n);
    empilhar(linhas);

    if (n.local !== estado.local || (estado.emCombate && !n.emCombate)) {
      onSalvar({
        ...n,
        log: [...log, ...linhas].slice(-MAX_LOG),
        atualizadoEm: Date.now(),
      }).catch(() => {});
    }
  }

  function enviar(ev) {
    ev?.preventDefault();
    const c = entrada.trim();
    if (!c) return;
    tocar('comando');
    setEntrada('');
    setHistorico((h) => [c, ...h].slice(0, 50));
    setIdxHist(-1);
    executarComando(c);
  }

  function clicarComando(c) {
    tocar('clique');
    setHistorico((h) => [c, ...h].slice(0, 50));
    setIdxHist(-1);
    executarComando(c);
  }

  function tecla(ev) {
    if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      const i = Math.min(idxHist + 1, historico.length - 1);
      if (i >= 0) { setIdxHist(i); setEntrada(historico[i]); }
    } else if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      const i = idxHist - 1;
      if (i < 0) { setIdxHist(-1); setEntrada(''); }
      else { setIdxHist(i); setEntrada(historico[i]); }
    }
  }

  const local = MUNDO[estado.local];
  const raca = RACAS[estado.raca] || RACAS.humano;
  const classe = CLASSES[estado.classe] || CLASSES.guerreiro;
  const pctHp = Math.max(0, Math.min(100, (estado.hp / estado.hpMax) * 100));
  const pctXp = Math.max(0, Math.min(100, (estado.xp / estado.xpProx) * 100));
  const pctMp = estado.manaMax > 0 ? Math.max(0, Math.min(100, (estado.mana / estado.manaMax) * 100)) : 0;
  const atalhos = useMemo(
    () => idioma === 'en'
      ? ['look', 'map', 'stats', 'inventory', 'spells', 'talents', 'quests', 'tutorial', 'help']
      : ['olhar', 'mapa', 'status', 'inventario', 'magias', 'talentos', 'quests', 'tutorial', 'ajuda'],
    [idioma],
  );

  const emCombate = !!estado.emCombate;
  const ini = estado.emCombate;
  const iniPct = ini ? Math.max(0, Math.min(100, (ini.hp / ini.hpMax) * 100)) : 0;
  const hpClasse = pctHp > 50 ? 'hp-ok' : pctHp > 20 ? 'hp-medio' : 'hp-critico';
  const magiasDisponiveis = (estado.magias || []).filter((m) => MAGIAS[m]);
  const efeitosAtivos = (estado.efeitos || []).filter((ef) => EFEITOS[ef.tipo]);
  const emArena = local?.arena && !emCombate;
  const encArma = estado.encantamentos?.arma;
  const pontosTalento = estado.pontosTalento || 0;

  return (
    <div className="tela jogo">
      <header className="status-bar">
        <div className="status-linha">
          <span className="tag nome">{raca.emoji} {estado.nome}</span>
          <span className="tag">{classe.emoji} {classe.nome}</span>
          <span className="tag">Nv {estado.nivel}</span>
          <span className="tag">ATK {atkTotal(estado)}{encArma && <span className="tag-enc">{ENCANTAMENTOS[encArma].emoji}</span>}</span>
          <span className="tag">DEF {defTotal(estado)}</span>
          <span className="tag moeda">◈ {estado.moedas}</span>
          {pontosTalento > 0 && (
            <span className="tag tag-talento" title="Pontos de talento disponíveis">
              ★ {pontosTalento}
            </span>
          )}
          <span className={`tag ${emArena ? 'tag-arena' : 'local'}`}>{emArena ? '⚔ ' : ''}{local?.nome}</span>
        </div>
        <div className="barras">
          <div className="barra">
            <div className={`barra-preenchimento ${hpClasse}`} style={{ width: `${pctHp}%` }} />
            <span className="barra-texto">HP {estado.hp}/{estado.hpMax}</span>
          </div>
          {estado.manaMax > 0 && (
            <div className="barra">
              <div className="barra-preenchimento mana" style={{ width: `${pctMp}%` }} />
              <span className="barra-texto">MP {estado.mana}/{estado.manaMax}</span>
            </div>
          )}
          <div className="barra">
            <div className="barra-preenchimento xp" style={{ width: `${pctXp}%` }} />
            <span className="barra-texto">XP {estado.xp}/{estado.xpProx}</span>
          </div>
        </div>

        {!emCombate && efeitosAtivos.length > 0 && (
          <div className="faixa-efeitos">
            {efeitosAtivos.map((ef, i) => {
              const d = EFEITOS[ef.tipo];
              return (
                <span key={i} className={`efeito ${d.cor || ''}`}>
                  {d.emoji} {d.nome} ({ef.duracao}t)
                </span>
              );
            })}
          </div>
        )}

        {emCombate && (
          <div className={`faixa-combate ${ini.arena ? 'faixa-arena' : ''}`}>
            <div className="combate-linha">
              <span className="combate-turno">{ini.arena ? '⚔ TREINO' : 'Turno'} {ini.turno}</span>
              <span className="combate-nome">{ini.nome}</span>
              <span className="combate-hp">{Math.max(0, ini.hp)}/{ini.hpMax}</span>
            </div>
            <div className="barra barra-inimigo">
              <div className="barra-preenchimento ini" style={{ width: `${iniPct}%` }} />
            </div>
            <div className="combate-efeitos">
              {estado.emCombate.defesaAtiva && <span className="efeito">🛡 defendendo</span>}
              {estado.emCombate.esquivaAtiva && <span className="efeito">💨 esquivando</span>}
              {estado.emCombate.criticoCarregado && <span className="efeito">🎯 crítico pronto</span>}
              {estado.emCombate.enfurecido && <span className="efeito efeito-ruim">🔥 enfurecido</span>}
              {efeitosAtivos.map((ef, i) => {
                const d = EFEITOS[ef.tipo];
                return (
                  <span key={i} className={`efeito ${d.cor || ''}`}>
                    {d.emoji} {d.nome} ({ef.duracao}t)
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="log" ref={logRef}>
        {log.map((l, i) => {
          const pref = PREFIXOS[l.tipo] || '';
          return (
            <div key={i} className={`linha ${l.tipo}`}>
              {pref && <span className="prefixo">{pref}</span>}
              <span className="texto">{l.texto}</span>
            </div>
          );
        })}
      </main>

      <div className="atalhos">
        {emCombate ? (
          <>
            {ACOES_COMBATE_RAPIDAS.map((a) => (
              <button key={a} className="chip chip-combate" onClick={() => clicarComando(a)}>{a}</button>
            ))}
            {magiasDisponiveis.length > 0 && (
              <button className="chip chip-magia" onClick={() => setPainelMagias((v) => !v)}>✦ magia</button>
            )}
          </>
        ) : emArena ? (
          <>
            <button className="chip chip-arena" onClick={() => clicarComando('falar')}>{idioma === 'en' ? 'talk' : 'falar'}</button>
            <button className="chip chip-arena" onClick={() => clicarComando('treinar rato')}>rato</button>
            <button className="chip chip-arena" onClick={() => clicarComando('treinar lobo')}>lobo</button>
            <button className="chip chip-arena" onClick={() => clicarComando('treinar goblin')}>goblin</button>
            <button className="chip chip-arena" onClick={() => clicarComando('treinar esqueleto')}>esqueleto</button>
            <button className="chip" onClick={() => clicarComando('mapa')}>{idioma === 'en' ? 'map' : 'mapa'}</button>
          </>
        ) : (
          <>
            {atalhos.map((a) => (
              <button key={a} className="chip" onClick={() => setEntrada(a)}>{a}</button>
            ))}
            {pontosTalento > 0 && (
              <button className="chip chip-talento" onClick={() => clicarComando('talentos')}>
                ★ talentos
              </button>
            )}
          </>
        )}
        <button className="chip chip-limpar" onClick={limparLog} title="Limpar log">
          {idioma === 'en' ? 'clear' : 'limpar'}
        </button>
      </div>

      {emCombate && painelMagias && magiasDisponiveis.length > 0 && (
        <div className="painel-magias">
          {magiasDisponiveis.map((mid) => {
            const m = MAGIAS[mid];
            const ok = estado.mana >= m.mana;
            return (
              <button
                key={mid}
                className={`chip-magia-op ${ok ? '' : 'chip-magia-op-off'}`}
                onClick={() => { clicarComando(`magia ${mid}`); setPainelMagias(false); }}
                disabled={!ok}
                title={m.desc}
              >
                <span className="cm-emoji">{m.emoji}</span>
                <span className="cm-nome">{m.nome}</span>
                <span className="cm-custo">{m.mana} MP</span>
              </button>
            );
          })}
        </div>
      )}

      <form className="entrada" onSubmit={enviar}>
        <span className="prompt">&gt;</span>
        <input
          ref={inputRef}
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          onKeyDown={tecla}
          placeholder={emCombate ? t('input.combate') : t('input.comando')}
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
        <button className="botao primario" type="submit">{t('barra.enviar')}</button>
      </form>

      <nav className="barra-botoes">
        <button onClick={() => salvar()} disabled={salvando}>{salvando ? t('barra.salvando') : t('barra.salvar')}</button>
        <button onClick={carregar}>{t('barra.carregar')}</button>
        {chatDisponivel() && <button onClick={onChat}>💬</button>}
        {rankingDisponivel() && <button onClick={onRanking}>🏆</button>}
        <button onClick={onTutorial}>📖</button>
        <button onClick={onConfig}>⚙</button>
        <button onClick={onVoltarSlots}>{t('barra.slots')}</button>
        <button onClick={onSair}>{t('barra.sair')}</button>
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

/* ============================================================ */
/* App                                                          */
/* ============================================================ */
export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [slotAtual, setSlotAtual] = useState(null);
  const [estadoInicial, setEstadoInicial] = useState(null);
  const [slotPendente, setSlotPendente] = useState(null);
  const [mostrarTutorial, setMostrarTutorial] = useState(false);
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [mostrarChat, setMostrarChat] = useState(false);
  const [mostrarRanking, setMostrarRanking] = useState(false);

  const cfg = lerConfig();
  const [idioma, setIdioma] = useState(cfg.idioma || lerIdioma());
  const [som, setSom] = useState(cfg.som !== false);
  const [volume, setVolumeState] = useState(typeof cfg.volume === 'number' ? cfg.volume : 0.5);
  const [musica, setMusica] = useState(!!cfg.musica);
  const [tema, setTema] = useState(cfg.tema || 'escuro');
  const [temPromptInstalar, setTemPromptInstalar] = useState(false);

  useEffect(() => {
    setSomHabilitado(som);
    setVolume(volume);
    gravarConfig({ idioma, som, volume, musica, tema });
    document.documentElement.setAttribute('data-tema', tema);
  }, [idioma, som, volume, musica, tema]);

  useEffect(() => { gravarIdioma(idioma); }, [idioma]);
  useEffect(() => { ouvirPromptInstalar(setTemPromptInstalar); }, []);

  useEffect(() => {
    if (musica) {
      const tentarIniciar = () => {
        if (!musicaEstaAtiva()) iniciarMusica();
      };
      tentarIniciar();
      window.addEventListener('click', tentarIniciar, { once: true });
      window.addEventListener('touchstart', tentarIniciar, { once: true });
      return () => {
        window.removeEventListener('click', tentarIniciar);
        window.removeEventListener('touchstart', tentarIniciar);
      };
    } else {
      pararMusica();
    }
  }, [musica]);

  useEffect(() => {
    if (!firebaseAtivo || !auth) { setCarregando(false); return; }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUsuario(u ? { uid: u.uid, email: u.email, anonimo: u.isAnonymous, offline: false } : null);
      setCarregando(false);
    });
    return unsub;
  }, []);

  const usarNuvem = Boolean(usuario && !usuario.offline && firebaseAtivo);

  function entrarOffline() {
    setUsuario({ uid: 'offline', email: null, anonimo: true, offline: true });
  }

  async function sair() {
    setSlotAtual(null);
    setEstadoInicial(null);
    setSlotPendente(null);
    if (usuario && !usuario.offline && auth) {
      try { await signOut(auth); } catch {}
    } else {
      setUsuario(null);
    }
  }

  async function escolherSlot(slot, continuar) {
    if (continuar) {
      const d = await lerSlot(usuario.uid, slot, usarNuvem);
      if (d) {
        setEstadoInicial(d);
        setSlotAtual(slot);
        return;
      }
    }
    setSlotPendente(slot);
  }

  async function confirmarCriacao(dados) {
    const novo = novoJogo(dados);
    const pac = { ...novo, log: [], atualizadoEm: Date.now() };
    await gravarSlot(usuario.uid, slotPendente, pac, usarNuvem);
    setEstadoInicial(pac);
    setSlotAtual(slotPendente);
    setSlotPendente(null);
  }

  function cancelarCriacao() { setSlotPendente(null); }

  async function salvarSlot(d) {
    await gravarSlot(usuario.uid, slotAtual, d, usarNuvem);
    if (usarNuvem && usuario?.uid) {
      publicarRanking(usuario.uid, {
        nome: d.nome, nivel: d.nivel, classe: d.classe, raca: d.raca,
        local: (MUNDO[d.local] || {}).nome || 'Pedraverde',
      }).catch(() => {});
    }
  }
  async function carregarSlot() {
    return await lerSlot(usuario.uid, slotAtual, usarNuvem);
  }

  const abrirTutorial = () => { tocar('clique'); setMostrarTutorial(true); };
  const fecharTutorial = () => setMostrarTutorial(false);
  const abrirConfig = () => { tocar('clique'); setMostrarConfig(true); };
  const abrirChat = () => { tocar('clique'); setMostrarChat(true); };
  const abrirRanking = () => { tocar('clique'); setMostrarRanking(true); };

  const usuarioParaChat = usuario && !usuario.offline
    ? { ...usuario, nome: (estadoInicial && estadoInicial.nome) || usuario.email?.split('@')[0] || 'Anônimo' }
    : null;

  if (mostrarTutorial) return <Tutorial idioma={idioma} onVoltar={fecharTutorial} />;

  if (carregando) {
    return (
      <div className="tela centro">
        <div className="carregando">{traduzir(idioma, 'slots.carregando')}</div>
      </div>
    );
  }

  if (!usuario) {
    return <Login idioma={idioma} onOffline={entrarOffline} onTutorial={abrirTutorial} />;
  }

  if (slotPendente !== null) {
    return (
      <TelaCriacao
        idioma={idioma}
        onConfirmar={confirmarCriacao}
        onCancelar={cancelarCriacao}
      />
    );
  }

  if (slotAtual === null) {
    return (
      <Slots
        idioma={idioma}
        usuario={usuario}
        usarNuvem={usarNuvem}
        onEscolher={escolherSlot}
        onSair={sair}
      />
    );
  }

  return (
    <>
      <TelaJogo
        key={slotAtual}
        usuario={usuario}
        usarNuvem={usarNuvem}
        slot={slotAtual}
        estadoInicial={estadoInicial}
        idioma={idioma}
        onSalvar={salvarSlot}
        onCarregar={carregarSlot}
        onVoltarSlots={() => { setSlotAtual(null); setEstadoInicial(null); }}
        onSair={sair}
        onTutorial={abrirTutorial}
        onConfig={abrirConfig}
        onChat={abrirChat}
        onRanking={abrirRanking}
        temPromptInstalar={temPromptInstalar}
      />

      {mostrarConfig && (
        <Config
          idioma={idioma} setarIdioma={setIdioma}
          som={som} setarSom={setSom}
          volume={volume} setarVolume={setVolumeState}
          musica={musica} setarMusica={setMusica}
          tema={tema} setarTema={setTema}
          temPromptInstalar={temPromptInstalar}
          onFechar={() => setMostrarConfig(false)}
        />
      )}

      {mostrarChat && (
        <Chat
          idioma={idioma}
          usuario={usuarioParaChat}
          onFechar={() => setMostrarChat(false)}
        />
      )}

      {mostrarRanking && (
        <Ranking
          idioma={idioma}
          usuario={usuario}
          onFechar={() => setMostrarRanking(false)}
        />
      )}
    </>
  );
}
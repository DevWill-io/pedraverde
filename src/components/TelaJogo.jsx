// src/components/TelaJogo.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { processar, atkTotal, defTotal } from '../engine/jogo';
import { ITENS } from '../content/itens.js';
import { MUNDO } from '../content/mundo.js';
import { RACAS } from '../content/racas.js';
import { CLASSES } from '../content/classes.js';
import { MAGIAS } from '../content/magias.js';
import { EFEITOS } from '../content/efeitos.js';
import { ENCANTAMENTOS } from '../content/encantamentos.js';
import { calcularPeriodo, formatarHora, getClima } from '../content/clima.js';
import { traduzir } from '../content/i18n.js';
import { tocar, somDeLinha } from '../audio.js';
import { chatDisponivel, rankingDisponivel } from '../chat.js';
import { PREFIXOS } from '../constants/prefixos.js';
import { TOAST_TIPOS } from '../constants/toasts.js';

const MAX_LOG = 25;
const ACOES_COMBATE_RAPIDAS = ['atacar', 'forte', 'rapido', 'defender', 'esquivar', 'focar', 'fugir'];

export default function TelaJogo({
  usuario, usarNuvem, slot, estadoInicial, idioma,
  onSalvar, onCarregar, onVoltarSlots, onSair,
  onTutorial, onConfig, onChat, onRanking,
}) {
  const t = (k) => traduzir(idioma, k);
  const [estado, setEstado] = useState(estadoInicial);
  const [log, setLog] = useState(() => (estadoInicial.log || []).slice(-MAX_LOG));
  const [entrada, setEntrada] = useState('');
  const [historico, setHistorico] = useState([]);
  const [idxHist, setIdxHist] = useState(-1);
  const [salvando, setSalvando] = useState(false);
  const [painelMagias, setPainelMagias] = useState(false);
  const [toasts, setToasts] = useState([]);

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

  function adicionarToast(texto, tipo, emoji) {
    const id = Date.now() + Math.random();
    setToasts((arr) => [...arr, { id, texto, tipo, emoji }].slice(-4));
    setTimeout(() => {
      setToasts((arr) => arr.filter((x) => x.id !== id));
    }, 4200);
  }

  function empilhar(linhas) {
    setLog((x) => [...x, ...linhas].slice(-MAX_LOG));

    // Som
    for (const linha of linhas) {
      const s = somDeLinha(linha.tipo);
      if (s) { tocar(s); break; }
    }

    // Toasts
    for (const linha of linhas) {
      const cfg = TOAST_TIPOS[linha.tipo];
      if (cfg) {
        let textoLimpo = linha.texto.replace(/^[✦★✓✗◆🏆🎉💀⚔⚒✨⚠🌦🕐]\s*/, '').trim();
        if (textoLimpo.length > 80) textoLimpo = textoLimpo.slice(0, 77) + '...';
        adicionarToast(textoLimpo, linha.tipo, cfg.emoji);
        break;
      }
    }
  }

  function limparLog() { setLog([]); }

  async function salvar(sil = false) {
    setSalvando(true);
    try {
      const p = { ...estado, log: log.slice(-MAX_LOG), atualizadoEm: Date.now() };
      await onSalvar(p);
      setEstado(p);
      if (!sil) {
        empilhar([{ texto: '💾 ' + t('toast.salvo'), tipo: 'sucesso' }]);
        adicionarToast(t('toast.salvo'), 'info', '💾');
        tocar('moeda');
      }
    } catch (e) {
      empilhar([{ texto: 'Erro: ' + e.message, tipo: 'erro' }]);
      adicionarToast('Erro ao salvar', 'erro', '✗');
      tocar('erro');
    } finally { setSalvando(false); }
  }

  async function carregar() {
    const d = await onCarregar();
    if (!d) {
      empilhar([{ texto: 'Sem save.', tipo: 'erro' }]);
      adicionarToast('Sem save neste slot', 'erro', '✗');
      tocar('erro');
      return;
    }
    setEstado(d);
    const logCarregado = (d.log || []).slice(-MAX_LOG);
    setLog([...logCarregado, { texto: '↺ ' + t('toast.carregado'), tipo: 'sucesso' }].slice(-MAX_LOG));
    adicionarToast(t('toast.carregado'), 'info', '↺');
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
      onSalvar({ ...n, log: [...log, ...linhas].slice(-MAX_LOG), atualizadoEm: Date.now() }).catch(() => {});
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
      ? ['look', 'map', 'weather', 'stats', 'inventory', 'spells', 'talents', 'achievements', 'quests', 'help']
      : ['olhar', 'mapa', 'clima', 'status', 'inventario', 'magias', 'talentos', 'conquistas', 'quests', 'ajuda'],
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

  const clima = getClima(estado.climaAtual || 'limpo');
  const periodo = calcularPeriodo(estado.hora || 6);
  const horaTexto = formatarHora(estado.hora || 6);

  return (
    <div className="tela jogo">
      {/* Toasts */}
      <div className="toast-container">
        {toasts.map((tt) => {
          const cfg = TOAST_TIPOS[tt.tipo] || {};
          return (
            <div key={tt.id} className={`toast-notif ${cfg.cor || 'toast-info'}`}>
              <div className="toast-emoji">{tt.emoji || cfg.emoji || '◆'}</div>
              <div className="toast-conteudo">
                {cfg.titulo && <div className="toast-titulo">{cfg.titulo}</div>}
                <div className="toast-texto">{tt.texto}</div>
              </div>
            </div>
          );
        })}
      </div>

      <header className="status-bar">
        <div className="status-linha">
          <span className="tag nome">
            {raca.emoji} {estado.nome}
            {estado.titulo && <span className="tag-titulo">"{estado.titulo}"</span>}
          </span>
          <span className="tag">{classe.emoji} {classe.nome}</span>
          <span className="tag">Nv {estado.nivel}</span>
          <span className="tag">ATK {atkTotal(estado)}{encArma && <span className="tag-enc">{ENCANTAMENTOS[encArma].emoji}</span>}</span>
          <span className="tag">DEF {defTotal(estado)}</span>
          <span className="tag moeda">◈ {estado.moedas}</span>
          {pontosTalento > 0 && <span className="tag tag-talento" title="Pontos de talento disponíveis">★ {pontosTalento}</span>}
          <span className={`tag ${emArena ? 'tag-arena' : 'local'}`}>{emArena ? '⚔ ' : ''}{local?.nome}</span>
        </div>
        <div className="barras">
          <div className="barra"><div className={`barra-preenchimento ${hpClasse}`} style={{ width: `${pctHp}%` }} /><span className="barra-texto">HP {estado.hp}/{estado.hpMax}</span></div>
          {estado.manaMax > 0 && <div className="barra"><div className="barra-preenchimento mana" style={{ width: `${pctMp}%` }} /><span className="barra-texto">MP {estado.mana}/{estado.manaMax}</span></div>}
          <div className="barra"><div className="barra-preenchimento xp" style={{ width: `${pctXp}%` }} /><span className="barra-texto">XP {estado.xp}/{estado.xpProx}</span></div>
        </div>

        <div className="faixa-tempo">
          <span className={`tempo-tag ${clima.cor || ''}`} title={clima.desc}>{clima.emoji} {clima.nome}</span>
          <span className={`tempo-tag ${periodo.cor || ''}`} title={periodo.desc}>{periodo.emoji} {periodo.nome}</span>
          <span className="tempo-tag tempo-hora">🕐 {horaTexto}</span>
          <span className="tempo-tag tempo-dia">📅 Dia {estado.dia || 1}</span>
        </div>

        {!emCombate && efeitosAtivos.length > 0 && (
          <div className="faixa-efeitos">
            {efeitosAtivos.map((ef, i) => {
              const d = EFEITOS[ef.tipo];
              return <span key={i} className={`efeito ${d.cor || ''}`}>{d.emoji} {d.nome} ({ef.duracao}t)</span>;
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
            <div className="barra barra-inimigo"><div className="barra-preenchimento ini" style={{ width: `${iniPct}%` }} /></div>
            <div className="combate-efeitos">
              {estado.emCombate.defesaAtiva && <span className="efeito">🛡 defendendo</span>}
              {estado.emCombate.esquivaAtiva && <span className="efeito">💨 esquivando</span>}
              {estado.emCombate.criticoCarregado && <span className="efeito">🎯 crítico pronto</span>}
              {estado.emCombate.enfurecido && <span className="efeito efeito-ruim">🔥 enfurecido</span>}
              {efeitosAtivos.map((ef, i) => {
                const d = EFEITOS[ef.tipo];
                return <span key={i} className={`efeito ${d.cor || ''}`}>{d.emoji} {d.nome} ({ef.duracao}t)</span>;
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
            {ACOES_COMBATE_RAPIDAS.map((a) => <button key={a} className="chip chip-combate" onClick={() => clicarComando(a)}>{a}</button>)}
            {magiasDisponiveis.length > 0 && <button className="chip chip-magia" onClick={() => setPainelMagias((v) => !v)}>✦ magia</button>}
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
            {atalhos.map((a) => <button key={a} className="chip" onClick={() => setEntrada(a)}>{a}</button>)}
            {pontosTalento > 0 && <button className="chip chip-talento" onClick={() => clicarComando('talentos')}>★ talentos</button>}
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
    </div>
  );
}
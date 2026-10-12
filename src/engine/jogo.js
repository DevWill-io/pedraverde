// src/engine/jogo.js
import { MUNDO, REGIOES } from '../content/mundo.js';
import { ITENS, acharItem, precoVenda, normalizar, SLOTS_EQUIP } from '../content/itens.js';
import { INIMIGOS } from '../content/inimigos.js';
import { QUESTS } from '../content/quests.js';
import { RACAS } from '../content/racas.js';
import { CLASSES } from '../content/classes.js';
import { MAGIAS } from '../content/magias.js';
import { sortearEvento } from '../content/eventos.js';
import { EFEITOS, EFEITOS_INIMIGOS } from '../content/efeitos.js';
import { INIMIGOS_ARENA, ARENA_INFO } from '../content/arena.js';
import { RECEITAS, acharReceita } from '../content/receitas.js';
import { ENCANTAMENTOS } from '../content/encantamentos.js';
import { TALENTOS, acharTalento, NIVEIS_TALENTO } from '../content/talentos.js';
import {
  CONQUISTAS, CATEGORIAS_CONQUISTAS, acharConquista, injetarItens,
} from '../content/conquistas.js';
import {
  CLIMAS, PERIODOS, CLIMAS_POR_REGIAO,
  calcularPeriodo, formatarHora, sortearClima, avancarHora,
  getClima, getPeriodo, resumoAmbiente,
} from '../content/clima.js';
import {
  hoje, ontem, sortearMissoesDiarias, recompensaStreak, acharMissao,
  MISSOES_DIARIAS, STREAK_RECOMPENSAS,
} from '../content/diarias.js';
import {
  DUNGEON_INFO, gerarDungeon, bonusPorAndar,
  poolInimigos, poolMiniChefes, poolChefeFinal,
} from '../content/dungeon.js'; 
import {
  PROLOGO, CAMPANHA, FINAIS, capituloAtual, totalCapitulos, falasAldric,
} from '../content/campanha.js';

injetarItens(ITENS);

const d6 = () => 1 + Math.floor(Math.random() * 6);

/* ================================================================== */
/* Filtros de inventário                                               */
/* ================================================================== */
const FILTROS_INVENTARIO = {
  /* ---------- por tipo ---------- */
  arma:         { label: 'armas',       fn: (d) => d.tipo === 'arma' },
  armas:        { label: 'armas',       fn: (d) => d.tipo === 'arma' },
  escudo:       { label: 'escudos',     fn: (d) => d.tipo === 'escudo' },
  escudos:      { label: 'escudos',     fn: (d) => d.tipo === 'escudo' },
  elmo:         { label: 'elmos',       fn: (d) => d.tipo === 'elmo' },
  elmos:        { label: 'elmos',       fn: (d) => d.tipo === 'elmo' },
  armadura:     { label: 'armaduras',   fn: (d) => d.tipo === 'armadura' },
  armaduras:    { label: 'armaduras',   fn: (d) => d.tipo === 'armadura' },
  botas:        { label: 'botas',       fn: (d) => d.tipo === 'botas' },
  anel:         { label: 'anéis',       fn: (d) => d.tipo === 'anel' },
  aneis:        { label: 'anéis',       fn: (d) => d.tipo === 'anel' },
  colar:        { label: 'colares',     fn: (d) => d.tipo === 'colar' },
  colares:      { label: 'colares',     fn: (d) => d.tipo === 'colar' },
  capa:         { label: 'capas',       fn: (d) => d.tipo === 'capa' },
  capas:        { label: 'capas',       fn: (d) => d.tipo === 'capa' },
  consumivel:   { label: 'consumíveis', fn: (d) => d.tipo === 'consumivel' },
  consumiveis:  { label: 'consumíveis', fn: (d) => d.tipo === 'consumivel' },
  pocao:        { label: 'poções',      fn: (d) => d.tipo === 'consumivel' },
  pocoes:       { label: 'poções',      fn: (d) => d.tipo === 'consumivel' },
  pergaminho:   { label: 'pergaminhos', fn: (d) => d.tipo === 'consumivel' && d.magia },
  pergaminhos:  { label: 'pergaminhos', fn: (d) => d.tipo === 'consumivel' && d.magia },
  comida:       { label: 'comidas',     fn: (d) => d.tipo === 'consumivel' && d.cura && !d.magia && !d.buff },
  comidas:      { label: 'comidas',     fn: (d) => d.tipo === 'consumivel' && d.cura && !d.magia && !d.buff },
  material:     { label: 'materiais',   fn: (d) => d.tipo === 'material' },
  materiais:    { label: 'materiais',   fn: (d) => d.tipo === 'material' },
  gema:         { label: 'gemas',       fn: (d) => d.tipo === 'material' && (d.id?.startsWith('gema_') || d.id === 'cristal') },
  gemas:        { label: 'gemas',       fn: (d) => d.tipo === 'material' && (d.id?.startsWith('gema_') || d.id === 'cristal') },

  /* ---------- por equipado ---------- */
  equipado:     { label: 'equipados',   fn: (d, id, e) => Object.values(e.equipado).includes(id) },
  equipados:    { label: 'equipados',   fn: (d, id, e) => Object.values(e.equipado).includes(id) },

  /* ---------- por raridade ---------- */
  comum:        { label: 'comuns',      fn: (d) => !d.raridade || d.raridade === 'comum' },
  comuns:       { label: 'comuns',      fn: (d) => !d.raridade || d.raridade === 'comum' },
  incomum:      { label: 'incomuns',    fn: (d) => d.raridade === 'incomum' },
  incomuns:     { label: 'incomuns',    fn: (d) => d.raridade === 'incomum' },
  raro:         { label: 'raros+',      fn: (d) => ['raro', 'epico', 'lendario', 'mitico'].includes(d.raridade) },
  raros:        { label: 'raros+',      fn: (d) => ['raro', 'epico', 'lendario', 'mitico'].includes(d.raridade) },
  epico:        { label: 'épicos+',     fn: (d) => ['epico', 'lendario', 'mitico'].includes(d.raridade) },
  epicos:       { label: 'épicos+',     fn: (d) => ['epico', 'lendario', 'mitico'].includes(d.raridade) },
  lendario:     { label: 'lendários+',  fn: (d) => ['lendario', 'mitico'].includes(d.raridade) },
  lendarios:    { label: 'lendários+',  fn: (d) => ['lendario', 'mitico'].includes(d.raridade) },
  mitico:       { label: 'míticos',     fn: (d) => d.raridade === 'mitico' },
  miticos:      { label: 'míticos',     fn: (d) => d.raridade === 'mitico' },
};

/* ================================================================== */
/* XP                                                                  */
/* ================================================================== */
function xpProximoNivel(nivel) {
  return Math.round(nivel * 20 + Math.pow(nivel, 1.5) * 3);
}

/* ================================================================== */
/* Arquétipos de IA                                                    */
/* ================================================================== */
const ARQUETIPOS = {
  agressivo: { atacar: 0.68, forte: 0.22, focar: 0.05, defender: 0.03, esquivar: 0.02 },
  defensivo: { atacar: 0.35, forte: 0.10, focar: 0.05, defender: 0.30, esquivar: 0.20 },
  tatico:    { atacar: 0.45, forte: 0.20, focar: 0.15, defender: 0.10, esquivar: 0.10 },
  bestial:   { atacar: 0.60, forte: 0.28, focar: 0.02, defender: 0.05, esquivar: 0.05 },
  magico:    { atacar: 0.48, forte: 0.17, focar: 0.25, defender: 0.05, esquivar: 0.05 },
};

function sorteioPonderado(pesos) {
  const total = Object.values(pesos).reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (const [acao, peso] of Object.entries(pesos)) {
    r -= peso;
    if (r <= 0) return acao;
  }
  return 'atacar';
}

/* ================================================================== */
/* Estado inicial                                                      */
/* ================================================================== */
export function novoJogo(opcoes = {}) {
  const nome = typeof opcoes === 'string' ? opcoes : (opcoes.nome || 'Herói');
  const racaId = opcoes.raca || 'humano';
  const classeId = opcoes.classe || 'guerreiro';
  const raca = RACAS[racaId] || RACAS.humano;
  const classe = CLASSES[classeId] || CLASSES.guerreiro;
  const base = { hpMax: 30, atk: 5, def: 2, manaMax: 10, moedas: 20 };
  const bonus = {
    hpMax: (raca.bonus.hpMax || 0) + (classe.bonus.hpMax || 0),
    atk: (raca.bonus.atk || 0) + (classe.bonus.atk || 0),
    def: (raca.bonus.def || 0) + (classe.bonus.def || 0),
    manaMax: (raca.bonus.manaMax || 0) + (classe.bonus.manaMax || 0),
  };
  const hpMax = Math.max(15, base.hpMax + bonus.hpMax);
  const manaMax = Math.max(0, base.manaMax + bonus.manaMax);

  return {
    versao: 11,
    nome: (nome || '').trim() || 'Herói',
    raca: racaId, classe: classeId,
    nivel: 1, xp: 0, xpProx: xpProximoNivel(1),
    hpMax, hp: hpMax, manaMax, mana: manaMax,
    atk: base.atk + bonus.atk, def: base.def + bonus.def,
    moedas: base.moedas,
    magias: [...(classe.magias || [])],
    efeitos: [],
    local: 'pedraverde',
    // ⭐ Sistema de tempo e clima
    hora: 6,           // começa ao meio-dia
    dia: 1,             // dia 1
    climaAtual: 'limpo',
    contadorTempo: 0,  // quantos comandos desde o último avanço
    ultimoDescanso: -999, // hora absoluta do último descanso (cooldown)
    // ⭐ Sistema de missões diárias + login streak
    diarias: {
      data: null,              // data atual das missões (YYYY-MM-DD)
      missoes: [],             // IDs das 3 missões do dia
      progresso: {},           // { missaoId: progressoAtual }
      concluidas: [],          // IDs já completados hoje
      reivindicadas: [],       // IDs cujas recompensas foram pegas
      streak: 0,               // dias consecutivos de login
      ultimoLogin: null,       // data do último login (YYYY-MM-DD)
      recompensaPendente: 0,   // dia do streak a reivindicar (0 = nada)
    },
    inventario: [{ id: 'pocao', qtd: 2 }, { id: 'pao', qtd: 2 }],
    equipado: { arma: null, escudo: null, elmo: null, armadura: null, botas: null, anel: null, colar: null, capa: null },
    encantamentos: {},
    talentos: [],
    pontosTalento: 0,
    conquistasDesbloqueadas: [],
    titulo: null,
    questsAtivas: [], questsCompletas: [], progresso: {}, flags: {},
    emCombate: null,
    dungeon: null,
    campanha: {
      prologoVisto: false,
      capitulosCompletos: [],
      final: null,          // 'matar' | 'poupar' | 'juntar' | null
      escolhaFinalFeita: false,
    },
    estatisticas: {
      locaisVisitados: ['pedraverde'], inimigosMortos: {},
      mortes: 0, danoTotal: 0, danoRecebido: 0, magiasLancadas: 0,
      eventosVividos: 0, turnosDeCombate: 0, vitoriasArena: 0, nocauteArena: 0,
      itensCriados: 0, itensEncantados: 0, fugasInimigos: 0, criadoEm: Date.now(),
    },
    atualizadoEm: Date.now(),
  };
}

/* ================================================================== */
/* TEMPO E CLIMA                                                       */
/* ================================================================== */

/** Avança o tempo. Se `forcar` for true, ignora o contador e avança na hora. */
function avancarTempo(e, p, forcar = false) {
  if (!forcar) {
    e.contadorTempo = (e.contadorTempo || 0) + 1;
    if (e.contadorTempo < 5) return;
    e.contadorTempo = 0;
  }

  const horaAntiga = e.hora || 6;
  e.hora = avancarHora(e.hora || 6, 1);

  // Se chegou à meia-noite, avança o dia e pula direto pro amanhecer (06:00)
  if (e.hora === 0) {
    e.dia = (e.dia || 1) + 1;
    e.hora = 6;
  }

  // Anuncia mudanças notáveis
  const periodoAntigo = calcularPeriodo(horaAntiga).id;
  const periodoNovo = calcularPeriodo(e.hora).id;

  if (periodoAntigo !== periodoNovo) {
    const per = PERIODOS[periodoNovo];
    p(`${per.emoji} O tempo passa — ${per.nome} em Pedraverde. (${formatarHora(e.hora)})`, 'tempo-periodo');
  }

  // Chance de trocar o clima (30% por hora)
  if (Math.random() < 0.3) {
    const regiao = MUNDO[e.local]?.regiao || 'vila';
    const novoClima = sortearClima(regiao);
    if (novoClima.id !== e.climaAtual) {
      e.climaAtual = novoClima.id;
      p(`${novoClima.emoji} O clima mudou: ${novoClima.nome}.`, 'tempo-clima');
    }
  }
}

/* ================================================================== */
/* Talentos                                                            */
/* ================================================================== */
export function temTalento(e, flag) {
  const ids = e.talentos || [];
  for (const id of ids) {
    const t = acharTalento(id);
    if (t?.flag === flag) return true;
    if (t?.id === 'sombra_mortal' && flag === 'assassino') return true;
  }
  return false;
}

function bonusTalentos(e) {
  const b = { atk: 0, def: 0 };
  for (const id of (e.talentos || [])) {
    const t = acharTalento(id);
    if (t?.bonus) {
      b.atk += t.bonus.atk || 0;
      b.def += t.bonus.def || 0;
    }
  }
  return b;
}

function bonusConquistas(e) {
  const b = { atk: 0, def: 0, hpMax: 0 };
  for (const id of (e.conquistasDesbloqueadas || [])) {
    const c = acharConquista(id);
    if (c?.bonus) {
      b.atk += c.bonus.atk || 0;
      b.def += c.bonus.def || 0;
      b.hpMax += c.bonus.hpMax || 0;
    }
  }
  return b;
}

/* ================================================================== */
/* Stats                                                               */
/* ================================================================== */
export function atkTotal(e) {
  let total = e.atk;
  for (const slot of SLOTS_EQUIP) {
    const id = e.equipado?.[slot]; if (!id) continue;
    const it = ITENS[id]; if (it?.atk) total += it.atk;
    const enc = e.encantamentos?.[slot];
    if (enc && ENCANTAMENTOS[enc]?.bonus?.atk) total += ENCANTAMENTOS[enc].bonus.atk;
  }
  for (const ef of (e.efeitos || [])) {
    const def = EFEITOS[ef.tipo]; if (def?.tipo === 'atk') total += def.valor;
  }
  total += bonusTalentos(e).atk;
  total += bonusConquistas(e).atk;
  return Math.max(0, total);
}
export function defTotal(e) {
  let total = e.def;
  for (const slot of SLOTS_EQUIP) {
    const id = e.equipado?.[slot]; if (!id) continue;
    const it = ITENS[id]; if (it?.def) total += it.def;
    const enc = e.encantamentos?.[slot];
    if (enc && ENCANTAMENTOS[enc]?.bonus?.def) total += ENCANTAMENTOS[enc].bonus.def;
  }
  for (const ef of (e.efeitos || [])) {
    const def = EFEITOS[ef.tipo]; if (def?.tipo === 'def') total += def.valor;
  }
  total += bonusTalentos(e).def;
  total += bonusConquistas(e).def;
  return Math.max(0, total);
}

function normalizarEstado(e) {
  if (!e.equipado) e.equipado = {};
  for (const slot of SLOTS_EQUIP) if (!(slot in e.equipado)) e.equipado[slot] = null;
  if (!e.encantamentos) e.encantamentos = {};
  if (!Array.isArray(e.efeitos)) e.efeitos = [];
  if (!Array.isArray(e.magias)) e.magias = [];
  if (!Array.isArray(e.talentos)) e.talentos = [];
  if (!Array.isArray(e.conquistasDesbloqueadas)) e.conquistasDesbloqueadas = [];
  if (typeof e.pontosTalento !== 'number') e.pontosTalento = 0;
  if (typeof e.mana !== 'number') e.mana = e.manaMax || 10;
  if (typeof e.manaMax !== 'number') e.manaMax = 10;
  if (!e.raca) e.raca = 'humano';
  if (!e.classe) e.classe = 'guerreiro';
  // ⭐ Sistema de tempo (retrocompatível)
  if (typeof e.hora !== 'number') e.hora = 6;
  if (typeof e.dia !== 'number') e.dia = 1;
  if (!e.climaAtual) e.climaAtual = 'limpo';
  if (typeof e.contadorTempo !== 'number') e.contadorTempo = 0;
  if (typeof e.ultimoDescanso !== 'number') e.ultimoDescanso = -999;
  // ⭐ Sistema de diárias (retrocompatível)
  if (!e.diarias) {
    e.diarias = {
      data: null, missoes: [], progresso: {}, concluidas: [], reivindicadas: [],
      streak: 0, ultimoLogin: null, recompensaPendente: 0,
    };
  }
  if (!e.estatisticas) {
    e.estatisticas = { locaisVisitados: [e.local || 'pedraverde'], inimigosMortos: {}, mortes: 0, danoTotal: 0, danoRecebido: 0, magiasLancadas: 0, eventosVividos: 0, turnosDeCombate: 0, vitoriasArena: 0, nocauteArena: 0, itensCriados: 0, itensEncantados: 0, fugasInimigos: 0, criadoEm: Date.now() };
  }
  if (!Array.isArray(e.estatisticas.locaisVisitados)) e.estatisticas.locaisVisitados = [];
  if (!e.estatisticas.inimigosMortos) e.estatisticas.inimigosMortos = {};
  if (typeof e.estatisticas.itensCriados !== 'number') e.estatisticas.itensCriados = 0;
  if (typeof e.estatisticas.itensEncantados !== 'number') e.estatisticas.itensEncantados = 0;
  if (typeof e.estatisticas.fugasInimigos !== 'number') e.estatisticas.fugasInimigos = 0;
    // ⭐ Campanha (retrocompatível)
  if (!e.campanha) {
    e.campanha = {
      prologoVisto: false,
      capitulosCompletos: [],
      final: null,
      escolhaFinalFeita: false,
    };
  }
  // Marca retroativamente os capítulos completos baseado nas flags
  if (Array.isArray(CAMPANHA)) {
    for (const cap of CAMPANHA) {
      if (cap.check(e) && !e.campanha.capitulosCompletos.includes(cap.id)) {
        e.campanha.capitulosCompletos.push(cap.id);
      }
    }
  }
  return e;
}

function registrarLocal(e, id) { if (!e.estatisticas.locaisVisitados.includes(id)) e.estatisticas.locaisVisitados.push(id); }
function addItem(e, id, qtd = 1) { const a = e.inventario.find((i) => i.id === id); if (a) a.qtd += qtd; else e.inventario.push({ id, qtd }); }
function remItem(e, id, qtd = 1) { const a = e.inventario.find((i) => i.id === id); if (!a || a.qtd < qtd) return false; a.qtd -= qtd; if (a.qtd <= 0) e.inventario = e.inventario.filter((i) => i.id !== id); return true; }
function qtdItem(e, id) { return e.inventario.find((i) => i.id === id)?.qtd || 0; }
function barra(a, m, l = 10) { const c = Math.max(0, Math.min(l, Math.round((a / m) * l))); return '█'.repeat(c) + '░'.repeat(l - c); }

const RARIDADES = ['comum', 'incomum', 'raro', 'epico', 'lendario', 'mitico'];
function tipoRaridade(item) { const r = item?.raridade || 'comum'; return RARIDADES.includes(r) ? `raridade-${r}` : 'sistema'; }
function raridadeTag(item) { if (!item?.raridade || item.raridade === 'comum') return ''; const m = { incomum: '◆', raro: '★', epico: '✦', lendario: '✧', mitico: '✺' }; return ` ${m[item.raridade] || ''}`; }

/* ================================================================== */
/* Conquistas                                                          */
/* ================================================================== */
function checarConquistas(e, p) {
  if (!Array.isArray(e.conquistasDesbloqueadas)) e.conquistasDesbloqueadas = [];
  const novas = [];
  for (const c of CONQUISTAS) {
    if (e.conquistasDesbloqueadas.includes(c.id)) continue;
    try {
      if (c.check(e)) {
        e.conquistasDesbloqueadas.push(c.id);
        novas.push(c);
        if (c.bonus?.hpMax) { e.hpMax += c.bonus.hpMax; e.hp += c.bonus.hpMax; }
      }
    } catch {}
  }
  for (const c of novas) {
    p(`🏆 Conquista desbloqueada: ${c.emoji} ${c.nome}`, 'conquista');
    p(`   ${c.desc}`, 'conquista-desc');
    if (c.bonus) {
      const b = [];
      if (c.bonus.atk) b.push(`+${c.bonus.atk} ATK`);
      if (c.bonus.def) b.push(`+${c.bonus.def} DEF`);
      if (c.bonus.hpMax) b.push(`+${c.bonus.hpMax} HP`);
      if (c.bonus.manaMax) b.push(`+${c.bonus.manaMax} MP`);
      if (b.length) p(`   Bônus: ${b.join(' · ')}`, 'item-bonus');
    }
    if (c.titulo && !e.titulo) {
      e.titulo = c.titulo;
      p(`   ★ Título desbloqueado: "${c.titulo}" (use "titulo ${c.titulo}")`, 'talento-ok');
    }
  }
  return novas;
}

/* ================================================================== */
/* Missões Diárias + Login Streak                                      */
/* ================================================================== */

/** Atualiza as diárias se virou o dia. Chamado no início de processar() */
function atualizarDiarias(e, p) {
  const dataHoje = hoje();
  const d = e.diarias;

  /* ---- Primeira vez ou virou o dia ---- */
  if (d.data !== dataHoje) {
    // Sorteia 3 novas missões
    const novas = sortearMissoesDiarias(3);
    d.data = dataHoje;
    d.missoes = novas.map((m) => m.id);
    d.progresso = {};
    d.concluidas = [];
    d.reivindicadas = [];
    p('', 'espaco');
    p('📅 Novas missões diárias disponíveis! Use "diarias" para ver.', 'quest');
    p('', 'espaco');

    /* ---- Login streak ---- */
    if (d.ultimoLogin === ontem()) {
      // Continua o streak
      d.streak = (d.streak || 0) + 1;
    } else if (d.ultimoLogin !== dataHoje) {
      // Quebrou ou primeiro login
      d.streak = 1;
    }

    d.ultimoLogin = dataHoje;
    d.recompensaPendente = ((d.streak - 1) % 7) + 1;

    p(`🔥 Login streak: ${d.streak} dia${d.streak > 1 ? 's' : ''} consecutivos!`, 'level-up');
    p(`   Use "reivindicar" para pegar a recompensa do dia.`, 'sistema');
  }
}

/** Registra progresso numa missão diária */
function progredirDiaria(e, tipo, valor, p) {
  const d = e.diarias;
  if (!d?.missoes?.length) return;

  for (const mId of d.missoes) {
    if (d.concluidas.includes(mId)) continue;
    const m = acharMissao(mId);
    if (!m) continue;

    // Verifica se o tipo bate
    const tiposCompativeis = [m.objetivo.tipo];
    if (m.objetivo.tipo === 'matar' && tipo === 'matar') tiposCompativeis.push('matar');
    if (m.objetivo.tipo === 'matar_chefe' && tipo === 'matar_chefe') tiposCompativeis.push('matar_chefe');
    if (!tiposCompativeis.includes(tipo)) continue;

    d.progresso[mId] = (d.progresso[mId] || 0) + valor;

    if (d.progresso[mId] >= m.objetivo.qtd) {
      d.concluidas.push(mId);
      p(`📅 Missão diária completa: ${m.emoji} ${m.nome}!`, 'quest');
      p(`   Use "reivindicar ${m.nome}" para pegar a recompensa.`, 'sistema');
    } else {
      p(`📅 Diária: ${m.emoji} ${m.nome} — ${d.progresso[mId]}/${m.objetivo.qtd}`, 'sistema');
    }
  }
}

/** Reivindica recompensa de missão completa ou do login streak */
function reivindicarRecompensa(e, arg, p) {
  const d = e.diarias;
  const alvo = normalizar(arg);

  /* ---- Reivindicar TODAS as diárias completas ---- */
  if (alvo === '' || alvo === 'tudo' || alvo === 'todas' || alvo === 'all') {
    let ganhos = 0;

    // Reivindica streak (prioridade)
    if (d.recompensaPendente > 0) {
      const rec = recompensaStreak(d.recompensaPendente);
      if (rec) {
        if (rec.moedas) e.moedas += rec.moedas;
        if (rec.xp) e.xp += rec.xp;
        if (rec.itens) rec.itens.forEach((id) => addItem(e, id, 1));
        p(`🔥 Login streak dia ${d.streak}: +${rec.moedas || 0}◈${rec.xp ? ` +${rec.xp} XP` : ''}${rec.itens ? ' + ' + rec.itens.map((i) => ITENS[i]?.nome).filter(Boolean).join(', ') : ''}`, 'level-up');
        d.recompensaPendente = 0;
        ganhos++;
        checarNivel(e, p);
      }
    }

    // Reivindica diárias
    for (const mId of [...d.concluidas]) {
      if (d.reivindicadas.includes(mId)) continue;
      const m = acharMissao(mId);
      if (!m) continue;
      const r = m.recompensa || {};
      if (r.moedas) e.moedas += r.moedas;
      if (r.xp) e.xp += r.xp;
      p(`✔ ${m.emoji} ${m.nome}: +${r.moedas || 0}◈${r.xp ? ` +${r.xp} XP` : ''}`, 'sucesso');
      d.reivindicadas.push(mId);
      ganhos++;
      checarNivel(e, p);
    }

    if (ganhos === 0) {
      p('Nada para reivindicar agora.', 'sistema');
      p('Use "diarias" para ver o progresso.', 'sistema');
    }
    return;
  }

  /* ---- Reivindicar streak ---- */
  if (alvo === 'streak' || alvo === 'login') {
    if (d.recompensaPendente <= 0) {
      p('Você já reivindicou a recompensa de login do dia.', 'sistema');
      return;
    }
    const rec = recompensaStreak(d.recompensaPendente);
    if (rec) {
      if (rec.moedas) e.moedas += rec.moedas;
      if (rec.xp) e.xp += rec.xp;
      if (rec.itens) rec.itens.forEach((id) => addItem(e, id, 1));
      p(`🔥 Login streak dia ${d.streak}: +${rec.moedas || 0}◈${rec.xp ? ` +${rec.xp} XP` : ''}`, 'level-up');
      d.recompensaPendente = 0;
      checarNivel(e, p);
    }
    return;
  }

  /* ---- Reivindicar missão específica ---- */
  const m = d.missoes
    .map((id) => acharMissao(id))
    .find((x) => x && (normalizar(x.nome).includes(alvo) || normalizar(x.id).includes(alvo)));

  if (!m) {
    p('Missão não encontrada. Use "diarias" para ver a lista.', 'erro');
    return;
  }
  if (!d.concluidas.includes(m.id)) {
    p('Essa missão ainda não foi completada.', 'erro');
    return;
  }
  if (d.reivindicadas.includes(m.id)) {
    p('Você já reivindicou essa recompensa.', 'erro');
    return;
  }

  const r = m.recompensa || {};
  if (r.moedas) e.moedas += r.moedas;
  if (r.xp) e.xp += r.xp;
  p(`✔ ${m.emoji} ${m.nome}: +${r.moedas || 0}◈${r.xp ? ` +${r.xp} XP` : ''}`, 'sucesso');
  d.reivindicadas.push(m.id);
  checarNivel(e, p);
}

/** Comando "diarias" — lista missões do dia + login streak */
function listarDiarias(e, p) {
  const d = e.diarias;
  p('◆ Missões Diárias', 'titulo');
  p(`📅 Data: ${d.data || hoje()}`, 'tempo-info');
  p('', 'espaco');

  if (!d.missoes?.length) {
    p('Nenhuma missão disponível hoje.', 'sistema');
    return;
  }

  for (const mId of d.missoes) {
    const m = acharMissao(mId);
    if (!m) continue;
    const prog = d.progresso[mId] || 0;
    const completa = d.concluidas.includes(mId);
    const reivindicada = d.reivindicadas.includes(mId);

    if (reivindicada) {
      p(`${m.emoji} ${m.nome} — ✓ Recompensa pegada`, 'quest-feita');
    } else if (completa) {
      p(`${m.emoji} ${m.nome} — 🎁 PRONTA PARA REIVINDICAR`, 'talento-ponto');
    } else {
      p(`${m.emoji} ${m.nome} — ${Math.min(prog, m.objetivo.qtd)}/${m.objetivo.qtd}`, 'quest-ativa');
    }
    p(`     ${m.desc}`, 'item-desc');
    const r = m.recompensa || {};
    const partes = [];
    if (r.moedas) partes.push(`${r.moedas} ◈`);
    if (r.xp) partes.push(`${r.xp} XP`);
    if (partes.length) p(`     Recompensa: ${partes.join(' · ')}`, 'loot');
    p('', 'separador');
  }

  /* ---- Login Streak ---- */
  p('◆ Login Streak', 'titulo');
  p(`🔥 Dias consecutivos: ${d.streak}`, 'level-up');
  if (d.recompensaPendente > 0) {
    const rec = recompensaStreak(d.recompensaPendente);
    if (rec) {
      p(`🎁 Recompensa de hoje: ${rec.desc} — ${rec.moedas || 0}◈${rec.xp ? ` +${rec.xp} XP` : ''}${rec.itens ? ' + ' + rec.itens.map((i) => ITENS[i]?.nome).filter(Boolean).join(', ') : ''}`, 'talento-ponto');
      p(`   Use "reivindicar" para pegar.`, 'sistema');
    }
  } else {
    p('✓ Recompensa do dia já foi pega.', 'sucesso');
  }
  p('', 'espaco');

  /* ---- Dicas ---- */
  const algumaPronta = d.concluidas.some((id) => !d.reivindicadas.includes(id));
  if (algumaPronta || d.recompensaPendente > 0) {
    p('💡 Use "reivindicar" para pegar todas as recompensas disponíveis.', 'sistema');
  }
}

/* ================================================================== */
/* Progressão                                                          */
/* ================================================================== */
function checarNivel(e, p) {
  while (e.xp >= e.xpProx) {
    e.xp -= e.xpProx;
    e.nivel += 1;
    e.xpProx = xpProximoNivel(e.nivel);
    e.hpMax += 5; e.atk += 1; e.def += 1; e.manaMax += 3;
    e.hp = e.hpMax; e.mana = e.manaMax;
    p(`✦ LEVEL UP! Nível ${e.nivel}. (+5 HP, +1 ATK, +1 DEF, +3 Mana, cura total)`, 'level-up');
    if (NIVEIS_TALENTO.includes(e.nivel)) {
      e.pontosTalento += 1;
      p(`★ Você ganhou 1 ponto de talento! Use "talentos" para ver as opções.`, 'talento-ponto');
    }
    checarConquistas(e, p);
  }
}
function progredir(e, tipo, alvo, p) {
  for (const qid of Object.keys(QUESTS)) {
    const q = QUESTS[qid];
    if (q.objetivo.tipo !== tipo) continue;
    if (q.objetivo.alvo !== alvo && q.objetivo.alvo !== 'qualquer') continue;
    e.progresso[qid] = (e.progresso[qid] || 0) + 1;
  }
  checarQuests(e, p);
}
function checarQuests(e, p) {
  for (const qid of [...e.questsAtivas]) {
    const q = QUESTS[qid];
    if ((e.progresso[qid] || 0) < q.objetivo.qtd) continue;
    e.questsAtivas = e.questsAtivas.filter((x) => x !== qid);
    e.questsCompletas.push(qid);
    const r = q.recompensa || {};
    if (r.xp) e.xp += r.xp;
    if (r.moedas) e.moedas += r.moedas;
    if (r.itens) r.itens.forEach((id) => addItem(e, id, 1));
    p(`✔ Quest completa: "${q.titulo}"!`, 'quest');
    p(`   ${r.xp || 0} XP · ${r.moedas || 0} ◈${r.itens ? ' · ' + r.itens.map((i) => ITENS[i]?.nome).filter(Boolean).join(', ') : ''}`, 'loot');
    checarNivel(e, p);
  }
  checarConquistas(e, p);
}

/* ================================================================== */
/* Efeitos                                                             */
/* ================================================================== */
function aplicarEfeito(alvo, tipo, p = null, deInimigo = false) {
  const def = EFEITOS[tipo];
  if (!def) {
    if (tipo === 'atordoado' || tipo === 'congelado') {
      if (!alvo.efeitos) alvo.efeitos = [];
      alvo.efeitos = alvo.efeitos.filter((x) => x.tipo !== tipo);
      alvo.efeitos.push({ tipo, valor: 0, duracao: 1 });
      if (p) p(`${tipo === 'atordoado' ? '⚡' : '❄'} ${deInimigo ? 'Você' : 'Alvo'} ficou ${tipo}!`, deInimigo ? 'evento-ruim' : 'buff');
    }
    return;
  }
  if (!alvo.efeitos) alvo.efeitos = [];
  alvo.efeitos = alvo.efeitos.filter((ef) => ef.tipo !== tipo);
  alvo.efeitos.push({ tipo, valor: def.valor, duracao: def.duracao });
  if (p) {
    const quem = deInimigo ? 'Você' : 'Alvo';
    p(`${def.emoji} ${quem} recebe ${def.nome}!`, deInimigo ? 'evento-ruim' : 'buff');
  }
}
function tickEfeitos(alvo, p, quem = 'Você') {
  if (!alvo.efeitos?.length) return;
  const restantes = [];
  for (const ef of alvo.efeitos) {
    const def = EFEITOS[ef.tipo];
    if (!def) {
      if (ef.tipo === 'atordoado' || ef.tipo === 'congelado') restantes.push(ef);
      continue;
    }
    if (def.tipo === 'dano') {
      alvo.hp = Math.max(0, alvo.hp - ef.valor);
      p(`${def.emoji} ${quem} sofre ${ef.valor} de ${def.nome}. (${alvo.hp}/${alvo.hpMax})`, 'dano-status');
    } else if (def.tipo === 'cura') {
      const antes = alvo.hp;
      alvo.hp = Math.min(alvo.hpMax, alvo.hp + ef.valor);
      if (alvo.hp > antes) p(`${def.emoji} ${quem} regenera ${alvo.hp - antes} HP.`, 'cura');
    }
    const d = ef.duracao - 1;
    if (d > 0) restantes.push({ ...ef, duracao: d });
  }
  alvo.efeitos = restantes;
}
function resumoEfeitos(e) {
  if (!e.efeitos?.length) return '';
  return e.efeitos.map((ef) => {
    const def = EFEITOS[ef.tipo];
    if (!def) return '';
    if (def.tipo === 'atk' || def.tipo === 'def') { const s = def.valor > 0 ? '+' : ''; return `${def.emoji}${s}${def.valor}(${ef.duracao}t)`; }
    return `${def.emoji}(${ef.duracao}t)`;
  }).filter(Boolean).join(' ');
}

/* ================================================================== */
/* Eventos                                                             */
/* ================================================================== */
function talvezEvento(e, local, p) {
  if (!local.inimigos?.length && !local.chefe) return;
  // ⭐ Bônus de encontro por período (noite aumenta)
  const periodo = calcularPeriodo(e.hora || 12);
  const chanceBase = 0.15 + (periodo.encontroBonus || 0);
  if (Math.random() > chanceBase) return;
  const ev = sortearEvento();
  ev.aplicar(e, p);
  e.estatisticas.eventosVividos += 1;
  progredirDiaria(e, 'evento', 1, p);
  checarConquistas(e, p);
}

/* ================================================================== */
/* Magias                                                              */
/* ================================================================== */
function lancarMagia(e, magiaId, p) {
  const ini = e.emCombate; if (!ini) { p('Só em combate.', 'erro'); return false; }
  const m = MAGIAS[magiaId];
  if (!m) { p('Magia desconhecida.', 'erro'); return false; }
  if (!e.magias?.includes(magiaId)) { p(`Você não conhece "${m.nome}".`, 'erro'); return false; }

  let custo = m.mana;
  if (temTalento(e, 'metamagia')) custo = Math.ceil(custo * 0.8);

  if (e.mana < custo) { p(`Mana insuficiente (${e.mana}/${custo}).`, 'erro'); return false; }
  e.mana -= custo; e.estatisticas.magiasLancadas += 1;
  p(`${m.emoji} Você conjura ${m.nome}! (-${custo} mana)`, 'magia');
  progredirDiaria(e, 'magia', 1, p);

  if (m.tipo === 'ataque') {
    let dano = m.dano ? m.dano + d6() : Math.round(atkTotal(e) * (m.multiplicador || 1));
    if (temTalento(e, 'foco_mago')) dano += 3;

    // ⭐ Modificadores de clima
    const clima = getClima(e.climaAtual || 'limpo');
    let modClima = 0;
    if (magiaId === 'bola_fogo') {
      if (temTalento(e, 'piromante')) dano += 5;
      modClima = clima.danoFogo;
    } else if (magiaId === 'toque_gelido') {
      modClima = clima.danoGelo;
    }
    if (modClima !== 0) {
      dano += modClima;
      if (modClima < 0) p(`   ${clima.emoji} ${clima.nome} enfraquece a magia (${modClima} dano).`, 'tempo-clima');
      else p(`   ${clima.emoji} ${clima.nome} amplifica a magia (+${modClima} dano).`, 'tempo-clima');
    }

    if (!m.ignoraDef) dano -= ini.def;
    dano = Math.max(1, dano);
    if (!m.semErro && Math.random() < 0.1) p('✖ A magia errou.', 'erro');
    else {
      ini.hp -= dano; e.estatisticas.danoTotal += dano;
      const ex = [];
      if (m.ignoraDef) ex.push('ignora DEF');
      let chanceCong = m.chanceCongelar || 0;
      if (chanceCong && temTalento(e, 'criomante')) chanceCong += 0.2;
      if (m.chanceAtordoar && Math.random() < m.chanceAtordoar) { aplicarEfeito(ini, 'atordoado'); ex.push('ATORDOADO'); }
      if (chanceCong && Math.random() < chanceCong) { aplicarEfeito(ini, 'congelado'); ex.push('CONGELADO'); }
      const mortosVivos = ['esqueleto', 'mumia_rei', 'bispo_sombrio'];
      if (mortosVivos.includes(ini.id) && temTalento(e, 'julgamento')) {
        const extra = Math.round(dano * 0.5);
        ini.hp -= extra; e.estatisticas.danoTotal += extra;
        ex.push(`JULGAMENTO +${extra}`);
      }
      const tag = ex.length ? ` (${ex.join(', ')})` : '';
      p(`✦ ${m.nome} causa ${dano}${tag}.`, 'dano-magico');
    }
    if (ini.hp <= 0) { vencer(e, p); return true; }
  } else if (m.tipo === 'suporte') {
    if (m.cura) {
      let cura = m.cura;
      if (temTalento(e, 'fe')) cura = Math.round(cura * 1.3);
      const a = e.hp; e.hp = Math.min(e.hpMax, e.hp + cura);
      p(`✚ Recupera ${e.hp - a} HP.`, 'cura');
      if (temTalento(e, 'curandeiro')) {
        e.efeitos = (e.efeitos || []).filter((ef) => EFEITOS[ef.tipo]?.tipo !== 'dano');
        p('   Efeitos negativos removidos.', 'cura');
      }
    }
    if (m.buff) {
      let dur = m.buff.duracao;
      if (temTalento(e, 'bencao_duradoura')) dur += 2;
      if (m.buff.atk) { e.efeitos = (e.efeitos || []).filter((ef) => ef.tipo !== 'forca'); e.efeitos.push({ tipo: 'forca', valor: m.buff.atk, duracao: dur }); }
      if (m.buff.def) { e.efeitos = (e.efeitos || []).filter((ef) => ef.tipo !== 'def-buff'); e.efeitos.push({ tipo: 'def-buff', valor: m.buff.def, duracao: dur }); }
      p(`✦ Efeitos: ${resumoEfeitos(e)}`, 'buff');
    }
  }
  return true;
}

/* ================================================================== */
/* Arena                                                               */
/* ================================================================== */
function iniciarCombateArena(e, id, p) {
  const b = INIMIGOS[id];
  e.emCombate = {
    id, nome: b.nome, hp: b.hp, hpMax: b.hp, atk: b.atk, def: b.def,
    chefe: false, turno: 1,
    defesaAtiva: false, esquivaAtiva: false, criticoCarregado: false,
    inimigoDefendendo: false, inimigoEsquivando: false, inimigoFocando: false,
    enfurecido: false, efeitos: [], arena: true,
    segundaChanceUsada: false,
    ultimaAcaoJogador: 'atacar',
  };
  p(`⚔ TREINO: um ${b.nome}!`, 'arena');
  if (b.desc) p(b.desc, 'sistema');
  mostrarStatusCombate(e, p);
}
function listarArena(e, p) {
  p(`◆ ${ARENA_INFO.nome}`, 'arena');
  p(ARENA_INFO.desc, 'sistema');
  p('', 'espaco');
  p('Regras:', 'titulo');
  ARENA_INFO.regras.forEach((r) => p('  · ' + r, 'sistema'));
  p('', 'espaco');
  p('Disponíveis:', 'titulo');
  for (const id of INIMIGOS_ARENA) {
    const i = INIMIGOS[id]; if (!i) continue;
    const m = e.estatisticas.inimigosMortos[id] || 0;
    p(`  ${i.nome} — HP ${i.hp} · ATK ${i.atk} · DEF ${i.def}${m > 0 ? ` (${m}x)` : ''}`, 'arena');
  }
  p('', 'espaco');
  p('Use "treinar <inimigo>".', 'sistema');
}

/* ================================================================== */
/* Combate                                                             */
/* ================================================================== */
const ACOES_COMBATE = ['atacar', 'forte', 'rapido', 'defender', 'esquivar', 'focar', 'fugir'];
const PERMITIDOS_EM_COMBATE = [...ACOES_COMBATE, 'usar', 'magia', 'magias', 'inventario', 'inv', 'i', 'status', 'ajuda', 'olhar', 'equipar', 'examinar', 'inspecionar', 'talentos', 'conquistas', 'clima', 'hora', 'diarias', 'reivindicar'];

function iniciarCombate(e, id, p) {
  const b = INIMIGOS[id];
  const periodo = calcularPeriodo(e.hora || 12);
  const clima = getClima(e.climaAtual || 'limpo');

  // ⭐ Ajuste de inimigo por período + clima
  const atkBonus = (periodo.atkInimigo || 0) + (clima.inimigoAtkBonus || 0);
  const hpBonusPct = (periodo.hpInimigo || 0) + (clima.vidaExtra || 0);
  const hpFinal = Math.round(b.hp * (1 + hpBonusPct));

  e.emCombate = {
    id, nome: b.nome, hp: hpFinal, hpMax: hpFinal,
    atk: b.atk + atkBonus, def: b.def,
    chefe: !!b.chefe, turno: 1,
    defesaAtiva: false, esquivaAtiva: false, criticoCarregado: false,
    inimigoDefendendo: false, inimigoEsquivando: false, inimigoFocando: false,
    enfurecido: false, efeitos: [], arena: false,
    segundaChanceUsada: false,
    ultimaAcaoJogador: 'atacar',
  };
  const tipo = b.chefe ? 'combate-chefe' : 'combate-inicio';
  p(`⚔ ${b.chefe ? 'CHEFE! ' : ''}Um ${b.nome} surge!`, tipo);
  if (b.desc) p(b.desc, 'sistema');

  // ⭐ Avisa se período/clima afetou
  if (atkBonus > 0 || hpBonusPct > 0) {
    const mods = [];
    if (periodo.atkInimigo) mods.push(`+${periodo.atkInimigo} ATK (${periodo.nome})`);
    if (clima.inimigoAtkBonus) mods.push(`+${clima.inimigoAtkBonus} ATK (${clima.nome})`);
    if (periodo.hpInimigo) mods.push(`+${Math.round(periodo.hpInimigo * 100)}% HP (${periodo.nome})`);
    if (clima.vidaExtra) mods.push(`+${Math.round(clima.vidaExtra * 100)}% HP (${clima.nome})`);
    if (mods.length) p(`   ${periodo.emoji}${clima.emoji} Condições: ${mods.join(', ')}`, 'tempo-aviso');
  }

  mostrarStatusCombate(e, p);
}

function mostrarStatusCombate(e, p) {
  const ini = e.emCombate; if (!ini) return;
  const clima = getClima(e.climaAtual || 'limpo');
  const periodo = calcularPeriodo(e.hora || 12);

  p(`${ini.arena ? '⚔ TREINO — ' : ''}Turno ${ini.turno} · ${clima.emoji} ${clima.nome} · ${periodo.emoji} ${periodo.nome}`, 'combate-turno');
  p(`  ${ini.nome}: [${barra(ini.hp, ini.hpMax)}] ${Math.max(0, ini.hp)}/${ini.hpMax}`, 'combate');
  p(`  Você:        [${barra(e.hp, e.hpMax)}] ${e.hp}/${e.hpMax}`, 'combate');
  if (e.manaMax > 0) p(`  Mana:        [${barra(e.mana, e.manaMax)}] ${e.mana}/${e.manaMax}`, 'mana');
  const ef = [];
  if (ini.defesaAtiva) ef.push('🛡 defendendo');
  if (ini.esquivaAtiva) ef.push('💨 esquivando');
  if (ini.criticoCarregado) ef.push('🎯 crítico pronto');
  const res = resumoEfeitos(e); if (res) ef.push(res);
  if (ef.length) p('  Você: ' + ef.join(' | '), 'destaque');
  const efI = [];
  if (ini.inimigoDefendendo) efI.push('🛡 defendendo');
  if (ini.inimigoEsquivando) efI.push('💨 esquivando');
  if (ini.inimigoFocando) efI.push('🎯 focando');
  if (ini.enfurecido) efI.push('🔥 ENFURECIDO');
  for (const x of (ini.efeitos || [])) {
    const d = EFEITOS[x.tipo];
    if (d) efI.push(`${d.emoji} ${d.nome}`);
    else if (x.tipo === 'atordoado') efI.push('⚡ atordoado');
    else if (x.tipo === 'congelado') efI.push('❄ congelado');
  }
  if (efI.length) p('  Inimigo: ' + efI.join(' | '), 'combate');
  p('Ações: atacar · forte · rapido · defender · esquivar · focar · magia · usar · fugir', 'sistema');
}

function ataqueJogador(e, ini, acao) {
  const clima = getClima(e.climaAtual || 'limpo');
  let dano = atkTotal(e) + d6() - ini.def;
  let errou = false, critico = false;

  // ⭐ Nevoeiro: chance de errar
  if (clima.chanceErrar > 0 && Math.random() < clima.chanceErrar) {
    return { dano: 0, errou: true, critico: false, motivo: 'nevoeiro' };
  }

  if (acao === 'forte') {
    if (Math.random() < 0.3) errou = true;
    else dano = Math.round(dano * 1.5);
  } else if (acao === 'rapido') {
    dano = Math.max(1, dano - 2);
  }

  // ⭐ Modificador de clima para encantamento
  const encArma = e.encantamentos?.arma;
  let modClima = 0;
  if (encArma === 'fogo') modClima = clima.danoFogo;
  else if (encArma === 'gelo') modClima = clima.danoGelo;
  dano += modClima;

  if (temTalento(e, 'perfurante')) dano += 3;
  if (temTalento(e, 'furia') && e.hp / e.hpMax < 0.3) dano = Math.round(dano * 1.5);
  if (temTalento(e, 'mestre_sombras') && e.hp >= e.hpMax) dano += 6;
  if (errou && acao === 'forte' && temTalento(e, 'sem_erro_forte')) {
    errou = false;
    dano = Math.round((atkTotal(e) + d6() - ini.def) * 1.5);
  }

  // ⭐ Tempestade: +10% chance de crítico
  let chanceCritExtra = clima.critBonus || 0;
  if (!errou && e.emCombate.criticoCarregado) {
    dano *= temTalento(e, 'assassino') ? 3 : 2;
    critico = true;
  } else if (!errou && chanceCritExtra > 0 && Math.random() < chanceCritExtra) {
    dano = Math.round(dano * 1.5);
    critico = true;
  }

  if (!errou && e.emCombate.inimigoDefendendo) dano = Math.max(1, Math.round(dano * 0.4));
  if (!errou && e.emCombate.inimigoEsquivando && Math.random() < 0.5) errou = true;

  return { dano: Math.max(1, dano), errou, critico, modClima };
}

function escolherAcaoInimigo(e, ini) {
  const b = INIMIGOS[ini.id] || {};
  const hpJ = e.hp / e.hpMax;
  const hpI = ini.hp / ini.hpMax;
  const ultima = ini.ultimaAcaoJogador || 'atacar';

  if (b.padrao?.length) {
    const idx = (ini.turno - 1) % b.padrao.length;
    let acao = b.padrao[idx];
    if (ultima === 'focar' && Math.random() < 0.5 && acao === 'atacar') acao = 'defender';
    if (hpI < 0.25 && b.padrao.includes('cura_sombria') && acao !== 'cura_sombria') {
      if (Math.random() < 0.6) acao = 'cura_sombria';
    }
    return acao;
  }

  if (ultima === 'focar' && Math.random() < 0.65) return 'defender';
  if (ultima === 'defender' && Math.random() < 0.45) return 'focar';
  if (ultima === 'esquivar' && Math.random() < 0.40) return 'atacar';
  if ((ultima === 'usar' || ultima === 'magia') && Math.random() < 0.55) return 'atacar';

  if (hpI < 0.20) {
    if (!ini.chefe && !ini.arena && Math.random() < 0.35) return 'fugir';
    if (Math.random() < 0.5) return 'forte';
  }
  if (hpI < 0.35 && Math.random() < 0.4) return 'defender';
  if (hpJ < 0.25 && Math.random() < 0.65) return 'forte';

  const arq = b.arquetipo || 'tatico';
  return sorteioPonderado(ARQUETIPOS[arq] || ARQUETIPOS.tatico);
}

function resolverAcaoInimigo(e, ini, acao, p) {
  if (acao === 'defender') { ini.inimigoDefendendo = true; p(`🛡 ${ini.nome} assume postura defensiva.`, 'combate'); return; }
  if (acao === 'esquivar') { ini.inimigoEsquivando = true; p(`💨 ${ini.nome} se prepara para esquivar.`, 'combate'); return; }
  if (acao === 'focar') { ini.inimigoFocando = true; p(`🎯 ${ini.nome} concentra-se — o próximo ataque será brutal.`, 'combate'); return; }

  if (acao === 'fugir') {
    e.estatisticas.fugasInimigos += 1;
    const xpParcial = Math.round((INIMIGOS[ini.id]?.xp || 0) * 0.3);
    p(`💨 ${ini.nome} fugiu do combate!`, 'aviso');
    if (xpParcial > 0) { e.xp += xpParcial; p(`   Você ganha ${xpParcial} XP pela escaramuça.`, 'xp'); }
    e.emCombate = null; e.efeitos = [];
    checarNivel(e, p);
    return;
  }
  if (acao === 'cura_sombria') {
    const cura = Math.round(ini.hpMax * 0.15);
    const antes = ini.hp;
    ini.hp = Math.min(ini.hpMax, ini.hp + cura);
    p(`🌑 ${ini.nome} canaliza energia sombria e recupera ${ini.hp - antes} HP. (${ini.hp}/${ini.hpMax})`, 'evento-ruim');
    return;
  }
  if (acao === 'rugido') {
    p(`🔊 ${ini.nome} emite um RUGIDO ensurdecedor!`, 'aviso');
    aplicarEfeito(e, 'fraqueza', p, true);
    return;
  }
  if (acao === 'maldicao') {
    p(`💀 ${ini.nome} lança uma MALDIÇÃO sobre você!`, 'evento-ruim');
    aplicarEfeito(e, 'fraqueza', p, true);
    aplicarEfeito(e, 'sangramento', p, true);
    return;
  }

  let danoBase = ini.atk + d6() - defTotal(e);
  let ignorarMetade = false;
  let aplicarQueimadura = false;

  if (acao === 'forte') {
    if (Math.random() < 0.3) { p(`✔ ${ini.nome} tentou um golpe forte e errou!`, 'esquiva'); ini.inimigoFocando = false; return; }
    danoBase = Math.round(danoBase * 1.5);
  } else if (acao === 'golpe_terra') {
    danoBase = Math.round(danoBase * 2);
    p(`⛰ ${ini.nome} usa GOLPE TERRA! O chão racha sob seus pés.`, 'aviso');
  } else if (acao === 'sopro_fogo') {
    danoBase = Math.round(danoBase * 1.5);
    aplicarQueimadura = true;
    p(`🔥 ${ini.nome} exala um SOPRO DE FOGO!`, 'aviso');
  } else if (acao === 'magia_sombria') {
    danoBase = Math.round(danoBase * 1.8);
    ignorarMetade = true;
    p(`🌑 ${ini.nome} conjura MAGIA SOMBRIA!`, 'aviso');
  }

  if (ini.inimigoFocando) {
    danoBase *= 2; ini.inimigoFocando = false;
    p(`   (o foco acumulado potencializa o golpe!)`, 'combate');
  }
  if (ini.enfurecido) danoBase += 2;
  if (ignorarMetade) danoBase += Math.floor(defTotal(e) * 0.5);
  if (e.emCombate.defesaAtiva) danoBase = Math.max(1, Math.round(danoBase * 0.4));

  if (temTalento(e, 'evasao') && e.hp / e.hpMax < 0.5 && Math.random() < 0.5) {
    p(`💫 Você esquivou por pura agilidade!`, 'esquiva'); return;
  }
  if (e.emCombate.esquivaAtiva && Math.random() < 0.5) {
    p(`💨 Você esquivou do ataque!`, 'esquiva'); return;
  }

  const dano = Math.max(1, danoBase);
  e.hp -= dano; e.estatisticas.danoRecebido += dano;
  p(`💥 ${ini.nome} causa ${dano} de dano. (${Math.max(0, e.hp)}/${e.hpMax} HP)`, 'dano-recebido');

  const ef = EFEITOS_INIMIGOS[ini.id];
  if (ef && Math.random() < ef.chance) {
    const imune = temTalento(e, 'imune_veneno') && (ef.tipo === 'veneno' || ef.tipo === 'sangramento');
    if (imune) p(`👻 Imune a ${ef.tipo}!`, 'buff');
    else aplicarEfeito(e, ef.tipo, p, true);
  }
  if (aplicarQueimadura && e.hp > 0) aplicarEfeito(e, 'queimadura', p, true);
}

function turnoInimigo(e, p) {
  const ini = e.emCombate; if (!ini) return;

  if (temTalento(e, 'regen_hp') && e.hp < e.hpMax) {
    const antes = e.hp;
    e.hp = Math.min(e.hpMax, e.hp + 2);
    if (e.hp > antes) p(`💚 Santo regenera ${e.hp - antes} HP. (${e.hp}/${e.hpMax})`, 'cura');
  }
  if (temTalento(e, 'regen_mp') && e.mana < e.manaMax) {
    const antes = e.mana;
    e.mana = Math.min(e.manaMax, e.mana + 3);
    if (e.mana > antes) p(`✨ Regeneração Mágica: +${e.mana - antes} MP. (${e.mana}/${e.manaMax})`, 'mana');
  }

  tickEfeitos(ini, p, ini.nome);
  if (ini.hp <= 0) { vencer(e, p); return; }
  const at = ini.efeitos?.find((x) => x.tipo === 'atordoado');
  const cg = ini.efeitos?.find((x) => x.tipo === 'congelado');
  if (at) { p(`⚡ ${ini.nome} está atordoado e perde o turno!`, 'sucesso'); ini.efeitos = ini.efeitos.filter((x) => x.tipo !== 'atordoado'); ini.turno += 1; mostrarStatusCombate(e, p); return; }
  if (cg) { p(`❄ ${ini.nome} está congelado e não se move!`, 'sucesso'); ini.efeitos = ini.efeitos.filter((x) => x.tipo !== 'congelado'); ini.turno += 1; mostrarStatusCombate(e, p); return; }

  const acao = escolherAcaoInimigo(e, ini);
  ini.inimigoDefendendo = false; ini.inimigoEsquivando = false;
  resolverAcaoInimigo(e, ini, acao, p);
  if (!e.emCombate) return;

  if (ini.chefe && !ini.enfurecido && ini.hp < ini.hpMax * 0.5) {
    ini.enfurecido = true;
    p(`🔥 ${ini.nome} está ENFURECIDO! (+2 ATK em todos os golpes)`, 'aviso');
  }
  if (e.hp <= 0) { morrer(e, p); return; }

  if (e.hp === 1) e.flags.teve_1hp = true;

  e.emCombate.defesaAtiva = false; e.emCombate.esquivaAtiva = false;
  ini.turno += 1; e.estatisticas.turnosDeCombate += 1;
  mostrarStatusCombate(e, p);
}

function processarCombate(e, cmd, arg, p) {
  const ini = e.emCombate; if (!ini) return;
  tickEfeitos(e, p, 'Você');
  if (e.hp <= 0) { morrer(e, p); return; }
  ini.ultimaAcaoJogador = cmd;

  if (cmd === 'defender') { e.emCombate.defesaAtiva = true; p('🛡 Você assume postura defensiva. (-60% dano recebido neste turno)', 'defesa'); turnoInimigo(e, p); return; }
  if (cmd === 'esquivar') { e.emCombate.esquivaAtiva = true; p('💨 Você se prepara para esquivar. (50% de evitar o ataque)', 'esquiva'); turnoInimigo(e, p); return; }
  if (cmd === 'focar') { e.emCombate.criticoCarregado = true; p('🎯 Você se concentra. Próximo ataque será CRÍTICO (dano dobrado).', 'critico-pronto'); turnoInimigo(e, p); return; }
  if (cmd === 'fugir') {
    if (ini.chefe && !ini.arena) { p('✖ Não dá pra fugir de um chefe!', 'erro'); turnoInimigo(e, p); return; }
    if (ini.arena) { p('✔ Sai do ringue.', 'fuga'); e.emCombate = null; e.efeitos = []; return; }
    if (Math.random() < 0.5) { p('✔ Fugiu!', 'fuga'); e.emCombate = null; e.efeitos = []; return; }
    p('✖ Tropeçou!', 'erro'); turnoInimigo(e, p); return;
  }
  if (cmd === 'magia') {
    const mid = normalizar(arg); if (!mid) { p('Qual magia? Use "magias" para listar.', 'erro'); return; }
    const ok = lancarMagia(e, mid, p);
    if (ok && e.emCombate) turnoInimigo(e, p);
    return;
  }

  const golpeDuplo = temTalento(e, 'golpe_duplo') && Math.random() < (temTalento(e, 'velocidade') ? 0.5 : 0.25);
  const vezes = golpeDuplo ? 2 : 1;
  let totalDano = 0; let algumCritico = false; let errouNevoeiro = false;

  for (let v = 0; v < vezes && ini.hp > 0; v++) {
    const { dano, errou, critico, motivo } = ataqueJogador(e, ini, cmd);
    if (errou) {
      if (motivo === 'nevoeiro') { errouNevoeiro = true; break; }
      p(`✖ Você errou${v > 0 ? ' o segundo golpe' : ''}!`, 'erro');
    } else {
      ini.hp -= dano; e.estatisticas.danoTotal += dano;
      totalDano += dano;
      if (critico) algumCritico = true;
      const encArma = e.encantamentos?.arma;
      if (encArma && ENCANTAMENTOS[encArma]?.efeito && ini.hp > 0) {
        const en = ENCANTAMENTOS[encArma];
        if (Math.random() < en.chance) { aplicarEfeito(ini, en.efeito); p(`${en.emoji} ${en.nome} ativa! ${ini.nome} recebe ${en.efeito}!`, 'dano-magico'); }
      }
      if (temTalento(e, 'veneno_auto') && Math.random() < 0.25 && ini.hp > 0) { aplicarEfeito(ini, 'veneno'); p(`☠ Veneno Aprimorado aplicado!`, 'dano-magico'); }
    }
  }

  if (errouNevoeiro) {
    p(`🌫 O nevoeiro te atrapalha — você erra o ataque!`, 'tempo-aviso');
  } else if (totalDano > 0) {
    const ex = []; if (algumCritico) ex.push('CRÍTICO'); if (cmd === 'forte') ex.push('forte'); if (cmd === 'rapido') ex.push('rápido'); if (golpeDuplo) ex.push('GOLPE DUPLO');
    p(`⚔ Você${ex.length ? ' (' + ex.join(', ') + ')' : ''} causa ${totalDano}.`, algumCritico ? 'dano-critico' : 'dano-causado');
    progredirDiaria(e, 'dano', totalDano, p);
  }

  e.emCombate.criticoCarregado = false;
  if (ini.hp <= 0) { vencer(e, p); return; }
  turnoInimigo(e, p);
}

function vencer(e, p) {
  const ini = e.emCombate;
  const b = INIMIGOS[ini.id];
  if (ini.arena) {
    p(`☠ ${ini.nome} derrotado!`, 'arena');
    const xp = Math.round(b.xp * 0.5);
    e.xp += xp; e.estatisticas.vitoriasArena += 1;
    p(`+${xp} XP.`, 'xp');
    e.emCombate = null; e.efeitos = [];
    progredirDiaria(e, 'arena', 1, p);
    checarNivel(e, p);
    checarConquistas(e, p);
    return;
  }
  p(`☠ ${ini.nome} derrotado em ${ini.turno} turnos!`, 'vitoria');
  e.xp += b.xp;
  e.estatisticas.inimigosMortos[ini.id] = (e.estatisticas.inimigosMortos[ini.id] || 0) + 1;
  p(`+${b.xp} XP. (${e.xp}/${e.xpProx})`, 'xp');
  if (b.loot?.length) {
    const n = [];
    for (const id of b.loot) { addItem(e, id, 1); n.push(ITENS[id].nome); }
    p(`Loot: ${n.join(', ')}.`, 'loot');
  }
  e.flags[`derrotou_${ini.id}`] = true;
  const role = ini.dungeonRole;
  e.emCombate = null; e.efeitos = [];
  progredir(e, 'matar', ini.id, p);
  progredirDiaria(e, 'matar', 1, p);
  if (b.chefe) progredirDiaria(e, 'matar_chefe', 1, p);
  checarNivel(e, p);
  checarConquistas(e, p);
  verificarProgressoCampanha(e, p);   // ⭐ NOVO

  /* ⭐ Se matou o chefe final da dungeon, conclui */
  if (role === 'chefe_final') {
    concluirDungeon(e, p);
  } else if (role) {
    p('', 'espaco');
    p('Use "avancar" para continuar explorando.', 'sistema');
  }
}

function morrer(e, p) {
  const ini = e.emCombate;
  const arena = ini?.arena;
  if (!arena && ini && !ini.segundaChanceUsada && temTalento(e, 'segunda_chance')) {
    ini.segundaChanceUsada = true;
    e.hp = Math.round(e.hpMax * 0.3);
    e.efeitos = [];
    p('❤ SEGUNDA CHANCE! Você resiste e volta com 30% do HP.', 'level-up');
    return;
  }
  e.emCombate = null; e.efeitos = [];
  if (arena) {
    e.hp = 1; e.mana = Math.max(0, Math.floor(e.manaMax * 0.3));
    e.estatisticas.nocauteArena += 1;
    p('✖ Nocauteado!', 'arena');
    p('Rodrigo: "Levanta, moleque."', 'arena');
    return;
  }
  const perdidas = Math.floor(e.moedas * 0.2);
  e.moedas -= perdidas;
  e.hp = e.hpMax; e.mana = e.manaMax;
  e.local = 'pedraverde';
  const estavaNaDungeon = !!e.dungeon;
  e.dungeon = null;
  e.estatisticas.mortes += 1;
  p('✖ Você caiu...', 'morte');
  p(`Acorda em Pedraverde. -${perdidas} moedas.`, 'morte');
  if (estavaNaDungeon) p('   O portal te expulsou — você perdeu o progresso da dungeon.', 'aviso');
  checarConquistas(e, p);
}

/* ================================================================== */
/* CRAFTING / ENCANTAMENTO                                             */
/* ================================================================== */
function listarReceitas(e, p, filtro) {
  const lista = filtro ? RECEITAS.filter((r) => r.estacao === filtro) : RECEITAS;
  if (!lista.length) { p('Nenhuma receita.', 'erro'); return; }
  p(`◆ Receitas${filtro ? ` — ${filtro}` : ''}`, 'titulo');
  p('', 'espaco');
  lista.forEach((r) => {
    const item = ITENS[r.id]; if (!item) return;
    const nivelOk = e.nivel >= (r.nivel || 1);
    p(`  ${item.nome}${raridadeTag(item)}${!nivelOk ? ` 🔒 Nv ${r.nivel}` : ''}`, nivelOk ? tipoRaridade(item) : 'receita-bloq');
    p(`     Custo: ${r.moedas || 0} ◈`, 'item-preco');
    const mats = Object.entries(r.materiais).map(([mid, q]) => {
      const tem = qtdItem(e, mid); const ok = tem >= q;
      return `${ITENS[mid]?.nome || mid} ${tem}/${q}${ok ? '✓' : '✗'}`;
    }).join(' · ');
    p(`     Materiais: ${mats}`, 'item-info');
    p('', 'separador');
  });
  p('Use "craftar <nome do item>".', 'sistema');
}
function tentarCraftar(e, arg, p) {
  const item = acharItem(arg);
  if (!item) { p('Item não encontrado.', 'erro'); return false; }
  const r = acharReceita(item.id);
  if (!r) { p(`${item.nome} não tem receita.`, 'erro'); return false; }
  if (e.nivel < (r.nivel || 1)) { p(`🔒 Precisa nível ${r.nivel}.`, 'erro'); return false; }
  if (e.moedas < (r.moedas || 0)) { p(`Moedas insuficientes (precisa ${r.moedas}).`, 'erro'); return false; }
  for (const [mid, q] of Object.entries(r.materiais)) {
    if (qtdItem(e, mid) < q) { p(`Falta ${ITENS[mid]?.nome || mid} (tem ${qtdItem(e, mid)}/${q}).`, 'erro'); return false; }
  }
  for (const [mid, q] of Object.entries(r.materiais)) remItem(e, mid, q);
  e.moedas -= (r.moedas || 0);
  addItem(e, item.id, 1);
  e.estatisticas.itensCriados += 1;
  p(`⚒ Você forjou ${item.nome}${raridadeTag(item)}!`, 'craft');
  progredirDiaria(e, 'craftar', 1, p);
  checarConquistas(e, p);
  return true;
}
function tentarEncantar(e, slotArg, encArg, p) {
  const slot = normalizar(slotArg);
  if (!SLOTS_EQUIP.includes(slot)) { p(`Slot inválido. Use: ${SLOTS_EQUIP.join(', ')}.`, 'erro'); return false; }
  if (!e.equipado[slot]) { p(`Nada equipado em ${slot}.`, 'erro'); return false; }
  if (e.encantamentos?.[slot]) { p(`${slot} já tem encantamento. Use "desencantar ${slot}".`, 'erro'); return false; }
  const tipo = normalizar(encArg);
  const enc = ENCANTAMENTOS[tipo];
  if (!enc) { p(`Encantamento inválido. Disponíveis: ${Object.keys(ENCANTAMENTOS).join(', ')}.`, 'erro'); return false; }
  if (e.nivel < enc.nivel) { p(`🔒 Precisa nível ${enc.nivel}.`, 'erro'); return false; }
  if (e.moedas < enc.moedas) { p(`Precisa ${enc.moedas}◈. Você tem ${e.moedas}.`, 'erro'); return false; }
  if (qtdItem(e, enc.gema) < 1) { p(`Precisa de ${ITENS[enc.gema]?.nome || enc.gema}.`, 'erro'); return false; }
  remItem(e, enc.gema, 1);
  e.moedas -= enc.moedas;
  e.encantamentos[slot] = tipo;
  e.estatisticas.itensEncantados += 1;
  p(`${enc.emoji} Você imbui ${ITENS[e.equipado[slot]].nome} com ${enc.nome}!`, 'encantar');
  p(`   ${enc.desc}`, 'encantar');
  progredirDiaria(e, 'encantar', 1, p);
  checarConquistas(e, p);
  return true;
}

/* ================================================================== */
/* TALENTOS                                                            */
/* ================================================================== */
function listarTalentos(e, p) {
  const classeId = e.classe;
  const lista = TALENTOS[classeId] || {};
  p('◆ Talentos', 'titulo');
  p(`Classe: ${CLASSES[classeId]?.nome || classeId} · Pontos disponíveis: ${e.pontosTalento}`, 'talento-info');
  p('', 'espaco');
  if (e.talentos.length) {
    p('— Já aprendidos —', 'titulo');
    for (const id of e.talentos) { const t = acharTalento(id); if (t) p(`  ${t.emoji} ${t.nome}`, 'talento-ok'); }
    p('', 'espaco');
  }
  for (const nivelStr of Object.keys(lista)) {
    const nivel = parseInt(nivelStr, 10);
    const opcoes = lista[nivelStr];
    const nivelAtingido = e.nivel >= nivel;
    const algumaEscolhida = opcoes.some((t) => e.talentos.includes(t.id));
    p(`— Nível ${nivel} ${nivelAtingido ? (algumaEscolhida ? '✓' : '⚠') : '🔒'} —`, 'titulo');
    if (!nivelAtingido) p('  Bloqueado (você é nível ' + e.nivel + ')', 'talento-bloq');
    else if (algumaEscolhida) { const escolhido = opcoes.find((t) => e.talentos.includes(t.id)); p(`  ${escolhido.emoji} ${escolhido.nome} (escolhido)`, 'talento-ok'); }
    else {
      opcoes.forEach((t, i) => {
        p(`  [${i + 1}] ${t.emoji} ${t.nome}`, 'talento-opcao');
        p(`       ${t.desc}`, 'item-desc');
        if (t.bonus) {
          const b = [];
          if (t.bonus.atk) b.push(`+${t.bonus.atk} ATK`);
          if (t.bonus.def) b.push(`${t.bonus.def > 0 ? '+' : ''}${t.bonus.def} DEF`);
          if (t.bonus.hpMax) b.push(`+${t.bonus.hpMax} HP`);
          if (t.bonus.manaMax) b.push(`+${t.bonus.manaMax} MP`);
          if (b.length) p(`       ${b.join(' · ')}`, 'item-bonus');
        }
      });
      if (e.pontosTalento > 0) p(`  → Escolha: "escolher ${nivel} <1|2>"`, 'talento-comando');
      else p(`  → Ganhe um ponto de talento ao subir de nível`, 'talento-bloq');
    }
    p('', 'separador');
  }
}
function escolherTalento(e, args, p) {
  const partes = args.split(/\s+/).filter(Boolean);
  if (!partes.length) { p('Uso: "escolher <nível> <1|2>". Ex: escolher 5 1', 'erro'); p('Ou: "escolher <id do talento>". Ex: escolher furia', 'erro'); p('Use "talentos" para ver as opções.', 'sistema'); return; }
  if (e.pontosTalento <= 0) { p('Você não tem pontos de talento disponíveis.', 'erro'); return; }
  const classeId = e.classe;
  const lista = TALENTOS[classeId] || {};
  if (partes.length === 2 && /^\d+$/.test(partes[0]) && /^[12]$/.test(partes[1])) {
    const nivel = parseInt(partes[0], 10);
    const idx = parseInt(partes[1], 10) - 1;
    const opcoes = lista[String(nivel)];
    if (!opcoes) { p(`Não há talento disponível no nível ${nivel} para ${CLASSES[classeId]?.nome}.`, 'erro'); return; }
    if (e.nivel < nivel) { p(`🔒 Você ainda não atingiu o nível ${nivel}.`, 'erro'); return; }
    if (opcoes.some((t) => e.talentos.includes(t.id))) { p(`Você já escolheu um talento do nível ${nivel}.`, 'erro'); return; }
    const talento = opcoes[idx];
    if (!talento) { p('Opção inválida.', 'erro'); return; }
    aplicarTalento(e, talento, p);
    return;
  }
  const idAlvo = normalizar(partes.join('_'));
  let talentoEncontrado = null;
  let nivelDoTalento = null;
  for (const nivelStr of Object.keys(lista)) {
    for (const t of lista[nivelStr]) {
      if (normalizar(t.id).includes(idAlvo) || normalizar(t.nome).includes(normalizar(partes.join(' ')))) {
        talentoEncontrado = t; nivelDoTalento = parseInt(nivelStr, 10); break;
      }
    }
    if (talentoEncontrado) break;
  }
  if (!talentoEncontrado) { p(`Talento "${args}" não encontrado para sua classe.`, 'erro'); p('Use "talentos" para ver as opções.', 'sistema'); return; }
  if (e.nivel < nivelDoTalento) { p(`🔒 Você ainda não atingiu o nível ${nivelDoTalento}.`, 'erro'); return; }
  const opcoesNivel = lista[String(nivelDoTalento)] || [];
  if (opcoesNivel.some((t) => e.talentos.includes(t.id))) { p(`Você já escolheu um talento do nível ${nivelDoTalento}.`, 'erro'); return; }
  aplicarTalento(e, talentoEncontrado, p);
}
function aplicarTalento(e, talento, p) {
  if (e.talentos.includes(talento.id)) { p('Você já tem esse talento.', 'erro'); return; }
  e.talentos.push(talento.id);
  e.pontosTalento -= 1;
  p(`★ Talento aprendido: ${talento.emoji} ${talento.nome}`, 'talento-aprendido');
  p(`   ${talento.desc}`, 'item-desc');
  if (talento.bonus) {
    if (talento.bonus.hpMax) { e.hpMax += talento.bonus.hpMax; e.hp += talento.bonus.hpMax; p(`   +${talento.bonus.hpMax} HP máximo.`, 'item-bonus'); }
    if (talento.bonus.manaMax) { e.manaMax += talento.bonus.manaMax; e.mana += talento.bonus.manaMax; p(`   +${talento.bonus.manaMax} MP máximo.`, 'item-bonus'); }
    if (talento.bonus.atk) p(`   ${talento.bonus.atk > 0 ? '+' : ''}${talento.bonus.atk} ATK.`, 'item-bonus');
    if (talento.bonus.def) p(`   ${talento.bonus.def > 0 ? '+' : ''}${talento.bonus.def} DEF.`, 'item-bonus');
  }
  checarConquistas(e, p);
}

/* ================================================================== */
/* CONQUISTAS                                                          */
/* ================================================================== */
function listarConquistas(e, p) {
  const total = CONQUISTAS.length;
  const feitas = e.conquistasDesbloqueadas.length;
  const pct = Math.round((feitas / total) * 100);
  p('◆ Conquistas', 'titulo');
  p(`Progresso: ${feitas}/${total} (${pct}%)`, 'conquista-info');
  if (e.titulo) p(`Título atual: "${e.titulo}"`, 'talento-ok');
  p('', 'espaco');
  const porCat = {};
  for (const c of CONQUISTAS) {
    if (!porCat[c.cat]) porCat[c.cat] = [];
    porCat[c.cat].push(c);
  }
  for (const catId of Object.keys(CATEGORIAS_CONQUISTAS)) {
    const cat = CATEGORIAS_CONQUISTAS[catId];
    const lista = porCat[catId] || [];
    const feitasCat = lista.filter((c) => e.conquistasDesbloqueadas.includes(c.id)).length;
    p(`${cat.emoji} ${cat.nome} (${feitasCat}/${lista.length})`, 'titulo');
    for (const c of lista) {
      const feita = e.conquistasDesbloqueadas.includes(c.id);
      if (feita) {
        p(`  ${c.emoji} ${c.nome} ✓`, 'conquista-ok');
        p(`     ${c.desc}`, 'item-desc');
        if (c.titulo) p(`     ★ Título: "${c.titulo}"`, 'talento-ok');
      } else {
        p(`  🔒 ${c.nome}`, 'conquista-bloq');
        p(`     ${c.desc}`, 'item-desc');
      }
    }
    p('', 'separador');
  }
  const titulos = CONQUISTAS.filter((c) => c.titulo && e.conquistasDesbloqueadas.includes(c.id)).map((c) => c.titulo);
  if (titulos.length) {
    p('★ Títulos disponíveis:', 'titulo');
    titulos.forEach((t) => p(`  "${t}"`, 'talento-opcao'));
    p('Use "titulo <nome>" para equipar.', 'sistema');
    p('Use "titulo nenhum" para remover o título.', 'sistema');
  }
}
function escolherTitulo(e, arg, p) {
  const alvo = normalizar(arg);
  if (!alvo) { p('Uso: "titulo <nome>" ou "titulo nenhum".', 'erro'); p('Use "conquistas" para ver os títulos disponíveis.', 'sistema'); return; }
  if (alvo === 'nenhum' || alvo === 'none' || alvo === 'remover' || alvo === 'limpar') { e.titulo = null; p('Título removido.', 'sistema'); return; }
  const titulos = CONQUISTAS.filter((c) => c.titulo && e.conquistasDesbloqueadas.includes(c.id)).map((c) => c.titulo);
  const encontrado = titulos.find((t) => normalizar(t).includes(alvo));
  if (!encontrado) { p(`Você não tem o título "${arg}".`, 'erro'); p('Use "conquistas" para ver os disponíveis.', 'sistema'); return; }
  e.titulo = encontrado;
  p(`★ Título equipado: "${encontrado}"`, 'talento-aprendido');
}

/* ================================================================== */
/* CLIMA E HORA — comando                                              */
/* ================================================================== */
function comandoClima(e, p) {
  const clima = getClima(e.climaAtual || 'limpo');
  const periodo = calcularPeriodo(e.hora || 12);
  p('◆ Tempo e clima', 'titulo');
  p(`${clima.emoji} Clima: ${clima.nome}`, 'tempo-clima');
  p(`   ${clima.desc}`, 'item-desc');
  p('', 'espaco');
  p(`${periodo.emoji} Período: ${periodo.nome}`, 'tempo-periodo');
  p(`   ${periodo.desc}`, 'item-desc');
  p('', 'espaco');
  p(`🕐 Hora atual: ${formatarHora(e.hora || 12)} · Dia ${e.dia || 1}`, 'tempo-info');

  // Efeitos ativos
  const efeitos = [];
  if (clima.danoFogo) efeitos.push(`Magias de fogo: ${clima.danoFogo > 0 ? '+' : ''}${clima.danoFogo} dano`);
  if (clima.danoGelo) efeitos.push(`Magias de gelo: ${clima.danoGelo > 0 ? '+' : ''}${clima.danoGelo} dano`);
  if (clima.critBonus) efeitos.push(`Chance de crítico: ${clima.critBonus > 0 ? '+' : ''}${Math.round(clima.critBonus * 100)}%`);
  if (clima.chanceErrar) efeitos.push(`Chance de errar: +${Math.round(clima.chanceErrar * 100)}%`);
  if (clima.inimigoAtkBonus) efeitos.push(`ATK dos inimigos: +${clima.inimigoAtkBonus}`);
  if (clima.vidaExtra) efeitos.push(`Vida extra dos inimigos: +${Math.round(clima.vidaExtra * 100)}%`);
  if (periodo.encontroBonus) efeitos.push(`Encontros: +${Math.round(periodo.encontroBonus * 100)}%`);
  if (periodo.atkInimigo) efeitos.push(`ATK dos inimigos: +${periodo.atkInimigo}`);
  if (periodo.hpInimigo) efeitos.push(`Vida extra dos inimigos: +${Math.round(periodo.hpInimigo * 100)}%`);

  if (efeitos.length) {
    p('', 'espaco');
    p('Efeitos ativos:', 'titulo');
    efeitos.forEach((e) => p(`  · ${e}`, 'tempo-efeito'));
  }
}

function comandoHora(e, p) {
  const clima = getClima(e.climaAtual || 'limpo');
  const periodo = calcularPeriodo(e.hora || 12);
  p(`${clima.emoji} ${clima.nome} · ${periodo.emoji} ${periodo.nome} · 🕐 ${formatarHora(e.hora || 12)} · Dia ${e.dia || 1}`, 'tempo-info');
}

/* ================================================================== */
/* DUNGEON PROCEDURAL                                                  */
/* ================================================================== */

function iniciarDungeon(e, p) {
  const d = gerarDungeon();
  e.dungeon = d;
  p('', 'espaco');
  p(`🌀 Você atravessa o portal...`, 'dungeon-titulo');
  p(`   A ${DUNGEON_INFO.nome} tem ${d.totalAndares} andares.`, 'dungeon-info');
  p('   Use "avancar" para explorar, "sair_dungeon" para fugir.', 'sistema');
  p('', 'espaco');
  resolverSalaDungeon(e, p);
}

function resolverSalaDungeon(e, p) {
  const d = e.dungeon;
  if (!d) return;
  const andar = d.andares[d.andarAtual - 1];
  if (!andar) { concluirDungeon(e, p); return; }
  const sala = andar[d.salaAtual];
  if (!sala) { proximoAndarDungeon(e, p); return; }

  sala.visitada = true;
  const bonus = bonusPorAndar(d.andarAtual);
  p(`— Andar ${d.andarAtual}/${d.totalAndares} · Sala ${d.salaAtual + 1}/${andar.length} —`, 'dungeon-titulo');

  switch (sala.tipo) {
    case 'combate': {
      const pool = poolInimigos(d.andarAtual);
      const idIni = pool[Math.floor(Math.random() * pool.length)];
      iniciarCombateDungeon(e, idIni, p, bonus, 'normal');
      break;
    }
    case 'tesouro': {
      const moedas = Math.round((20 + Math.random() * 30) * bonus.moedasMult);
      e.moedas += moedas;
      d.recompensaAcumulada.moedas += moedas;
      p(`💰 Você encontrou um baú! +${moedas} moedas.`, 'loot');
      if (Math.random() < 0.5 + bonus.lootBonus) {
        const itens = ['pocao', 'elixir_maior', 'antidoto', 'gema_rubi', 'gema_safira', 'cristal', 'elixir_mana'];
        const itemId = itens[Math.floor(Math.random() * itens.length)];
        addItem(e, itemId, 1);
        d.recompensaAcumulada.itens.push(itemId);
        p(`   Você também achou: ${ITENS[itemId].nome}${raridadeTag(ITENS[itemId])}.`, 'loot');
      }
      break;
    }
    case 'descanso': {
      const hpAntes = e.hp, mpAntes = e.mana;
      e.hp = Math.min(e.hpMax, e.hp + Math.round(e.hpMax * 0.4));
      e.mana = Math.min(e.manaMax, e.mana + Math.round(e.manaMax * 0.4));
      e.efeitos = [];
      p(`✨ Uma fonte de energia restaura suas forças.`, 'cura');
      p(`   HP ${hpAntes}→${e.hp} | MP ${mpAntes}→${e.mana}`, 'cura');
      break;
    }
    case 'armadilha': {
      const dano = Math.round((8 + Math.random() * 12) * (1 + (d.andarAtual - 1) * 0.1));
      const evitou = Math.random() < 0.4;
      if (evitou) {
        p(`⚠ Você desviou de uma armadilha por pouco!`, 'sucesso');
      } else {
        e.hp -= dano;
        p(`⚠ Armadilha! Você sofre ${dano} de dano. (${Math.max(0, e.hp)}/${e.hpMax} HP)`, 'dano-recebido');
        if (e.hp <= 0) { morrer(e, p); return; }
      }
      break;
    }
    case 'evento': {
      const ev = sortearEvento();
      ev.aplicar(e, p);
      e.estatisticas.eventosVividos += 1;
      break;
    }
    case 'mini_chefe': {
      const pool = poolMiniChefes();
      const idIni = pool[Math.floor(Math.random() * pool.length)];
      p(`👹 Um MINI-CHEFE bloqueia o caminho!`, 'aviso');
      iniciarCombateDungeon(e, idIni, p, bonus, 'mini_chefe');
      break;
    }
    case 'chefe_final': {
      const pool = poolChefeFinal();
      const idIni = pool[Math.floor(Math.random() * pool.length)];
      p(`👑 O CHEFE FINAL da masmorra aguarda!`, 'aviso');
      iniciarCombateDungeon(e, idIni, p, bonus, 'chefe_final');
      break;
    }
  }

  if (!e.emCombate) {
    p('', 'espaco');
    p(`Andar ${d.andarAtual}/${d.totalAndares} — Sala ${d.salaAtual + 1}/${andar.length}`, 'dungeon-info');
    p('Use "avancar" para continuar.', 'sistema');
  }
}

function proximoAndarDungeon(e, p) {
  const d = e.dungeon;
  if (!d) return;
  if (d.andarAtual >= d.totalAndares) { concluirDungeon(e, p); return; }
  d.andarAtual += 1;
  d.salaAtual = 0;
  p('', 'espaco');
  p(`⬇ Você desce para o andar ${d.andarAtual}...`, 'dungeon-titulo');
  p('', 'espaco');
  resolverSalaDungeon(e, p);
}

function avancarDungeon(e, p) {
  const d = e.dungeon;
  if (!d) { p('Você não está numa dungeon.', 'erro'); return; }
  if (e.emCombate) { p('Termine o combate primeiro!', 'erro'); return; }

  const andar = d.andares[d.andarAtual - 1];
  d.salaAtual += 1;

  if (d.salaAtual >= andar.length) {
    proximoAndarDungeon(e, p);
  } else {
    resolverSalaDungeon(e, p);
  }
}

function concluirDungeon(e, p) {
  const d = e.dungeon;
  if (!d) return;
  p('', 'espaco');
  p('✦ Você completou a Masmorra Arcana!', 'dungeon-titulo');
  p(`   Andares: ${d.totalAndares} · Moedas: ${d.recompensaAcumulada.moedas} · Itens: ${d.recompensaAcumulada.itens.length}`, 'dungeon-info');
  const bonusXp = 100 + d.totalAndares * 30;
  e.xp += bonusXp;
  p(`   Bônus de conclusão: +${bonusXp} XP`, 'xp');
  e.dungeon = null;
  e.local = 'portao_arcano';
  checarNivel(e, p);
  checarConquistas(e, p);
}

function sairDungeon(e, p) {
  const d = e.dungeon;
  if (!d) { p('Você não está numa dungeon.', 'erro'); return; }
  if (e.emCombate) { p('Fuja do combate primeiro!', 'erro'); return; }
  const moedas = d.recompensaAcumulada.moedas;
  p('🌀 Você atravessa o portal de volta.', 'dungeon-info');
  p(`   Você levou ${moedas} moedas e ${d.recompensaAcumulada.itens.length} itens.`, 'loot');
  e.dungeon = null;
  e.local = 'portao_arcano';
  checarNivel(e, p);
  checarConquistas(e, p);
}

function iniciarCombateDungeon(e, id, p, bonus, role) {
  const b = INIMIGOS[id];
  const hpFinal = Math.round(b.hp * (1 + bonus.hpPct));
  const atkFinal = b.atk + bonus.atkBonus;
  const defFinal = b.def + bonus.defBonus;

  e.emCombate = {
    id, nome: b.nome, hp: hpFinal, hpMax: hpFinal,
    atk: atkFinal, def: defFinal,
    chefe: role === 'chefe_final' || role === 'mini_chefe',
    turno: 1,
    defesaAtiva: false, esquivaAtiva: false, criticoCarregado: false,
    inimigoDefendendo: false, inimigoEsquivando: false, inimigoFocando: false,
    enfurecido: false, efeitos: [], arena: false,
    segundaChanceUsada: false,
    ultimaAcaoJogador: 'atacar',
    dungeonRole: role,
    dungeonBonus: bonus,
  };

  const tipo = role !== 'normal' ? 'combate-chefe' : 'combate-inicio';
  const prefixo = role === 'mini_chefe' ? '👹 MINI-CHEFE:' : role === 'chefe_final' ? '👑 CHEFE FINAL:' : '⚔';
  p(`${prefixo} ${b.nome} (Nv dungeons: +${Math.round(bonus.hpPct * 100)}% HP, +${bonus.atkBonus} ATK)`, tipo);
  if (b.desc) p(b.desc, 'sistema');
  mostrarStatusCombate(e, p);
}

/* ================================================================== */
/* CAMPANHA NARRATIVA                                                  */
/* ================================================================== */

function verificarProgressoCampanha(e, p) {
  if (!e.campanha) return;
  for (const cap of CAMPANHA) {
    if (e.campanha.capitulosCompletos.includes(cap.id)) continue;
    if (cap.check(e)) {
      e.campanha.capitulosCompletos.push(cap.id);
      p('', 'espaco');
      p('✦ ═══════════════════════════════════════ ✦', 'campanha-marco');
      p(`✦ CAPÍTULO COMPLETO: ${cap.titulo}`, 'campanha-marco');
      p('✦ ═══════════════════════════════════════ ✦', 'campanha-marco');
      if (cap.recompensa) {
        if (cap.recompensa.moedas) e.moedas += cap.recompensa.moedas;
        if (cap.recompensa.xp) e.xp += cap.recompensa.xp;
        if (cap.recompensa.itens) cap.recompensa.itens.forEach((id) => addItem(e, id, 1));
        const r = cap.recompensa;
        const partes = [];
        if (r.moedas) partes.push(`${r.moedas} ◈`);
        if (r.xp) partes.push(`${r.xp} XP`);
        if (r.itens) partes.push(r.itens.map((i) => ITENS[i]?.nome).filter(Boolean).join(', '));
        if (partes.length) p(`   Recompensa: ${partes.join(' · ')}`, 'loot');
      }
      const proximo = CAMPANHA.find((c) => !e.campanha.capitulosCompletos.includes(c.id));
      if (proximo) {
        p('', 'espaco');
        p(`→ Próximo capítulo: ${proximo.titulo}`, 'campanha-proximo');
        p(`   ${proximo.objetivo}`, 'campanha-objetivo');
      } else {
        p('', 'espaco');
        p('→ A campanha principal está completa. Fale com o Sábio Aldric.', 'campanha-proximo');
      }
      p('', 'espaco');
      checarNivel(e, p);
    }
  }
}

function comandoCampanha(e, p) {
  const { indice, cap } = capituloAtual(e);
  const total = totalCapitulos();
  p('◆ Campanha Principal', 'titulo');
  p(`Progresso: ${indice}/${total} capítulos`, 'campanha-info');
  p('', 'espaco');
  p('━━━ CAPÍTULOS ━━━', 'titulo');
  for (let i = 0; i < CAMPANHA.length; i++) {
    const c = CAMPANHA[i];
    const feito = e.campanha.capitulosCompletos.includes(c.id);
    const atual = !feito && i === indice;
    const tipo = feito ? 'campanha-feito' : atual ? 'campanha-atual' : 'campanha-bloqueado';
    const status = feito ? '✓' : atual ? '▶' : '🔒';
    p(`${status} ${c.emoji} ${c.titulo}`, tipo);
    if (atual) {
      p(`     ${c.desc}`, 'item-desc');
      p(`     Objetivo: ${c.objetivo}`, 'campanha-objetivo');
      p(`     Nível recomendado: ${c.nivelRecomendado}`, 'item-info');
    } else if (feito) {
      p(`     ${c.desc}`, 'item-desc');
    }
  }
  if (e.campanha.final) {
    const f = FINAIS[e.campanha.final];
    p('', 'espaco');
    p(`◆ Final alcançado: ${f.emoji} ${f.titulo}`, f.cor);
  }
}

function comandoPrologo(e, p) {
  if (!e.campanha.prologoVisto) e.campanha.prologoVisto = true;
  p('', 'espaco');
  PROLOGO.split('\n').forEach((linha) => p(linha, 'prologo'));
  p('', 'espaco');
}

function escolhaFinal(e, opcao, p) {
  const { indice } = capituloAtual(e);
  if (indice < CAMPANHA.length) {
    p('Você ainda não chegou ao final da campanha.', 'erro');
    p('Complete todos os capítulos primeiro. Use "campanha" para ver o progresso.', 'sistema');
    return;
  }
  if (e.campanha.escolhaFinalFeita) {
    p('Você já fez sua escolha.', 'erro');
    const f = FINAIS[e.campanha.final];
    p(`Final atual: ${f.emoji} ${f.titulo}`, f.cor);
    return;
  }
  const escolha = normalizar(opcao);
  const mapa = {
    matar: 'matar', kill: 'matar', derrotar: 'matar', 'matar o rei': 'matar',
    poupar: 'poupar', spare: 'poupar', perdoar: 'poupar',
    juntar: 'juntar', join: 'juntar', aceitar: 'juntar', coroa: 'juntar',
  };
  const qual = mapa[escolha];
  if (!qual) {
    p('Escolha inválida. Use:', 'erro');
    p('  escolher matar  — Derrote o Rei Antigo', 'sistema');
    p('  escolher poupar — Pereoe-o', 'sistema');
    p('  escolher juntar — Reclame a coroa', 'sistema');
    return;
  }
  e.campanha.final = qual;
  e.campanha.escolhaFinalFeita = true;
  const f = FINAIS[qual];
  p('', 'espaco');
  p('✦ ═══════════════════════════════════════ ✦', f.cor);
  p(`✦ FINAL: ${f.emoji} ${f.titulo}`, f.cor);
  p('✦ ═══════════════════════════════════════ ✦', f.cor);
  p('', 'espaco');
  f.texto.split('\n').forEach((linha) => p(linha, 'final-texto'));
  p('', 'espaco');
}

function falarComNpc(e, arg, p) {
  const local = MUNDO[e.local];
  if (!local) return;

  // Sistema novo: local.npcs (plural)
  if (local.npcs?.length) {
    if (!arg) {
      // Lista os NPCs disponíveis
      p('Pessoas aqui:', 'titulo');
      local.npcs.forEach((npc) => p(`  ☻ ${npc.nome}`, 'npc'));
      p('Use "falar <nome>" para conversar.', 'sistema');
      return;
    }
    const alvo = normalizar(arg);
    const npc = local.npcs.find((n) => normalizar(n.nome).includes(alvo));
    if (!npc) {
      p(`Não há "${arg}" aqui.`, 'erro');
      p('Pessoas aqui:', 'titulo');
      local.npcs.forEach((n) => p(`  ☻ ${n.nome}`, 'npc'));
      return;
    }

    // NPC especial: Sábio Aldric — falas dinâmicas
    if (npc.especial === 'aldric') {
      p(`☻ ${npc.nome}`, 'npc');
      p('', 'espaco');
      const falas = falasAldric(e);
      falas.forEach((f) => p(f, 'fala'));
      // Se completou tudo, mostra a escolha final
      const { indice } = capituloAtual(e);
      if (indice >= CAMPANHA.length && !e.campanha.escolhaFinalFeita) {
        p('', 'espaco');
        p('★ A hora da escolha chegou. Use:', 'campanha-marco');
        p('   escolher matar  — Você quer destruir o Rei Antigo', 'sistema');
        p('   escolher poupar — Você quer salvá-lo', 'sistema');
        p('   escolher juntar — Você quer a coroa', 'sistema');
      }
      return;
    }

    // NPC normal
    p(`☻ ${npc.nome}`, 'npc');
    p('', 'espaco');
    (npc.falas || []).forEach((f) => p(f, 'fala'));
    return;
  }

  // Sistema antigo: local.npc (singular)
  if (!local.npc) { p('Não há ninguém aqui.', 'erro'); return; }
  p(`☻ ${local.npc.nome}`, 'npc');
  p('', 'espaco');
  local.npc.falas.forEach((f) => p(f, 'fala'));
}

/* ================================================================== */
/* MAPA                                                                */
/* ================================================================== */
function comandoMapa(e, p) {
  const localAtual = MUNDO[e.local];
  const visitados = e.estatisticas.locaisVisitados || [];
  p('🗺️  MAPA DO MUNDO', 'titulo');
  p('', 'espaco');
  const porRegiao = {};
  for (const id of Object.keys(MUNDO)) {
    const loc = MUNDO[id];
    const r = loc.regiao || 'outros';
    if (!porRegiao[r]) porRegiao[r] = [];
    porRegiao[r].push(loc);
  }
  for (const rid of Object.keys(REGIOES)) {
    const reg = REGIOES[rid];
    const locais = porRegiao[rid] || [];
    if (!locais.length) continue;
    const regBloq = locais.every((l) => (l.nivelMinimo || 1) > e.nivel);
    const regVis = locais.some((l) => visitados.includes(l.id));
    const st = regBloq ? '🔒' : regVis ? '✓' : '?';
    p(`${reg.emoji} ${reg.nome} — Nv ${reg.nivel} ${st}`, 'mapa-regiao');
    for (const loc of locais) {
      const ehAtual = loc.id === e.local;
      const bloq = (loc.nivelMinimo || 1) > e.nivel;
      const vis = visitados.includes(loc.id);
      const temChefe = !!loc.chefe;
      const derr = loc.chefe && e.flags[`derrotou_${loc.chefe}`];
      const marca = [];
      if (ehAtual) marca.push('← VOCÊ');
      if (temChefe) marca.push(derr ? '☠✓' : '☠CHEFE');
      const pref = ehAtual ? '▸' : ' ├─';
      const trava = bloq ? ` 🔒 Nv ${loc.nivelMinimo}+` : '';
      const vista = !vis && !ehAtual && !bloq ? ' (?)' : '';
      p(`  ${pref} ${loc.nome}${trava}${vista} ${marca.join(' ')}`, ehAtual ? 'mapa-atual' : (bloq ? 'mapa-bloqueado' : 'mapa-local'));
    }
    p('', 'espaco');
  }
  p('Saídas:', 'titulo');
  const entradas = Object.entries(localAtual.saidas || {});
  if (!entradas.length) p('  (nenhuma)', 'erro');
  for (const [dir, destId] of entradas) {
    const dest = MUNDO[destId]; if (!dest) continue;
    const bloq = (dest.nivelMinimo || 1) > e.nivel;
    p(`  ${dir.padEnd(10)} → ${dest.nome}${bloq ? ` 🔒 Nv ${dest.nivelMinimo}+` : ''}`, bloq ? 'mapa-bloqueado' : 'mapa-saida');
  }
  p('', 'espaco');
  p('Legenda: ✓ visitado · ? novo · 🔒 bloqueado · ☠ chefe', 'sistema');
}

/* ================================================================== */
/* Entrada em local                                                    */
/* ================================================================== */
function aoEntrar(e, p) {
  const local = MUNDO[e.local];
  registrarLocal(e, e.local);

  // ⭐ Sorteia clima ao entrar em local novo
  const regiao = local.regiao || 'vila';
  if (!e.climaAtual || e.climaAtual === 'limpo') {
    e.climaAtual = sortearClima(regiao).id;
  }

  const clima = getClima(e.climaAtual);
  const periodo = calcularPeriodo(e.hora || 12);

  p(`◆ ${local.nome}`, local.arena ? 'arena' : 'local');
  p(local.desc);
  if (local.variacoes?.length) {
    const v = local.variacoes[Math.floor(Math.random() * local.variacoes.length)];
    if (v) p(v, 'atmosfera');
  }
  p(`${clima.emoji} ${clima.nome} · ${periodo.emoji} ${periodo.nome} · 🕐 ${formatarHora(e.hora || 12)}`, 'tempo-info');

  const chao = (local.itensNoChao || []).filter((id) => !e.flags[`chao_${e.local}_${id}`]);
  if (chao.length) {
    p('', 'espaco');
    chao.forEach((id) => {
      const it = ITENS[id];
      p(`No chão: ${it.nome}${raridadeTag(it)} — ${it.desc} (use "pegar")`, tipoRaridade(it));
    });
  }
  p('', 'espaco');
  if (local.npc) p(`☻ ${local.npc.nome} está aqui. (use "falar")`, 'npc');
  if (local.loja) p(`◈ Loja: ${local.loja.nome}. (use "loja")`, 'loja-info');
  const saidas = Object.entries(local.saidas || {}).map(([d, dst]) => `${d} → ${MUNDO[dst].nome}`).join(' · ');
  if (saidas) p(`Saídas: ${saidas}`, 'saidas');

  checarConquistas(e, p);

  if (local.arena) { listarArena(e, p); return; }
  if (local.chefe && !e.flags[`derrotou_${local.chefe}`]) {
    p('O chão treme...', 'aviso');
    iniciarCombate(e, local.chefe, p);
    return;
  }
  talvezEvento(e, local, p);
  if (e.hp <= 0) { morrer(e, p); return; }
  if (local.inimigos?.length && !e.emCombate) {
    // ⭐ Chance de encontro considera período
    const chance = (local.chanceEncontro ?? 0.6) + (periodo.encontroBonus || 0);
    if (Math.random() < chance) {
      const id = local.inimigos[Math.floor(Math.random() * local.inimigos.length)];
      iniciarCombate(e, id, p);
    } else {
      p('A região está silenciosa...', 'sistema');
    }
  }
}

/* ================================================================== */
/* EXAMINAR                                                            */
/* ================================================================== */
function examinarItem(e, arg, p) {
  if (!arg) { p('Examinar o quê? Ex: "examinar espada longa".', 'erro'); p('Use "inventario" para ver seus itens.', 'sistema'); return; }
  const item = acharItem(arg);
  if (!item) { p(`Item "${arg}" não encontrado.`, 'erro'); return; }
  p(`◆ ${item.nome}${raridadeTag(item)}`, tipoRaridade(item));
  p('', 'separador');
  p(`Tipo: ${item.tipo}`, 'item-info');
  p(`Raridade: ${item.raridade || 'comum'}`, tipoRaridade(item));
  p(`Preço: ${item.preco} ◈ · Venda: ${precoVenda(item)} ◈`, 'item-preco');
  const bonus = [];
  if (item.atk) bonus.push(`+${item.atk} ATK`);
  if (item.def) bonus.push(`+${item.def} DEF`);
  if (bonus.length) p(`Bônus: ${bonus.join(' · ')}`, 'item-bonus');
  if (item.cura) p(`✚ Restaura ${item.cura} HP`, 'cura');
  if (item.mana) p(`✦ Restaura ${item.mana} MP`, 'mana');
  if (item.magia) { const mg = MAGIAS[item.magia]; p(`${mg?.emoji || '✦'} Lança ${mg?.nome || item.magia}`, 'magia'); }
  if (item.buff) p(`✦ Aplica efeito: ${item.buff}`, 'buff');
  p('', 'separador');
  p(item.desc, 'item-desc');
  const tem = qtdItem(e, item.id);
  if (tem > 0) p(`Você tem ${tem}x.`, 'sucesso');
  else p(`Você não possui este item.`, 'sistema');
  const eq = SLOTS_EQUIP.find((s) => e.equipado[s] === item.id);
  if (eq) {
    const enc = e.encantamentos?.[eq];
    p(`Equipado em: ${eq}${enc ? ` ${ENCANTAMENTOS[enc].emoji} ${ENCANTAMENTOS[enc].nome}` : ''}`, 'equipar');
  }
}

/* ================================================================== */
/* Comandos                                                            */
/* ================================================================== */
const AJUDA = [
  'ajuda · olhar · ir <direção> · mapa · clima · hora',
  'pegar · inventario · examinar <item> · equipar · desequipar',
  'usar <item> · descansar',
  'magias · magia <nome> · efeitos',
  'talentos · escolher <nível> <1|2>',
  'conquistas · titulo <nome>',
  'diarias · reivindicar [missão|streak]',
  'entrar · avancar · sair_dungeon (no Portão Arcano)',
  'campanha · prologo · escolher_final',
  'bestiario · diario · treinar <inimigo> · status',
  'receitas · craftar <item> · encantamentos · encantar <slot> <tipo>',
  'falar · loja · comprar <item|número> · vender <item|número>',
  'quests · aceitar <título>',
  'salvar · carregar · limpar · sair',
  '— EM COMBATE — atacar · forte · rapido · defender · esquivar · focar · magia · fugir',
];

export function processar(estadoAnterior, entradaBruta) {
  const e = normalizarEstado(structuredClone(estadoAnterior));
  const linhas = [];
  const p = (t, tipo = 'sistema') => linhas.push({ texto: t, tipo });
  const raw = String(entradaBruta || '').trim();
  if (!raw) return { estado: estadoAnterior, linhas };
  p(`> ${raw}`, 'jogador');
  const partes = raw.split(/\s+/);
  const cmd = normalizar(partes[0]);
  const arg = partes.slice(1).join(' ').trim();

  // ⭐ Atualiza missões diárias ao entrar (sorteia novas se virou o dia)
  atualizarDiarias(e, p);
  
  /* ⭐ Prólogo automático no primeiro comando */
  if (!e.campanha?.prologoVisto) {
    comandoPrologo(e, p);
  }

  /* ⭐ Bloqueia comandos fora de contexto quando está na dungeon */
  if (e.dungeon) {
    const PROIBIDOS_DUNGEON = ['ir', 'andar', 'pegar', 'falar', 'loja', 'shop', 'comprar', 'buy', 'vender', 'sell', 'treinar', 'lutar', 'descansar', 'dormir'];
    if (PROIBIDOS_DUNGEON.includes(cmd)) {
      p('Você está na dungeon! Use "avancar" ou "sair_dungeon".', 'erro');
      return { estado: e, linhas };
    }
  }
  if (e.emCombate && !PERMITIDOS_EM_COMBATE.includes(cmd)) {
    p('⚔ Você está em combate!', 'erro');
    return { estado: e, linhas };
  }
  if (e.emCombate && (ACOES_COMBATE.includes(cmd) || cmd === 'magia')) {
    processarCombate(e, cmd, arg, p);
    avancarTempo(e, p);
    e.atualizadoEm = Date.now();
    return { estado: e, linhas };
  }

  const local = MUNDO[e.local];

  switch (cmd) {
    case 'ajuda': case 'help': case '?':
      p('Comandos:', 'titulo');
      AJUDA.forEach((l) => p('  ' + l, 'sistema'));
      break;
    case 'mapa': case 'map': case 'm':
      comandoMapa(e, p);
      break;
    case 'clima': case 'tempo': case 'weather':
      comandoClima(e, p);
      break;
    case 'hora': case 'time':
      comandoHora(e, p);
      break;
    case 'olhar': case 'l':
      if (e.emCombate) { const ini = e.emCombate; p(`${ini.nome} — HP ${Math.max(0, ini.hp)}/${ini.hpMax}`, 'combate'); break; }
      aoEntrar(e, p);
      break;
    case 'ir': case 'andar': {
      const dir = normalizar(arg);
      if (!dir) { p('Ir para onde? Use "mapa".', 'erro'); break; }
      const dest = local.saidas?.[dir];
      if (!dest) { p(`Sem saída "${dir}".`, 'erro'); p(`Saídas: ${Object.keys(local.saidas || {}).join(', ') || 'nenhuma'}`, 'saidas'); break; }
      const dl = MUNDO[dest];
      const nv = dl.nivelMinimo || 1;
      if (e.nivel < nv) { p(`🔒 ${dl.nome} exige nível ${nv}+.`, 'erro'); break; }
      e.local = dest;
      // ⭐ Sorteia clima da nova região
      e.climaAtual = sortearClima(dl.regiao || 'vila').id;
      progredirDiaria(e, 'visitar', 1, p);
      aoEntrar(e, p);
      avancarTempo(e, p);
      break;
    }
    case 'pegar': {
      const chao = (local.itensNoChao || []).filter((id) => !e.flags[`chao_${e.local}_${id}`]);
      if (!chao.length) { p('Nada aqui.', 'erro'); break; }
      const id = chao[0];
      addItem(e, id, 1); e.flags[`chao_${e.local}_${id}`] = true;
      p(`Pegou: ${ITENS[id].nome}.`, 'pickup');
      checarConquistas(e, p);
      break;
    }
        /* ========================= INVENTÁRIO ========================= */
    case 'inventario': case 'inv': case 'i': {
      if (!e.inventario.length) { p('Mochila vazia.', 'sistema'); break; }

      /* ---------- Parseia filtros e ordenação ---------- */
      const palavras = arg.split(/\s+/).filter(Boolean).map(normalizar);
      const filtrosAplicados = [];
      let ordenacao = null;

      // Cada palavra pode ser: filtro OU ordenação
      for (const w of palavras) {
        if (['preco', 'nome', 'raridade', 'tipo', 'qtd'].includes(w)) {
          ordenacao = w;
          continue;
        }
        const filtro = FILTROS_INVENTARIO[w];
        if (filtro) {
          filtrosAplicados.push({ nome: w, fn: filtro.fn });
        }
      }

      // Aplica filtros
      let lista = e.inventario.filter((it) => {
        const d = ITENS[it.id];
        if (!d) return false;
        return filtrosAplicados.every((f) => f.fn(d, it.id, e));
      });

      // Aplica ordenação
      if (ordenacao) {
        const ORD = {
          preco: (a, b) => (ITENS[b.id]?.preco || 0) - (ITENS[a.id]?.preco || 0),
          nome: (a, b) => (ITENS[a.id]?.nome || '').localeCompare(ITENS[b.id]?.nome || ''),
          raridade: (a, b) => {
            const ordem = { mitico: 5, lendario: 4, epico: 3, raro: 2, incomum: 1, comum: 0 };
            const ra = ordem[ITENS[a.id]?.raridade || 'comum'] || 0;
            const rb = ordem[ITENS[b.id]?.raridade || 'comum'] || 0;
            return rb - ra;
          },
          tipo: (a, b) => (ITENS[a.id]?.tipo || '').localeCompare(ITENS[b.id]?.tipo || ''),
          qtd: (a, b) => b.qtd - a.qtd,
        };
        lista = [...lista].sort(ORD[ordenacao]);
      }

      /* ---------- Cabeçalho ---------- */
      if (filtrosAplicados.length || ordenacao) {
        const tags = [];
        filtrosAplicados.forEach((f) => tags.push(FILTROS_INVENTARIO[f.nome].label));
        if (ordenacao) tags.push(`ordenado por ${ordenacao}`);
        p(`◆ Inventário — ${tags.join(' · ')}`, 'titulo');
      } else {
        p(`◆ Inventário (${e.inventario.length} tipo${e.inventario.length > 1 ? 's' : ''})`, 'titulo');
      }

      /* ---------- Sem resultados ---------- */
      if (!lista.length) {
        p('', 'espaco');
        if (filtrosAplicados.length) {
          p(`Nenhum item encontrado para: ${filtrosAplicados.map((f) => f.nome).join(', ')}`, 'erro');
          p('Use "inventario" sem filtros para ver tudo.', 'sistema');
        } else {
          p('Nada para mostrar.', 'erro');
        }
        break;
      }

      /* ---------- Lista ---------- */
      p('', 'espaco');
      lista.forEach((it) => {
        const idxOriginal = e.inventario.findIndex((x) => x.id === it.id);
        const d = ITENS[it.id];
        const eq = SLOTS_EQUIP.find((s) => e.equipado[s] === it.id);
        const enc = eq && e.encantamentos?.[eq];
        const equipTag = eq ? `  ⚔ equipado${enc ? ' ' + ENCANTAMENTOS[enc].emoji : ''}` : '';
        p(`[${idxOriginal + 1}] ${d.nome}${raridadeTag(d)} ×${it.qtd}${equipTag}`, tipoRaridade(d));
        p(`     ${d.desc}`, 'item-desc');
        const bonus = [];
        if (d.atk) bonus.push(`+${d.atk} ATK`);
        if (d.def) bonus.push(`+${d.def} DEF`);
        if (d.cura) bonus.push(`+${d.cura} HP`);
        if (d.mana) bonus.push(`+${d.mana} MP`);
        if (bonus.length) p(`     ${bonus.join(' · ')} · ${d.preco}◈`, 'item-bonus');
        else p(`     ${d.preco}◈`, 'item-preco');
        p('', 'separador');
      });

      /* ---------- Rodapé com resumo ---------- */
      const totalTipos = lista.length;
      const totalUnidades = lista.reduce((acc, it) => acc + it.qtd, 0);
      const valorTotal = lista.reduce((acc, it) => acc + (ITENS[it.id]?.preco || 0) * it.qtd, 0);
      p(`Total: ${totalTipos} tipo${totalTipos > 1 ? 's' : ''} · ${totalUnidades} unidade${totalUnidades > 1 ? 's' : ''} · ${valorTotal}◈ em valor`, 'stats');

      /* ---------- Dica de filtros ---------- */
      if (!filtrosAplicados.length && !ordenacao) {
        p('', 'espaco');
        p('💡 Filtros: inventario arma · armadura · consumivel · material · raro · equipado', 'sistema');
        p('💡 Ordenar: inventario preco · nome · raridade · tipo · qtd', 'sistema');
        p('💡 Combinar: inventario arma raro preco', 'sistema');
      }
      break;
    }
    case 'examinar': case 'inspecionar': case 'ver': case 'verificar':
      examinarItem(e, arg, p);
      break;
    case 'equipar': case 'equip': {
      const item = acharItem(arg);
      if (!item) { p('Não achou.', 'erro'); break; }
      if (!qtdItem(e, item.id)) { p(`Sem ${item.nome}.`, 'erro'); break; }
      if (!SLOTS_EQUIP.includes(item.tipo)) { p('Não equipável.', 'erro'); break; }
      const anterior = e.equipado[item.tipo];
      e.equipado[item.tipo] = item.id;
      const bonus = [];
      if (item.atk) bonus.push(`+${item.atk} ATK`);
      if (item.def) bonus.push(`+${item.def} DEF`);
      const extra = anterior ? ` (substituiu ${ITENS[anterior].nome})` : '';
      p(`Equipou ${item.nome} [${item.tipo}]. ${bonus.join(', ')}${extra}`, 'equipar');
      checarConquistas(e, p);
      break;
    }
    case 'desequipar': case 'remover': {
      const slot = normalizar(arg);
      if (!SLOTS_EQUIP.includes(slot)) { p('Slot inválido.', 'erro'); break; }
      if (!e.equipado[slot]) { p(`Nada em ${slot}.`, 'erro'); break; }
      const n = ITENS[e.equipado[slot]].nome;
      e.equipado[slot] = null;
      p(`Removeu ${n}.`, 'sistema');
      break;
    }
    case 'usar': {
      const item = acharItem(arg);
      if (!item) { p('Não achou.', 'erro'); break; }
      if (!qtdItem(e, item.id)) { p(`Sem ${item.nome}.`, 'erro'); break; }
      if (item.tipo !== 'consumivel') { p('Não consumível.', 'erro'); break; }
      remItem(e, item.id, 1);
      if (item.cura) { let cura = item.cura; if (temTalento(e, 'fe')) cura = Math.round(cura * 1.3); const a = e.hp; e.hp = Math.min(e.hpMax, e.hp + cura); p(`Usou ${item.nome}. +${e.hp - a} HP.`, 'cura'); }
      if (item.mana) { const a = e.mana; e.mana = Math.min(e.manaMax, e.mana + item.mana); p(`Recupera ${e.mana - a} MP.`, 'mana'); }
      if (item.id === 'antidoto') { e.efeitos = (e.efeitos || []).filter((ef) => EFEITOS[ef.tipo]?.tipo !== 'dano'); p('Antídoto limpou efeitos.', 'cura'); }
      progredirDiaria(e, 'usar', 1, p);
      if (e.emCombate) { e.emCombate.ultimaAcaoJogador = 'usar'; turnoInimigo(e, p); }
      break;
    }
    case 'descansar': case 'dormir': {
      if (e.emCombate) { p('Em combate!', 'erro'); break; }

      /* ---------- Analisa o local ---------- */
      const temLoja = !!local.loja;
      const temNpc = !!local.npc;
      const ehCivilizado = temLoja || temNpc || local.arena;
      const ehSelvagem = !!(local.inimigos?.length || local.chefe);
      const chanceEncontroBaixa = (local.chanceEncontro ?? 1) < 0.5;
      const arriscado = ehSelvagem && chanceEncontroBaixa; // local semi-selvagem

      /* ---------- Local selvagem puro: bloqueia ---------- */
      if (ehSelvagem && !chanceEncontroBaixa) {
        p('🛑 Este lugar é perigoso demais para descansar.', 'erro');
        break;
      }

      /* ---------- Cooldown de 1 hora ---------- */
      const tempoAtual = ((e.dia || 1) - 1) * 24 + (e.hora || 6);
      if (e.ultimoDescanso !== -999 && (tempoAtual - e.ultimoDescanso) < 1) {
        const minFaltando = 1 - (tempoAtual - e.ultimoDescanso);
        p(`⏳ Você acabou de descansar. Espere ${minFaltando}h antes de tentar de novo.`, 'erro');
        break;
      }

      /* ---------- Custo (só em local com loja) ---------- */
      const custo = temLoja ? 5 : 0;
      if (custo > 0 && e.moedas < custo) {
        p(`💰 Você precisa de ${custo}◈ para descansar aqui. Você tem ${e.moedas}◈.`, 'erro');
        break;
      }

      /* ---------- Define duração e cura ---------- */
      const periodo = calcularPeriodo(e.hora || 6);
      let horas, curaPct, descricao;

      if (arriscado) {
        horas = 3;
        curaPct = 0.5;
        descricao = '⚠ Você faz um descanso curto e arriscado...';
      } else if (periodo.id === 'noite' || periodo.id === 'anoitecer' || periodo.id === 'madrugada') {
        horas = 6;
        curaPct = 1.0;
        descricao = '🌙 Você dorme a noite toda em segurança...';
      } else {
        horas = 3;
        curaPct = 0.5;
        descricao = '☀ Você faz uma soneca curta...';
      }

      /* ---------- Aplica custo ---------- */
      if (custo > 0) {
        e.moedas -= custo;
        p(`💰 Pagou ${custo}◈ pelo descanso. (restam ${e.moedas}◈)`, 'compra');
      }

      /* ---------- Aplica descanso ---------- */
      p(descricao, 'cura');
      const hpAntes = e.hp, mpAntes = e.mana;
      const hpGanho = Math.round((e.hpMax - e.hp) * curaPct);
      const mpGanho = Math.round((e.manaMax - e.mana) * curaPct);
      e.hp = Math.min(e.hpMax, e.hp + hpGanho);
      e.mana = Math.min(e.manaMax, e.mana + mpGanho);
      e.efeitos = [];
      p(`   HP ${hpAntes}→${e.hp} | MP ${mpAntes}→${e.mana}`, 'cura');

      /* ---------- Avança o tempo ---------- */
      for (let i = 0; i < horas; i++) avancarTempo(e, p, true);

      /* ---------- Marca o horário (cooldown) ---------- */
      e.ultimoDescanso = ((e.dia || 1) - 1) * 24 + (e.hora || 6);

      /* ---------- Risco em local arriscado ---------- */
      if (arriscado && Math.random() < 0.5) {
        p('⚠ Você é surpreendido durante o descanso!', 'aviso');
        const id = local.inimigos[Math.floor(Math.random() * local.inimigos.length)];
        iniciarCombate(e, id, p);
      }
      break;
    }
    case 'magias': case 'grimorio': {
      if (!e.magias?.length) { p('Sem magias.', 'erro'); break; }
      p('◆ Grimório', 'titulo');
      p(`Mana: ${e.mana}/${e.manaMax}`, 'mana');
      p('', 'espaco');
      for (const mid of e.magias) {
        const m = MAGIAS[mid]; if (!m) continue;
        let custo = m.mana;
        if (temTalento(e, 'metamagia')) custo = Math.ceil(custo * 0.8);
        p(`${m.emoji} ${m.nome} — ${custo} MP`, e.mana >= custo ? 'magia-disponivel' : 'magia-indisponivel');
        p(`     ${m.desc}`, 'item-desc');
        p('', 'separador');
      }
      break;
    }
    case 'efeitos': case 'buffs': {
      if (!e.efeitos?.length) { p('Sem efeitos.', 'sistema'); break; }
      p('◆ Efeitos ativos', 'titulo');
      p('', 'espaco');
      for (const ef of e.efeitos) {
        const d = EFEITOS[ef.tipo];
        if (d) { p(`${d.emoji} ${d.nome} (${ef.duracao} turnos)`, 'buff'); p(`     ${d.desc}`, 'item-desc'); p('', 'separador'); }
      }
      break;
    }
    case 'talentos': case 'talent':
      listarTalentos(e, p);
      break;
    case 'escolher': case 'aprender':
      escolherTalento(e, arg, p);
      break;
    case 'conquistas': case 'achievements': case 'conquista':
      listarConquistas(e, p);
      break;
    case 'titulo': case 'title':
      escolherTitulo(e, arg, p);
      break;
    case 'diarias': case 'daily': case 'dailies':
      listarDiarias(e, p);
      break;
    case 'reivindicar': case 'claim':
      reivindicarRecompensa(e, arg, p);
      break;
    /* ⭐ Comandos da dungeon */
    case 'entrar': {
      if (e.dungeon) { p('Você já está na dungeon.', 'erro'); break; }
      if (!local.portal) { p('Não há portal aqui.', 'erro'); break; }
      if (e.nivel < 3) { p('🔒 Você precisa de nível 3+ para entrar na Masmorra Arcana.', 'erro'); break; }
      p('⚠ Aviso: você perderá o progresso se morrer aqui dentro.', 'aviso');
      iniciarDungeon(e, p);
      break;
    }
    case 'avancar': case 'continue':
      avancarDungeon(e, p);
      break;
    case 'sair_dungeon': case 'leave_dungeon':
      sairDungeon(e, p);
      break;
    /* ⭐ Campanha narrativa */
    case 'campanha': case 'campaign':
      comandoCampanha(e, p);
      break;
    case 'prologo': case 'prologue':
      comandoPrologo(e, p);
      break;
    case 'escolher_final': case 'final':
      escolhaFinal(e, arg, p);
      break;
    case 'bestiario': {
      const m = e.estatisticas.inimigosMortos || {};
      const ids = Object.keys(m);
      if (!ids.length) { p('Nada no bestiário ainda.', 'sistema'); break; }
      p('◆ Bestiário', 'titulo');
      p(`Únicos: ${ids.length} · Total: ${ids.reduce((a, b) => a + m[b], 0)}`, 'stats');
      p('', 'espaco');
      for (const id of ids.sort((a, b) => m[b] - m[a])) {
        const i = INIMIGOS[id]; if (!i) continue;
        p(`${i.nome}${i.chefe ? ' [CHEFE]' : ''} — ${m[id]}x`, i.chefe ? 'combate-chefe' : 'bestiario');
        p(`     HP ${i.hp} · ATK ${i.atk} · DEF ${i.def} · ${i.xp} XP`, 'item-info');
        p('', 'separador');
      }
      break;
    }
    case 'diario': case 'jornada': {
      const r = RACAS[e.raca] || RACAS.humano;
      const c = CLASSES[e.classe] || CLASSES.guerreiro;
      const s = e.estatisticas;
      const clima = getClima(e.climaAtual || 'limpo');
      const periodo = calcularPeriodo(e.hora || 12);
      p(`◆ Diário de ${e.nome}`, 'titulo');
      p(`${r.emoji} ${r.nome} · ${c.emoji} ${c.nome} · Nv ${e.nivel}`, 'sistema');
      p(`${clima.emoji} ${clima.nome} · ${periodo.emoji} ${periodo.nome} · 🕐 ${formatarHora(e.hora || 12)}`, 'tempo-info');
      p('', 'espaco');
      p(`Locais: ${s.locaisVisitados.length}/${Object.keys(MUNDO).length}`, 'item-info');
      p(`Inimigos: ${Object.values(s.inimigosMortos || {}).reduce((a, b) => a + b, 0)}`, 'item-info');
      p(`Mortes: ${s.mortes} · Arena: ${s.vitoriasArena}v/${s.nocauteArena}n`, 'item-info');
      p(`Dano causado: ${s.danoTotal} · recebido: ${s.danoRecebido}`, 'item-info');
      p(`Magias: ${s.magiasLancadas} · Criados: ${s.itensCriados} · Encantados: ${s.itensEncantados}`, 'item-info');
      p(`Talentos: ${e.talentos.length} · Pontos: ${e.pontosTalento}`, 'item-info');
      p(`Conquistas: ${e.conquistasDesbloqueadas.length}/${CONQUISTAS.length}`, 'conquista-info');
      p(`Inimigos fugiram: ${s.fugasInimigos}`, 'item-info');
      p(`Dia do jogo: ${e.dia || 1}`, 'item-info');
      break;
    }
    case 'treinar': case 'lutar': {
      if (e.emCombate) { p('Já em combate.', 'erro'); break; }
      if (e.local !== 'arena') { p('Só na Arena.', 'erro'); break; }
      const alvo = normalizar(arg);
      if (!alvo) { p('Treinar contra quem?', 'erro'); listarArena(e, p); break; }
      const id = INIMIGOS_ARENA.find((x) => normalizar(x) === alvo || normalizar(INIMIGOS[x]?.nome || '').includes(alvo));
      if (!id) { p('Não disponível.', 'erro'); break; }
      iniciarCombateArena(e, id, p);
      break;
    }
    case 'receitas': case 'receita': {
      const filtro = normalizar(arg);
      listarReceitas(e, p, filtro && ['ferraria', 'alquimia', 'cozinha'].includes(filtro) ? filtro : null);
      break;
    }
    case 'craftar': case 'forjar': case 'criar': {
      if (!arg) { p('Craftar o quê? Use "receitas" para ver a lista.', 'erro'); break; }
      tentarCraftar(e, arg, p);
      break;
    }
    case 'encantar': {
      if (!arg) {
        p('Uso: "encantar <slot> <tipo>"', 'erro');
        p('Slots: ' + SLOTS_EQUIP.join(', '), 'sistema');
        p('Tipos: ' + Object.keys(ENCANTAMENTOS).join(', '), 'sistema');
        break;
      }
      const partes2 = arg.split(/\s+/);
      if (partes2.length < 2) { p('Uso: "encantar <slot> <tipo>".', 'erro'); break; }
      tentarEncantar(e, partes2[0], partes2[1], p);
      break;
    }
    case 'desencantar': {
      const slot = normalizar(arg);
      if (!SLOTS_EQUIP.includes(slot)) { p(`Slot inválido.`, 'erro'); break; }
      if (!e.encantamentos?.[slot]) { p(`Nada encantado em ${slot}.`, 'erro'); break; }
      const enc = ENCANTAMENTOS[e.encantamentos[slot]];
      e.encantamentos[slot] = null;
      p(`Removeu ${enc.emoji} ${enc.nome} de ${slot}.`, 'sistema');
      break;
    }
    case 'encantamentos': case 'lista-encantamentos': {
      p('◆ Encantamentos disponíveis', 'titulo');
      p('', 'espaco');
      for (const [id, enc] of Object.entries(ENCANTAMENTOS)) {
        const nvOk = e.nivel >= enc.nivel;
        const gema = ITENS[enc.gema];
        const temGema = qtdItem(e, enc.gema) >= 1;
        const ok = nvOk && temGema;
        p(`${enc.emoji} ${enc.nome}`, ok ? 'encantar-ok' : 'encantar-bloq');
        p(`     ${enc.desc}`, 'item-desc');
        p(`     Custo: ${enc.moedas} ◈ + ${gema?.nome} ${temGema ? '✓' : '✗'} · Nv ${enc.nivel} ${nvOk ? '✓' : '✗'}`, 'item-info');
        p('', 'separador');
      }
      p('Use "encantar <slot> <tipo>" para aplicar.', 'sistema');
      break;
    }
    case 'status': {
      const r = RACAS[e.raca] || RACAS.humano;
      const c = CLASSES[e.classe] || CLASSES.guerreiro;
      const clima = getClima(e.climaAtual || 'limpo');
      const periodo = calcularPeriodo(e.hora || 12);
      p(`◆ ${e.nome}${e.titulo ? ` — "${e.titulo}"` : ''}`, 'local');
      p(`${r.emoji} ${r.nome} · ${c.emoji} ${c.nome} · Nv ${e.nivel}`, 'sistema');
      p(`${clima.emoji} ${clima.nome} · ${periodo.emoji} ${periodo.nome} · 🕐 ${formatarHora(e.hora || 12)}`, 'tempo-info');
      p('', 'espaco');
      p(`XP ${e.xp}/${e.xpProx}`, 'stats');
      p(`HP ${e.hp}/${e.hpMax}`, 'hp-info');
      if (e.manaMax > 0) p(`MP ${e.mana}/${e.manaMax}`, 'mana');
      p(`ATK ${atkTotal(e)} · DEF ${defTotal(e)}`, 'stats');
      p(`Moedas: ${e.moedas} · Local: ${MUNDO[e.local].nome}`, 'item-info');
      p(`Conquistas: ${e.conquistasDesbloqueadas.length}/${CONQUISTAS.length}`, 'conquista-info');
      if (e.pontosTalento > 0) p(`★ Você tem ${e.pontosTalento} ponto(s) de talento. Use "talentos".`, 'talento-ponto');
      p('', 'espaco');
      p('Equipamento:', 'titulo');
      for (const slot of SLOTS_EQUIP) {
        const id = e.equipado[slot];
        if (id) {
          const it = ITENS[id];
          const enc = e.encantamentos?.[slot] ? ` ${ENCANTAMENTOS[e.encantamentos[slot]].emoji}` : '';
          p(`  ${slot.padEnd(9)} ${it.nome}${enc}`, tipoRaridade(it));
        } else p(`  ${slot.padEnd(9)} —`, 'sistema');
      }
      if (e.talentos.length) {
        p('', 'espaco');
        p('Talentos:', 'titulo');
        for (const id of e.talentos) { const t = acharTalento(id); if (t) p(`  ${t.emoji} ${t.nome}`, 'talento-ok'); }
      }
      break;
    }
    case 'falar': case 'talk':
      falarComNpc(e, arg, p);
      break;
    case 'loja': case 'shop': {
      if (!local.loja) { p('Sem loja aqui.', 'erro'); break; }
      p(`◆ ${local.loja.nome}`, 'loja-titulo');
      p(`Moedas: ${e.moedas} ◈`, 'item-preco');
      p('', 'espaco');
      local.loja.itens.forEach((id, i) => {
        const it = ITENS[id]; if (!it) return;
        p(`[${i + 1}] ${it.nome}${raridadeTag(it)} [${it.tipo}] — ${it.preco} ◈`, tipoRaridade(it));
        p(`     ${it.desc}`, 'item-desc');
        const bonus = [];
        if (it.atk) bonus.push(`+${it.atk} ATK`);
        if (it.def) bonus.push(`+${it.def} DEF`);
        if (it.cura) bonus.push(`cura ${it.cura} HP`);
        if (it.mana) bonus.push(`+${it.mana} MP`);
        if (bonus.length) p(`     ${bonus.join(' · ')}`, 'item-bonus');
        p('', 'separador');
      });
      p('Use "comprar <número>" ou "comprar <nome>".', 'sistema');
      break;
    }
    case 'comprar': case 'buy': {
      if (!local.loja) { p('Sem loja aqui.', 'erro'); break; }
      if (!arg) { p('Comprar o quê? Use "loja" para ver a lista.', 'erro'); break; }
      let item = null;
      const argClean = arg.trim();
      if (/^\d+$/.test(argClean)) {
        const idx = parseInt(argClean, 10) - 1;
        if (idx >= 0 && idx < local.loja.itens.length) item = ITENS[local.loja.itens[idx]];
      } else item = acharItem(arg);
      if (!item || !local.loja.itens.includes(item.id)) { p('O lojista não vende esse item.', 'erro'); p('Use "loja" para ver a lista numerada.', 'sistema'); break; }
      if (e.moedas < item.preco) { p(`Moedas insuficientes. Você tem ${e.moedas}, precisa de ${item.preco}.`, 'erro'); break; }
      e.moedas -= item.preco;
      addItem(e, item.id, 1);
      p(`Comprou ${item.nome}${raridadeTag(item)} por ${item.preco}◈. (restam ${e.moedas})`, 'compra');
      progredir(e, 'comprar', 'qualquer', p);
      progredirDiaria(e, 'comprar', 1, p);
      checarConquistas(e, p);
      break;
    }
    case 'vender': case 'sell': {
      if (!local.loja) { p('Sem loja aqui.', 'erro'); break; }
      if (!arg) { p('Vender o quê? Use "inventario" para ver a lista numerada.', 'erro'); break; }
      let itemId = null;
      const argClean = arg.trim();
      if (/^\d+$/.test(argClean)) {
        const idx = parseInt(argClean, 10) - 1;
        if (idx >= 0 && idx < e.inventario.length) itemId = e.inventario[idx].id;
      } else {
        const found = acharItem(arg);
        if (found && qtdItem(e, found.id)) itemId = found.id;
      }
      if (!itemId) { p('Você não tem esse item.', 'erro'); p('Use "inventario" para ver a lista numerada.', 'sistema'); break; }
      const item = ITENS[itemId];
      const valor = precoVenda(item);
      remItem(e, itemId, 1);
      for (const s of SLOTS_EQUIP) {
        if (e.equipado[s] === itemId && !qtdItem(e, itemId)) { e.equipado[s] = null; e.encantamentos[s] = null; }
      }
      e.moedas += valor;
      p(`Vendeu ${item.nome} por ${valor}◈. (total ${e.moedas})`, 'venda');
      progredirDiaria(e, 'vender', 1, p);
      checarConquistas(e, p);
      break;
    }
    case 'quests': case 'quest': {
      p('◆ QUESTS ATIVAS', 'titulo');
      p('', 'espaco');
      if (!e.questsAtivas.length) p('  (nenhuma — veja as disponíveis abaixo)', 'sistema');
      else {
        e.questsAtivas.forEach((qid, i) => {
          const q = QUESTS[qid];
          const progresso = Math.min(e.progresso[qid] || 0, q.objetivo.qtd);
          const completo = progresso >= q.objetivo.qtd;
          p(`${q.titulo}  [${progresso}/${q.objetivo.qtd}]${completo ? ' ✓' : ''}`, 'quest-ativa');
          p(`     ${q.desc}`, 'item-desc');
          const r = q.recompensa || {};
          const partes = [];
          if (r.xp) partes.push(`${r.xp} XP`);
          if (r.moedas) partes.push(`${r.moedas} ◈`);
          if (r.itens) partes.push(r.itens.map((it) => ITENS[it]?.nome).filter(Boolean).join(', '));
          if (partes.length) p(`     Recompensa: ${partes.join(' · ')}`, 'quest-recompensa');
          if (i < e.questsAtivas.length - 1) p('', 'separador');
        });
      }
      p('', 'espaco');
      p('◆ DISPONÍVEIS', 'titulo');
      p('', 'espaco');
      const disp = Object.values(QUESTS).filter((q) => !e.questsAtivas.includes(q.id) && !e.questsCompletas.includes(q.id));
      if (!disp.length) p('  (nenhuma — você aceitou ou completou todas)', 'sistema');
      else {
        disp.forEach((q, i) => {
          p(q.titulo, 'quest-disp');
          p(`     ${q.desc}`, 'item-desc');
          const r = q.recompensa || {};
          const partes = [];
          if (r.xp) partes.push(`${r.xp} XP`);
          if (r.moedas) partes.push(`${r.moedas} ◈`);
          if (r.itens) partes.push(r.itens.map((it) => ITENS[it]?.nome).filter(Boolean).join(', '));
          if (partes.length) p(`     Recompensa: ${partes.join(' · ')}`, 'quest-recompensa');
          p(`     aceitar ${q.titulo}`, 'quest-comando');
          if (i < disp.length - 1) p('', 'separador');
        });
      }
      if (e.questsCompletas.length) {
        p('', 'espaco');
        p('◆ COMPLETAS', 'titulo');
        e.questsCompletas.forEach((qid) => { const q = QUESTS[qid]; if (q) p(`  ✓ ${q.titulo}`, 'quest-feita'); });
      }
      break;
    }
    case 'aceitar': {
      const a = normalizar(arg);
      if (!a) { p('Aceitar qual? Veja "quests" para a lista.', 'erro'); break; }
      const q = Object.values(QUESTS).find((x) => normalizar(x.titulo).includes(a));
      if (!q) { p('Quest não encontrada.', 'erro'); break; }
      if (e.questsCompletas.includes(q.id) || e.questsAtivas.includes(q.id)) { p('Já tem.', 'erro'); break; }
      e.questsAtivas.push(q.id);
      p(`✔ Quest aceita: "${q.titulo}"`, 'quest-aceita');
      p(`   ${q.desc}`, 'sistema');
      checarQuests(e, p);
      break;
    }
    case 'sair':
      p('Até a próxima aventura!', 'despedida');
      break;
    default:
      p(`Comando desconhecido: "${partes[0]}".`, 'erro');
  }

  // ⭐ Avança o tempo a cada comando significativo
  avancarTempo(e, p);

  e.atualizadoEm = Date.now();
  return { estado: e, linhas };
}

export function resumoSlot(estado) {
  if (!estado) return null;
  const r = RACAS[estado.raca] || RACAS.humano;
  const c = CLASSES[estado.classe] || CLASSES.guerreiro;
  return {
    nome: estado.nome, nivel: estado.nivel,
    local: MUNDO[estado.local]?.nome || '???',
    atualizadoEm: estado.atualizadoEm || 0,
    hp: estado.hp, hpMax: estado.hpMax,
    raca: r.nome, classe: c.nome,
    emoji: `${r.emoji}${c.emoji}`,
  };
}
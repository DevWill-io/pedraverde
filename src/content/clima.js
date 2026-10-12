// src/content/clima.js
/*
  Sistema de clima e horário.
  O tempo avança conforme você joga (a cada 5 comandos significativos).
  Cada região tem climas possíveis baseados no bioma.
*/

/* ============================================================ */
/* PERÍODOS DO DIA                                              */
/* ============================================================ */
export const PERIODOS = {
  amanhecer: {
    id: 'amanhecer',
    nome: 'Amanhecer',
    emoji: '🌅',
    cor: 'periodo-amanhecer',
    desc: 'O sol nasce no horizonte.',
    // Efeitos
    encontroBonus: 0,
    atkInimigo: 0,
    hpInimigo: 0,
  },
  dia: {
    id: 'dia',
    nome: 'Dia',
    emoji: '☀',
    cor: 'periodo-dia',
    desc: 'Sol alto no céu.',
    encontroBonus: 0,
    atkInimigo: 0,
    hpInimigo: 0,
  },
  anoitecer: {
    id: 'anoitecer',
    nome: 'Anoitecer',
    emoji: '🌇',
    cor: 'periodo-anoitecer',
    desc: 'O sol se põe devagar.',
    encontroBonus: 0.15,
    atkInimigo: 0,
    hpInimigo: 0,
  },
  noite: {
    id: 'noite',
    nome: 'Noite',
    emoji: '🌙',
    cor: 'periodo-noite',
    desc: 'Escuridão cobre o mundo.',
    encontroBonus: 0.30,
    atkInimigo: 1,
    hpInimigo: 0.10, // +10%
  },
  madrugada: {
    id: 'madrugada',
    nome: 'Madrugada',
    emoji: '🌌',
    cor: 'periodo-madrugada',
    desc: 'Silêncio absoluto. Só o vento.',
    encontroBonus: 0.25,
    atkInimigo: 1,
    hpInimigo: 0.10,
  },
};

/* ============================================================ */
/* CLIMAS                                                       */
/* ============================================================ */
export const CLIMAS = {
  limpo: {
    id: 'limpo',
    nome: 'Limpo',
    emoji: '🌤',
    cor: 'clima-limpo',
    desc: 'Céu aberto, sem nuvens.',
    // Modificadores em combate
    danoFogo: 0,
    danoGelo: 0,
    critBonus: 0,
    chanceErrar: 0,
    inimigoAtkBonus: 0,
    vidaExtra: 0,
  },
  chuva: {
    id: 'chuva',
    nome: 'Chuva',
    emoji: '🌧',
    cor: 'clima-chuva',
    desc: 'Chuva fina e constante.',
    danoFogo: -2,
    danoGelo: +1,
    critBonus: 0,
    chanceErrar: 0,
    inimigoAtkBonus: 0,
    vidaExtra: 0,
  },
  tempestade: {
    id: 'tempestade',
    nome: 'Tempestade',
    emoji: '⛈',
    cor: 'clima-tempestade',
    desc: 'Relâmpagos cortam o céu.',
    danoFogo: -3,
    danoGelo: +2,
    critBonus: 0.10,
    chanceErrar: 0,
    inimigoAtkBonus: 0,
    vidaExtra: 0,
  },
  neve: {
    id: 'neve',
    nome: 'Neve',
    emoji: '❄',
    cor: 'clima-neve',
    desc: 'Flocos de neve caem lentamente.',
    danoFogo: +1,
    danoGelo: 0,
    critBonus: 0,
    chanceErrar: 0,
    inimigoAtkBonus: 1,
    vidaExtra: 0,
  },
  nevoeiro: {
    id: 'nevoeiro',
    nome: 'Nevoeiro',
    emoji: '🌫',
    cor: 'clima-nevoeiro',
    desc: 'Névoa densa esconde tudo.',
    danoFogo: 0,
    danoGelo: 0,
    critBonus: -0.05,
    chanceErrar: 0.10,
    inimigoAtkBonus: 0,
    vidaExtra: 0,
  },
};

/* Quais climas são possíveis em cada bioma/região */
export const CLIMAS_POR_REGIAO = {
  vila:     ['limpo', 'limpo', 'limpo', 'chuva', 'nevoeiro'],
  floresta: ['limpo', 'chuva', 'chuva', 'nevoeiro', 'tempestade'],
  colina:   ['limpo', 'limpo', 'chuva', 'nevoeiro'],
  pantano:  ['chuva', 'chuva', 'nevoeiro', 'tempestade'],
  vale:     ['limpo', 'limpo', 'limpo', 'chuva'],
  deserto:  ['limpo', 'limpo', 'limpo', 'tempestade'], // tempestade de areia
  porto:    ['limpo', 'chuva', 'tempestade', 'nevoeiro'],
  montanha: ['limpo', 'neve', 'neve', 'nevoeiro', 'tempestade'],
  castelo:  ['limpo', 'nevoeiro', 'nevoeiro', 'tempestade'],
};

/* ============================================================ */
/* HELPERS                                                       */
/* ============================================================ */

/** Calcula o período a partir da hora (0-23) */
export function calcularPeriodo(hora) {
  if (hora >= 5 && hora < 8) return PERIODOS.amanhecer;
  if (hora >= 8 && hora < 17) return PERIODOS.dia;
  if (hora >= 17 && hora < 20) return PERIODOS.anoitecer;
  if (hora >= 20 && hora < 24) return PERIODOS.noite;
  return PERIODOS.madrugada; // 0-4
}

/** Formata a hora em "HH:00" */
export function formatarHora(hora) {
  return `${String(hora).padStart(2, '0')}:00`;
}

/** Sorteia um clima para a região */
export function sortearClima(regiaoId) {
  const lista = CLIMAS_POR_REGIAO[regiaoId] || ['limpo'];
  const idClima = lista[Math.floor(Math.random() * lista.length)];
  return CLIMAS[idClima] || CLIMAS.limpo;
}

/** Avança o tempo em horas (módulo 24) */
export function avancarHora(hora, quantidade = 1) {
  return (hora + quantidade) % 24;
}

export function getClima(id) {
  return CLIMAS[id] || CLIMAS.limpo;
}

export function getPeriodo(id) {
  return PERIODOS[id] || PERIODOS.dia;
}

/** Retorna texto descritivo completo: "🌧 Chuva · 🌙 Noite" */
export function resumoAmbiente(hora, climaId) {
  const periodo = calcularPeriodo(hora);
  const clima = getClima(climaId);
  return `${clima.emoji} ${clima.nome} · ${periodo.emoji} ${periodo.nome}`;
}
// src/content/racas.js
export const RACAS = {
  humano: {
    id: 'humano',
    nome: 'Humano',
    emoji: '🧑',
    desc: 'Versátil e ambicioso. Bônus equilibrado em tudo.',
    bonus: { hpMax: 5, atk: 2, def: 2, manaMax: 5 },
  },
  elfo: {
    id: 'elfo',
    nome: 'Elfo',
    emoji: '🧝',
    desc: 'Ágil e ligado à magia. Fraco fisicamente, forte no arcano.',
    bonus: { hpMax: 0, atk: 3, def: 1, manaMax: 15 },
  },
  anao: {
    id: 'anao',
    nome: 'Anão',
    emoji: '🧔',
    desc: 'Resistente e teimoso. Feito para aguentar porrada.',
    bonus: { hpMax: 15, atk: 1, def: 4, manaMax: -5 },
  },
  orc: {
    id: 'orc',
    nome: 'Orc',
    emoji: '👹',
    desc: 'Brutal e selvagem. Força bruta acima de tudo.',
    bonus: { hpMax: 8, atk: 5, def: 0, manaMax: -5 },
  },
  halfling: {
    id: 'halfling',
    nome: 'Halfling',
    emoji: '🧒',
    desc: 'Pequeno e sortudo. Difícil de acertar.',
    bonus: { hpMax: 3, atk: 1, def: 3, manaMax: 5 },
  },
};
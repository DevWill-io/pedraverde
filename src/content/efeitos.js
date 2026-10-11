// src/content/efeitos.js
/* ------------------------------------------------------------------ */
/* Status effects                                                      */
/* ------------------------------------------------------------------ */
/* tipo:                                                               */
/*   'dano'   → causa valor por turno                                  */
/*   'cura'   → cura valor por turno                                   */
/*   'atk'    → soma valor ao ATK (pode ser negativo)                  */
/*   'def'    → soma valor ao DEF (pode ser negativo)                  */
/*   'turno'  → efeito especial (atordoado, congelado)                 */

export const EFEITOS = {
  veneno: {
    id: 'veneno',
    nome: 'Veneno',
    emoji: '☠',
    tipo: 'dano',
    valor: 2,
    duracao: 3,
    cor: 'efeito-veneno',
    desc: 'Perde 2 HP por turno.',
  },
  queimadura: {
    id: 'queimadura',
    nome: 'Queimadura',
    emoji: '🔥',
    tipo: 'dano',
    valor: 3,
    duracao: 2,
    cor: 'efeito-fogo',
    desc: 'Perde 3 HP por turno.',
  },
  sangramento: {
    id: 'sangramento',
    nome: 'Sangramento',
    emoji: '🩸',
    tipo: 'dano',
    valor: 1,
    duracao: 5,
    cor: 'efeito-sangue',
    desc: 'Perde 1 HP por turno.',
  },
  regeneracao: {
    id: 'regeneracao',
    nome: 'Regeneração',
    emoji: '💚',
    tipo: 'cura',
    valor: 2,
    duracao: 3,
    cor: 'efeito-cura',
    desc: 'Recupera 2 HP por turno.',
  },
  forca: {
    id: 'forca',
    nome: 'Força',
    emoji: '💪',
    tipo: 'atk',
    valor: 3,
    duracao: 3,
    cor: 'efeito-buff',
    desc: '+3 ATK por 3 turnos.',
  },
  fraqueza: {
    id: 'fraqueza',
    nome: 'Fraqueza',
    emoji: '🥀',
    tipo: 'atk',
    valor: -3,
    duracao: 3,
    cor: 'efeito-debuff',
    desc: '-3 ATK por 3 turnos.',
  },
  lentidao: {
    id: 'lentidao',
    nome: 'Lentidão',
    emoji: '🐌',
    tipo: 'def',
    valor: -3,
    duracao: 3,
    cor: 'efeito-debuff',
    desc: '-3 DEF por 3 turnos.',
  },
};

/* Quais inimigos aplicam quais efeitos */
export const EFEITOS_INIMIGOS = {
  aranha: { tipo: 'veneno', chance: 0.4 },
  esqueleto: { tipo: 'sangramento', chance: 0.35 },
  goblin: { tipo: 'sangramento', chance: 0.2 },
  bandido: { tipo: 'fraqueza', chance: 0.25 },
  troll: { tipo: 'lentidao', chance: 0.3 },
  ogro: { tipo: 'fraqueza', chance: 0.3 },
};
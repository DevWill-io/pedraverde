// src/content/ambientes.js
/*
  Perfis de ambiente sonoro por região.
  Os sons são sintetizados via Web Audio API (sem arquivos).
*/

export const AMBIENTES = {
  vila: {
    id: 'vila',
    nome: 'Vila',
    emoji: '🏘',
    vento: 0.25,                          // 0-1, intensidade do vento base
    eventos: ['passaro', 'passaro', 'galinha', 'carrinho'],
    intervalo: [4, 10],                   // segundos entre eventos
  },
  floresta: {
    id: 'floresta',
    nome: 'Floresta Sombria',
    emoji: '🌲',
    vento: 0.4,
    eventos: ['passaro', 'passaro', 'coruja', 'galho', 'passaro'],
    intervalo: [2, 6],
  },
  colina: {
    id: 'colina',
    nome: 'Colinas',
    emoji: '⛰',
    vento: 0.55,
    eventos: ['vento_forte', 'galho', 'passaro'],
    intervalo: [3, 8],
  },
  pantano: {
    id: 'pantano',
    nome: 'Pântano Sombrio',
    emoji: '🐸',
    vento: 0.15,
    eventos: ['sapo', 'sapo', 'gota', 'grilo', 'sapo'],
    intervalo: [2, 5],
  },
  vale: {
    id: 'vale',
    nome: 'Vale do Sol',
    emoji: '☀',
    vento: 0.3,
    eventos: ['passaro', 'galinha', 'carrinho', 'passaro'],
    intervalo: [3, 8],
  },
  deserto: {
    id: 'deserto',
    nome: 'Deserto',
    emoji: '🏜',
    vento: 0.7,
    eventos: ['vento_forte', 'vento_forte', 'areia'],
    intervalo: [3, 7],
  },
  porto: {
    id: 'porto',
    nome: 'Porto',
    emoji: '⚓',
    vento: 0.35,
    eventos: ['onda', 'gaivota', 'onda', 'sino_navio', 'gaivota'],
    intervalo: [2, 6],
  },
  montanha: {
    id: 'montanha',
    nome: 'Montanha',
    emoji: '❄',
    vento: 0.8,
    eventos: ['vento_forte', 'vento_forte', 'gelo', 'vento_forte'],
    intervalo: [3, 8],
  },
  castelo: {
    id: 'castelo',
    nome: 'Castelo',
    emoji: '🏰',
    vento: 0.5,
    eventos: ['corvo', 'tocha', 'vento_forte', 'corrente'],
    intervalo: [3, 7],
  },
};

/* Fallback */
export function getAmbiente(regiaoId) {
  return AMBIENTES[regiaoId] || AMBIENTES.vila;
}
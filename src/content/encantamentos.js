// src/content/encantamentos.js
/*
  Cada encantamento aplica em UMA arma ou armadura. Salvo em e.encantamentos[slot] = idEncantamento.
  Bônus somados em atkTotal/defTotal.
  Efeito elemental dispara ao atacar (chance).
*/

export const ENCANTAMENTOS = {
  fogo: {
    id: 'fogo',
    nome: 'Chama',
    emoji: '🔥',
    gema: 'gema_rubi',
    moedas: 100,
    nivel: 3,
    bonus: { atk: 3 },
    efeito: 'queimadura',
    chance: 0.35,
    desc: '+3 ATK. 35% de queimar o inimigo ao acertar.',
  },
  gelo: {
    id: 'gelo',
    nome: 'Gelo',
    emoji: '❄',
    gema: 'gema_safira',
    moedas: 120,
    nivel: 4,
    bonus: { atk: 2, def: 1 },
    efeito: 'congelado',
    chance: 0.25,
    desc: '+2 ATK, +1 DEF. 25% de congelar ao acertar.',
  },
  veneno: {
    id: 'veneno',
    nome: 'Veneno',
    emoji: '☠',
    gema: 'gema_rubi',
    moedas: 90,
    nivel: 3,
    bonus: { atk: 2 },
    efeito: 'veneno',
    chance: 0.45,
    desc: '+2 ATK. 45% de envenenar ao acertar.',
  },
  raio: {
    id: 'raio',
    nome: 'Raio',
    emoji: '⚡',
    gema: 'cristal',
    moedas: 80,
    nivel: 5,
    bonus: { atk: 4 },
    efeito: 'atordoado',
    chance: 0.20,
    desc: '+4 ATK. 20% de atordoar ao acertar.',
  },
  sagrado: {
    id: 'sagrado',
    nome: 'Sagrado',
    emoji: '✨',
    gema: 'gema_safira',
    moedas: 150,
    nivel: 6,
    bonus: { atk: 3, def: 3 },
    efeito: null,
    chance: 0,
    desc: '+3 ATK, +3 DEF. Poder dos deuses.',
  },
};

/* Slots que aceitam encantamento */
export const SLOTS_ENCANTAVEIS = ['arma', 'escudo', 'elmo', 'armadura', 'botas', 'anel', 'colar', 'capa'];
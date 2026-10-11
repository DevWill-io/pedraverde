// src/content/classes.js
export const CLASSES = {
  guerreiro: {
    id: 'guerreiro',
    nome: 'Guerreiro',
    emoji: '⚔',
    desc: 'Especialista em combate corpo a corpo. Muito HP e DEF.',
    bonus: { hpMax: 10, atk: 3, def: 3, manaMax: 0 },
    magias: ['investida'],
  },
  mago: {
    id: 'mago',
    nome: 'Mago',
    emoji: '🔮',
    desc: 'Mestre das artes arcanas. Dano mágico devastador.',
    bonus: { hpMax: -5, atk: 0, def: 0, manaMax: 30 },
    magias: ['bola_fogo', 'raio', 'toque_gelido', 'escudo_magico'],
  },
  ladino: {
    id: 'ladino',
    nome: 'Ladino',
    emoji: '🗡',
    desc: 'Rápido e mortal. Ataques furtivos devastadores.',
    bonus: { hpMax: 0, atk: 2, def: 1, manaMax: 10 },
    magias: ['ataque_furtivo'],
  },
  clerigo: {
    id: 'clerigo',
    nome: 'Clérigo',
    emoji: '✨',
    desc: 'Servo dos deuses. Cura e protege.',
    bonus: { hpMax: 5, atk: 1, def: 2, manaMax: 20 },
    magias: ['cura', 'escudo_magico', 'bencao'],
  },
  arqueiro: {
    id: 'arqueiro',
    nome: 'Arqueiro',
    emoji: '🏹',
    desc: 'Precisão letal à distância. Ignora defesas.',
    bonus: { hpMax: 3, atk: 4, def: 1, manaMax: 10 },
    magias: ['tiro_certeiro'],
  },
};
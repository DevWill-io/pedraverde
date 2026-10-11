// src/content/arena.js
export const ARENA_INFO = {
  nome: 'Arena de Treino',
  desc: 'Um ringue de areia batida, cercado por arquibancadas de madeira. Aqui você pode testar suas habilidades sem risco de morte.',
  regras: [
    'Você não pode morrer — se cair, acorda na arquibancada com 1 HP.',
    'XP é reduzido pela metade.',
    'Sem loot, sem drops, sem quests.',
  ],
};

/* Inimigos disponíveis para treino (fraco → forte) */
export const INIMIGOS_ARENA = [
  'rato',
  'lobo',
  'goblin',
  'aranha',
  'esqueleto',
  'bandido',
];
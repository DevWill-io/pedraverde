// src/content/diarias.js
/*
  Missões diárias sorteadas por dia real.
  Cada missão é completável automaticamente (o jogo rastreia progresso).
*/

export const MISSOES_DIARIAS = [
  {
    id: 'matar_5',
    nome: 'Caçada Diária',
    emoji: '⚔',
    desc: 'Derrote 5 inimigos.',
    objetivo: { tipo: 'matar', qtd: 5 },
    recompensa: { moedas: 30, xp: 20 },
  },
  {
    id: 'matar_chefe',
    nome: 'Desafio de Chefe',
    emoji: '👑',
    desc: 'Derrote qualquer chefe.',
    objetivo: { tipo: 'matar_chefe', qtd: 1 },
    recompensa: { moedas: 100, xp: 80 },
  },
  {
    id: 'comprar_3',
    nome: 'Freguês do Dia',
    emoji: '◈',
    desc: 'Compre 3 itens.',
    objetivo: { tipo: 'comprar', qtd: 3 },
    recompensa: { moedas: 25, xp: 15 },
  },
  {
    id: 'vender_2',
    nome: 'Vendedor Esperto',
    emoji: '💰',
    desc: 'Venda 2 itens.',
    objetivo: { tipo: 'vender', qtd: 2 },
    recompensa: { moedas: 40, xp: 20 },
  },
  {
    id: 'visitar_3',
    nome: 'Turista',
    emoji: '🗺',
    desc: 'Visite 3 locais diferentes.',
    objetivo: { tipo: 'visitar', qtd: 3 },
    recompensa: { moedas: 20, xp: 15 },
  },
  {
    id: 'craftar_1',
    nome: 'Artesão do Dia',
    emoji: '⚒',
    desc: 'Forje qualquer item.',
    objetivo: { tipo: 'craftar', qtd: 1 },
    recompensa: { moedas: 35, xp: 25 },
  },
  {
    id: 'usar_5_pocoes',
    nome: 'Boticário',
    emoji: '🧪',
    desc: 'Use 5 consumíveis.',
    objetivo: { tipo: 'usar', qtd: 5 },
    recompensa: { moedas: 25, xp: 20 },
  },
  {
    id: 'arena_2',
    nome: 'Treino Pesado',
    emoji: '🏟',
    desc: 'Vença 2 lutas na arena.',
    objetivo: { tipo: 'arena', qtd: 2 },
    recompensa: { moedas: 30, xp: 25 },
  },
  {
    id: 'dano_100',
    nome: 'Demolidor',
    emoji: '💥',
    desc: 'Cause 100 de dano total.',
    objetivo: { tipo: 'dano', qtd: 100 },
    recompensa: { moedas: 20, xp: 30 },
  },
  {
    id: 'encantar_1',
    nome: 'Encantador',
    emoji: '✨',
    desc: 'Aplique um encantamento em qualquer item.',
    objetivo: { tipo: 'encantar', qtd: 1 },
    recompensa: { moedas: 60, xp: 40 },
  },
  {
    id: 'usar_magia_5',
    nome: 'Estudante de Magia',
    emoji: '🔮',
    desc: 'Lance 5 magias.',
    objetivo: { tipo: 'magia', qtd: 5 },
    recompensa: { moedas: 25, xp: 30 },
  },
  {
    id: 'evento_2',
    nome: 'Sortudo',
    emoji: '🍀',
    desc: 'Viva 2 eventos aleatórios.',
    objetivo: { tipo: 'evento', qtd: 2 },
    recompensa: { moedas: 20, xp: 20 },
  },
];

/* ============================================================ */
/* LOGIN STREAK                                                 */
/* ============================================================ */

/* Recompensas por dia consecutivo (semana toda) */
export const STREAK_RECOMPENSAS = [
  { dia: 1, moedas: 10,  desc: 'Bônus de boas-vindas' },
  { dia: 2, moedas: 15,  desc: 'Segundo dia' },
  { dia: 3, moedas: 25,  xp: 20, desc: '3 dias seguidos' },
  { dia: 4, moedas: 35,  desc: '4 dias' },
  { dia: 5, moedas: 50,  xp: 30, desc: 'Meia semana' },
  { dia: 6, moedas: 75,  xp: 40, desc: 'Quase lá!' },
  { dia: 7, moedas: 150, xp: 100, itens: ['panaceia'], desc: '🏆 RECOMPENSA MÁXIMA!' },
];

/* ============================================================ */
/* HELPERS                                                       */
/* ============================================================ */

/** Retorna a data atual no formato YYYY-MM-DD */
export function hoje() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dia}`;
}

/** Retorna a data de ontem no formato YYYY-MM-DD */
export function ontem() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dia}`;
}

/** Sorteia 3 missões diárias (sem repetir) */
export function sortearMissoesDiarias(quantidade = 3) {
  const copia = [...MISSOES_DIARIAS];
  const resultado = [];
  for (let i = 0; i < quantidade && copia.length; i++) {
    const idx = Math.floor(Math.random() * copia.length);
    resultado.push(copia.splice(idx, 1)[0]);
  }
  return resultado;
}

/** Retorna o objeto de recompensa para um dia do streak (ciclo de 7) */
export function recompensaStreak(diaConsecutivo) {
  const idx = ((diaConsecutivo - 1) % 7);
  return STREAK_RECOMPENSAS[idx];
}

/** Acha uma missão diária pelo ID */
export function acharMissao(id) {
  return MISSOES_DIARIAS.find((m) => m.id === id) || null;
}
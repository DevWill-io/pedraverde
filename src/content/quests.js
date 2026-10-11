// src/content/quests.js
export const QUESTS = {
  lobos: {
    id: 'lobos',
    titulo: 'Lobos na Floresta',
    desc: 'Mate 3 Lobos Selvagens na Floresta Sombria.',
    objetivo: { tipo: 'matar', alvo: 'lobo', qtd: 3 },
    recompensa: { xp: 50, moedas: 30 },
  },
  troll: {
    id: 'troll',
    titulo: 'O Troll das Cavernas',
    desc: 'Derrote o Troll das Cavernas na Caverna Profunda.',
    objetivo: { tipo: 'matar', alvo: 'troll', qtd: 1 },
    recompensa: { xp: 100, moedas: 100, itens: ['espada_longa'] },
  },
  fregues: {
    id: 'fregues',
    titulo: 'Freguês Novo',
    desc: 'Compre qualquer item em qualquer loja.',
    objetivo: { tipo: 'comprar', alvo: 'qualquer', qtd: 1 },
    recompensa: { xp: 20, moedas: 15 },
  },

  /* ---- Novas ---- */
  aranhas: {
    id: 'aranhas',
    titulo: 'Praga do Pântano',
    desc: 'Mate 5 Aranhas Venenosas no Pântano Sombrio.',
    objetivo: { tipo: 'matar', alvo: 'aranha', qtd: 5 },
    recompensa: { xp: 80, moedas: 50, itens: ['elixir_maior'] },
  },
  ogro: {
    id: 'ogro',
    titulo: 'O Ogro das Ruínas',
    desc: 'Derrote o Ogro das Ruínas, no norte do Pântano.',
    objetivo: { tipo: 'matar', alvo: 'ogro', qtd: 1 },
    recompensa: { xp: 150, moedas: 120, itens: ['cota_malha'] },
  },
  bandidos: {
    id: 'bandidos',
    titulo: 'A Ameaça da Colina',
    desc: 'Mate 3 Bandidos na Colina dos Bandidos, a leste do mercado.',
    objetivo: { tipo: 'matar', alvo: 'bandido', qtd: 3 },
    recompensa: { xp: 100, moedas: 80, itens: ['pocao'] },
  },
};
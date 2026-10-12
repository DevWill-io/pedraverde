// src/content/inimigos.js
export const INIMIGOS = {
  /* ============================================================ */
  /* NÍVEL BAIXO                                                    */
  /* ============================================================ */
  rato: {
    id: 'rato', nome: 'Rato Gigante',
    hp: 22, atk: 8, def: 2, xp: 10,
    loot: ['pao'], arquetipo: 'bestial',
    desc: 'Do tamanho de um cão. Sujo e faminto.',
  },
  lobo: {
    id: 'lobo', nome: 'Lobo Selvagem',
    hp: 35, atk: 10, def: 3, xp: 18,
    loot: ['pocao'], arquetipo: 'agressivo',
    desc: 'Pelo eriçado e presas amareladas.',
  },
  goblin: {
    id: 'goblin', nome: 'Goblin',
    hp: 40, atk: 12, def: 3, xp: 25,
    loot: ['pocao'], arquetipo: 'tatico',
    desc: 'Pequeno, cruel e barulhento.',
  },

  /* ============================================================ */
  /* NÍVEL MÉDIO                                                    */
  /* ============================================================ */
  aranha: {
    id: 'aranha', nome: 'Aranha Venenosa',
    hp: 32, atk: 14, def: 2, xp: 28,
    loot: ['pocao', 'antidoto'], arquetipo: 'bestial',
    desc: 'Pernas peludas e presas gotejantes.',
  },
  esqueleto: {
    id: 'esqueleto', nome: 'Esqueleto Guerreiro',
    hp: 55, atk: 16, def: 6, xp: 45,
    loot: ['elixir_maior'], arquetipo: 'tatico',
    desc: 'Ossos antigos empunhando uma espada lascada.',
  },
  bandido: {
    id: 'bandido', nome: 'Bandido',
    hp: 60, atk: 18, def: 6, xp: 55,
    loot: ['pocao', 'adaga'], arquetipo: 'agressivo',
    desc: 'Olhar frio e uma adaga na mão.',
  },

  /* ============================================================ */
  /* NÍVEL ALTO                                                     */
  /* ============================================================ */
  cultista: {
    id: 'cultista', nome: 'Cultista',
    hp: 65, atk: 20, def: 6, xp: 70,
    loot: ['pocao', 'elixir_maior'], arquetipo: 'magico',
    desc: 'Capuz preto, adaga ritual.',
  },
  escorpiao: {
    id: 'escorpiao', nome: 'Escorpião Gigante',
    hp: 60, atk: 22, def: 7, xp: 85,
    loot: ['antidoto'], arquetipo: 'bestial',
    desc: 'Ferrão brilhante.',
  },
  abutre: {
    id: 'abutre', nome: 'Abutre Carniceiro',
    hp: 50, atk: 20, def: 5, xp: 65,
    loot: ['pocao'], arquetipo: 'agressivo',
    desc: 'Voa em círculos.',
  },
  saqueador: {
    id: 'saqueador', nome: 'Saqueador',
    hp: 80, atk: 24, def: 8, xp: 100,
    loot: ['elixir_maior', 'ferro'], arquetipo: 'tatico',
    desc: 'Vive de restos.',
  },
  serpente: {
    id: 'serpente', nome: 'Serpente do Oásis',
    hp: 70, atk: 26, def: 7, xp: 110,
    loot: ['antidoto', 'pocao'], arquetipo: 'bestial',
    desc: 'Veneno paralisante.',
  },
  pirata: {
    id: 'pirata', nome: 'Pirata',
    hp: 95, atk: 28, def: 9, xp: 130,
    loot: ['espada_curta', 'pocao'], arquetipo: 'agressivo',
    desc: 'Espada e ódio.',
  },
  lobo_glacial: {
    id: 'lobo_glacial', nome: 'Lobo Glacial',
    hp: 90, atk: 30, def: 8, xp: 145,
    loot: ['pocao'], arquetipo: 'agressivo',
    desc: 'Pelo branco, olhos azuis.',
  },
  golem_gelo: {
    id: 'golem_gelo', nome: 'Golem de Gelo',
    hp: 130, atk: 28, def: 12, xp: 190,
    loot: ['cristal'], arquetipo: 'defensivo',
    desc: 'Gigante de gelo vivo.',
  },
  guarda_real: {
    id: 'guarda_real', nome: 'Guarda Real',
    hp: 120, atk: 32, def: 11, xp: 210,
    loot: ['elixir_maior', 'ferro'], arquetipo: 'defensivo',
    desc: 'Armadura negra, lança longa.',
  },
  cavaleiro_negro: {
    id: 'cavaleiro_negro', nome: 'Cavaleiro Negro',
    hp: 160, atk: 36, def: 13, xp: 300,
    loot: ['elixir_maior', 'gema_safira'], arquetipo: 'tatico',
    desc: 'Armadura completa preta.',
  },
  mago_negro: {
    id: 'mago_negro', nome: 'Mago Negro',
    hp: 110, atk: 40, def: 8, xp: 290,
    loot: ['cristal', 'pocao'], arquetipo: 'magico',
    desc: 'Cajado retorcido, olhar vazio.',
  },

  /* ============================================================ */
  /* CHEFES                                                         */
  /* ============================================================ */
  troll: {
    id: 'troll', nome: 'Troll das Cavernas',
    hp: 180, atk: 18, def: 6, xp: 200,
    loot: ['pocao', 'pocao', 'escudo_madeira'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'atacar', 'golpe_terra'],
    desc: 'Uma montanha de músculo e pedra. Seu martelo racha o chão.',
  },
  ogro: {
    id: 'ogro', nome: 'Ogro das Ruínas',
    hp: 240, atk: 22, def: 8, xp: 320,
    loot: ['machado_batalha', 'elixir_maior'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'forte', 'atacar', 'defender'],
    desc: 'Gigante brutal, mas lento. Protege as ruínas há décadas.',
  },
  bruxa: {
    id: 'bruxa', nome: 'Bruxa do Pântano',
    hp: 220, atk: 26, def: 7, xp: 400,
    loot: ['panaceia', 'cristal', 'amuleto_sorte'],
    chefe: true, arquetipo: 'magico',
    padrao: ['magia_sombria', 'atacar', 'cura_sombria', 'atacar'],
    desc: 'Velha de olhos verdes. Seu caldeirão ferve sozinho.',
  },
  rei_bandido: {
    id: 'rei_bandido', nome: 'Rei Bandido',
    hp: 320, atk: 30, def: 10, xp: 600,
    loot: ['espada_bastarda', 'elixir_maior'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'forte', 'atacar', 'defender'],
    desc: 'Coroa tosca, sorriso cruel.',
  },
  hidra: {
    id: 'hidra', nome: 'Hidra do Pântano',
    hp: 400, atk: 34, def: 11, xp: 750,
    loot: ['panaceia', 'cota_malha'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'atacar', 'forte', 'golpe_terra'],
    desc: 'Três cabeças, um corpo.',
  },
  bispo_sombrio: {
    id: 'bispo_sombrio', nome: 'Bispo Sombrio',
    hp: 480, atk: 38, def: 12, xp: 950,
    loot: ['cajado_arcano', 'gema_rubi'],
    chefe: true, arquetipo: 'magico',
    padrao: ['magia_sombria', 'maldicao', 'atacar', 'cura_sombria'],
    desc: 'Líder dos cultistas. Não é mais humano.',
  },
  mumia_rei: {
    id: 'mumia_rei', nome: 'Rei Mumificado',
    hp: 560, atk: 42, def: 14, xp: 1200,
    loot: ['coroa_rei', 'gema_rubi'],
    chefe: true, arquetipo: 'tatico',
    padrao: ['maldicao', 'atacar', 'atacar', 'rugido'],
    desc: 'Faraó voltou à vida. Seu olhar congela a alma.',
  },
  esfinge: {
    id: 'esfinge', nome: 'Esfinge',
    hp: 650, atk: 46, def: 16, xp: 1500,
    loot: ['anel_titan', 'gema_safira'],
    chefe: true, arquetipo: 'tatico',
    padrao: ['atacar', 'forte', 'magia_sombria', 'defender'],
    desc: 'Guardiã de enigmas. Cada resposta errada é uma vida.',
  },
  capitao_pirata: {
    id: 'capitao_pirata', nome: 'Capitão Pirata',
    hp: 750, atk: 50, def: 18, xp: 1900,
    loot: ['katana', 'capa_invisibilidade'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'forte', 'atacar', 'atacar'],
    desc: 'Barba negra, gancho de ferro. Mata sem hesitar.',
  },
  gigante_gelo: {
    id: 'gigante_gelo', nome: 'Gigante de Gelo',
    hp: 850, atk: 56, def: 20, xp: 2300,
    loot: ['armadura_placas', 'gema_safira'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'atacar', 'golpe_terra', 'defender'],
    desc: 'Titã do norte. Seu martelo pesa o mundo.',
  },
  chefe_gigante: {
    id: 'chefe_gigante', nome: 'Rei dos Gigantes',
    hp: 1000, atk: 62, def: 22, xp: 2900,
    loot: ['montante', 'anel_titan'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'rugido', 'forte', 'golpe_terra'],
    desc: 'O maior dos gigantes. Já destruiu reinos sozinho.',
  },
  dragao_anciao: {
    id: 'dragao_anciao', nome: 'Dragão Ancião',
    hp: 1400, atk: 76, def: 26, xp: 4500,
    loot: ['lamina_alvorada', 'armadura_dragao'],
    chefe: true, arquetipo: 'magico',
    padrao: ['atacar', 'sopro_fogo', 'atacar', 'rugido'],
    desc: 'Escamas vermelhas, asas de tempestade.',
  },
  rei_antigo: {
    id: 'rei_antigo', nome: 'Rei Antigo',
    hp: 2000, atk: 95, def: 30, xp: 8000,
    loot: ['egide', 'manto_real', 'coroa_rei'],
    chefe: true, arquetipo: 'tatico',
    padrao: ['atacar', 'magia_sombria', 'golpe_terra', 'cura_sombria', 'rugido'],
    desc: 'O último rei. Não está mais vivo — nem morto.',
  },
};
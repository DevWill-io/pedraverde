// src/content/inimigos.js
export const INIMIGOS = {
  /* ============================================================ */
  /* NÍVEL BAIXO                                                    */
  /* ============================================================ */
  rato: {
    id: 'rato', nome: 'Rato Gigante',
    hp: 14, atk: 4, def: 1, xp: 6,
    loot: ['pao'], arquetipo: 'bestial',
    desc: 'Do tamanho de um cão. Sujo e faminto.',
  },
  lobo: {
    id: 'lobo', nome: 'Lobo Selvagem',
    hp: 22, atk: 6, def: 2, xp: 12,
    loot: ['pocao'], arquetipo: 'agressivo',
    desc: 'Pelo eriçado e presas amareladas.',
  },
  goblin: {
    id: 'goblin', nome: 'Goblin',
    hp: 26, atk: 7, def: 3, xp: 16,
    loot: ['pocao'], arquetipo: 'tatico',
    desc: 'Pequeno, cruel e barulhento.',
  },

  /* ============================================================ */
  /* NÍVEL MÉDIO                                                    */
  /* ============================================================ */
  aranha: {
    id: 'aranha', nome: 'Aranha Venenosa',
    hp: 20, atk: 9, def: 2, xp: 18,
    loot: ['pocao', 'antidoto'], arquetipo: 'bestial',
    desc: 'Pernas peludas e presas gotejantes.',
  },
  esqueleto: {
    id: 'esqueleto', nome: 'Esqueleto Guerreiro',
    hp: 34, atk: 10, def: 5, xp: 28,
    loot: ['elixir_maior'], arquetipo: 'tatico',
    desc: 'Ossos antigos empunhando uma espada lascada.',
  },
  bandido: {
    id: 'bandido', nome: 'Bandido',
    hp: 38, atk: 11, def: 5, xp: 35,
    loot: ['pocao', 'adaga'], arquetipo: 'agressivo',
    desc: 'Olhar frio e uma adaga na mão.',
  },

  /* ============================================================ */
  /* NÍVEL ALTO                                                     */
  /* ============================================================ */
  cultista: {
    id: 'cultista', nome: 'Cultista',
    hp: 42, atk: 13, def: 6, xp: 48,
    loot: ['pocao', 'elixir_maior'], arquetipo: 'magico',
    desc: 'Capuz preto, adaga ritual.',
  },
  escorpiao: {
    id: 'escorpiao', nome: 'Escorpião Gigante',
    hp: 40, atk: 15, def: 8, xp: 55,
    loot: ['antidoto'], arquetipo: 'bestial',
    desc: 'Ferrão brilhante.',
  },
  abutre: {
    id: 'abutre', nome: 'Abutre Carniceiro',
    hp: 32, atk: 13, def: 5, xp: 45,
    loot: ['pocao'], arquetipo: 'agressivo',
    desc: 'Voa em círculos.',
  },
  saqueador: {
    id: 'saqueador', nome: 'Saqueador',
    hp: 50, atk: 16, def: 8, xp: 65,
    loot: ['elixir_maior', 'ferro'], arquetipo: 'tatico',
    desc: 'Vive de restos.',
  },
  serpente: {
    id: 'serpente', nome: 'Serpente do Oásis',
    hp: 44, atk: 18, def: 6, xp: 72,
    loot: ['antidoto', 'pocao'], arquetipo: 'bestial',
    desc: 'Veneno paralisante.',
  },
  pirata: {
    id: 'pirata', nome: 'Pirata',
    hp: 58, atk: 19, def: 9, xp: 88,
    loot: ['espada_curta', 'pocao'], arquetipo: 'agressivo',
    desc: 'Espada e ódio.',
  },
  lobo_glacial: {
    id: 'lobo_glacial', nome: 'Lobo Glacial',
    hp: 54, atk: 20, def: 8, xp: 95,
    loot: ['pocao'], arquetipo: 'agressivo',
    desc: 'Pelo branco, olhos azuis.',
  },
  golem_gelo: {
    id: 'golem_gelo', nome: 'Golem de Gelo',
    hp: 80, atk: 18, def: 15, xp: 130,
    loot: ['cristal'], arquetipo: 'defensivo',
    desc: 'Gigante de gelo vivo.',
  },
  guarda_real: {
    id: 'guarda_real', nome: 'Guarda Real',
    hp: 72, atk: 22, def: 13, xp: 145,
    loot: ['elixir_maior', 'ferro'], arquetipo: 'defensivo',
    desc: 'Armadura negra, lança longa.',
  },
  cavaleiro_negro: {
    id: 'cavaleiro_negro', nome: 'Cavaleiro Negro',
    hp: 95, atk: 25, def: 18, xp: 210,
    loot: ['elixir_maior', 'gema_safira'], arquetipo: 'tatico',
    desc: 'Armadura completa preta.',
  },
  mago_negro: {
    id: 'mago_negro', nome: 'Mago Negro',
    hp: 70, atk: 28, def: 9, xp: 200,
    loot: ['cristal', 'pocao'], arquetipo: 'magico',
    desc: 'Cajado retorcido, olhar vazio.',
  },

  /* ============================================================ */
  /* CHEFES — cada um com padrão único                              */
  /* ============================================================ */
  troll: {
    id: 'troll', nome: 'Troll das Cavernas',
    hp: 80, atk: 14, def: 7, xp: 80,
    loot: ['pocao', 'pocao', 'escudo_madeira'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'atacar', 'golpe_terra'],
    desc: 'Uma montanha de músculo e pedra. Seu martelo racha o chão.',
  },
  ogro: {
    id: 'ogro', nome: 'Ogro das Ruínas',
    hp: 120, atk: 17, def: 11, xp: 160,
    loot: ['machado_batalha', 'elixir_maior'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'forte', 'atacar', 'defender'],
    desc: 'Gigante brutal, mas lento. Protege as ruínas há décadas.',
  },
  bruxa: {
    id: 'bruxa', nome: 'Bruxa do Pântano',
    hp: 110, atk: 20, def: 10, xp: 190,
    loot: ['panaceia', 'cristal', 'amuleto_sorte'],
    chefe: true, arquetipo: 'magico',
    padrao: ['magia_sombria', 'atacar', 'cura_sombria', 'atacar'],
    desc: 'Velha de olhos verdes. Seu caldeirão ferve sozinho.',
  },
  rei_bandido: {
    id: 'rei_bandido', nome: 'Rei Bandido',
    hp: 160, atk: 23, def: 15, xp: 320,
    loot: ['espada_bastarda', 'elixir_maior'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'forte', 'atacar', 'defender'],
    desc: 'Coroa tosca, sorriso cruel.',
  },
  hidra: {
    id: 'hidra', nome: 'Hidra do Pântano',
    hp: 200, atk: 26, def: 14, xp: 400,
    loot: ['panaceia', 'cota_malha'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'atacar', 'forte', 'golpe_terra'],
    desc: 'Três cabeças, um corpo.',
  },
  bispo_sombrio: {
    id: 'bispo_sombrio', nome: 'Bispo Sombrio',
    hp: 220, atk: 29, def: 17, xp: 520,
    loot: ['cajado_arcano', 'gema_rubi'],
    chefe: true, arquetipo: 'magico',
    padrao: ['magia_sombria', 'maldicao', 'atacar', 'cura_sombria'],
    desc: 'Líder dos cultistas. Não é mais humano.',
  },
  mumia_rei: {
    id: 'mumia_rei', nome: 'Rei Mumificado',
    hp: 260, atk: 32, def: 20, xp: 640,
    loot: ['coroa_rei', 'gema_rubi'],
    chefe: true, arquetipo: 'tatico',
    padrao: ['maldicao', 'atacar', 'atacar', 'rugido'],
    desc: 'Faraó voltou à vida. Seu olhar congela a alma.',
  },
  esfinge: {
    id: 'esfinge', nome: 'Esfinge',
    hp: 320, atk: 36, def: 23, xp: 880,
    loot: ['anel_titan', 'gema_safira'],
    chefe: true, arquetipo: 'tatico',
    padrao: ['atacar', 'forte', 'magia_sombria', 'defender'],
    desc: 'Guardiã de enigmas. Cada resposta errada é uma vida.',
  },
  capitao_pirata: {
    id: 'capitao_pirata', nome: 'Capitão Pirata',
    hp: 360, atk: 39, def: 25, xp: 1120,
    loot: ['katana', 'capa_invisibilidade'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'forte', 'atacar', 'atacar'],
    desc: 'Barba negra, gancho de ferro. Mata sem hesitar.',
  },
  gigante_gelo: {
    id: 'gigante_gelo', nome: 'Gigante de Gelo',
    hp: 400, atk: 42, def: 28, xp: 1360,
    loot: ['armadura_placas', 'gema_safira'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'atacar', 'golpe_terra', 'defender'],
    desc: 'Titã do norte. Seu martelo pesa o mundo.',
  },
  chefe_gigante: {
    id: 'chefe_gigante', nome: 'Rei dos Gigantes',
    hp: 480, atk: 48, def: 32, xp: 1760,
    loot: ['montante', 'anel_titan'],
    chefe: true, arquetipo: 'agressivo',
    padrao: ['atacar', 'rugido', 'forte', 'golpe_terra'],
    desc: 'O maior dos gigantes. Já destruiu reinos sozinho.',
  },
  dragao_anciao: {
    id: 'dragao_anciao', nome: 'Dragão Ancião',
    hp: 700, atk: 60, def: 40, xp: 2880,
    loot: ['lamina_alvorada', 'armadura_dragao'],
    chefe: true, arquetipo: 'magico',
    padrao: ['atacar', 'sopro_fogo', 'atacar', 'rugido'],
    desc: 'Escamas vermelhas, asas de tempestade.',
  },
  rei_antigo: {
    id: 'rei_antigo', nome: 'Rei Antigo',
    hp: 1000, atk: 75, def: 48, xp: 4800,
    loot: ['egide', 'manto_real', 'coroa_rei'],
    chefe: true, arquetipo: 'tatico',
    padrao: ['atacar', 'magia_sombria', 'golpe_terra', 'cura_sombria', 'rugido'],
    desc: 'O último rei. Não está mais vivo — nem morto.',
  },
};
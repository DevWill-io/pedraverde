// src/content/inimigos.js
export const INIMIGOS = {
  /* --- Nível baixo --- */
  rato:         { id: 'rato',         nome: 'Rato Gigante',        hp: 8,  atk: 3,  def: 0, xp: 4,  loot: ['pao'],         desc: 'Do tamanho de um cão.' },
  lobo:         { id: 'lobo',         nome: 'Lobo Selvagem',       hp: 12, atk: 4,  def: 1, xp: 8,  loot: ['pocao'],       desc: 'Presas amareladas.' },
  goblin:       { id: 'goblin',       nome: 'Goblin',              hp: 15, atk: 5,  def: 2, xp: 12, loot: ['pocao'],       desc: 'Pequeno e cruel.' },

  /* --- Nível médio --- */
  aranha:       { id: 'aranha',       nome: 'Aranha Venenosa',     hp: 10, atk: 6,  def: 1, xp: 10, loot: ['pocao'],       desc: 'Presas gotejantes.' },
  esqueleto:    { id: 'esqueleto',    nome: 'Esqueleto Guerreiro', hp: 18, atk: 6,  def: 3, xp: 20, loot: ['elixir_maior'], desc: 'Ossos antigos com espada.' },
  bandido:      { id: 'bandido',      nome: 'Bandido',             hp: 20, atk: 7,  def: 3, xp: 25, loot: ['pocao','adaga'], desc: 'Olhar frio e adaga.' },

  /* --- Nível alto --- */
  cultista:     { id: 'cultista',     nome: 'Cultista',            hp: 25, atk: 8,  def: 4, xp: 35, loot: ['pocao','elixir_maior'], desc: 'Capuz preto, adaga ritual.' },
  escorpiao:    { id: 'escorpiao',    nome: 'Escorpião Gigante',   hp: 22, atk: 9,  def: 5, xp: 40, loot: ['antidoto'],     desc: 'Ferrão brilhante.' },
  abutre:       { id: 'abutre',       nome: 'Abutre Carniceiro',   hp: 18, atk: 8,  def: 3, xp: 30, loot: ['pocao'],       desc: 'Voa em círculos.' },
  saqueador:    { id: 'saqueador',    nome: 'Saqueador',           hp: 28, atk: 10, def: 5, xp: 45, loot: ['elixir_maior','ferro'], desc: 'Vive de restos.' },
  serpente:     { id: 'serpente',     nome: 'Serpente do Oásis',   hp: 24, atk: 11, def: 4, xp: 50, loot: ['antidoto','pocao'], desc: 'Veneno paralisante.' },
  pirata:       { id: 'pirata',       nome: 'Pirata',              hp: 32, atk: 12, def: 6, xp: 60, loot: ['espada_curta','pocao'], desc: 'Espada e ódio.' },
  lobo_glacial: { id: 'lobo_glacial', nome: 'Lobo Glacial',        hp: 30, atk: 13, def: 5, xp: 65, loot: ['pocao'],       desc: 'Pelo branco, olhos azuis.' },
  golem_gelo:   { id: 'golem_gelo',   nome: 'Golem de Gelo',       hp: 45, atk: 12, def: 10, xp: 90, loot: ['cristal'],    desc: 'Gigante de gelo vivo.' },
  guarda_real:  { id: 'guarda_real',  nome: 'Guarda Real',         hp: 40, atk: 14, def: 9, xp: 100, loot: ['elixir_maior','ferro'], desc: 'Armadura negra, lança longa.' },
  cavaleiro_negro: { id: 'cavaleiro_negro', nome: 'Cavaleiro Negro', hp: 55, atk: 16, def: 12, xp: 150, loot: ['elixir_maior','gema_safira'], desc: 'Armadura completa preta.' },
  mago_negro:   { id: 'mago_negro',   nome: 'Mago Negro',          hp: 40, atk: 18, def: 6, xp: 140, loot: ['cristal','pocao'], desc: 'Cajado retorcido, olhar vazio.' },

  /* ============ CHEFES ============ */
  troll:        { id: 'troll',        nome: 'Troll das Cavernas',  hp: 40, atk: 9,  def: 4,  xp: 50,  loot: ['pocao','pocao','escudo_madeira'],      chefe: true, desc: 'Montanha de músculo e pedra.' },
  ogro:         { id: 'ogro',         nome: 'Ogro das Ruínas',     hp: 60, atk: 11, def: 7,  xp: 100, loot: ['machado_batalha','elixir_maior'],     chefe: true, desc: 'Brutal, mas lento.' },
  bruxa:        { id: 'bruxa',        nome: 'Bruxa do Pântano',    hp: 55, atk: 13, def: 6,  xp: 120, loot: ['panaceia','cristal','amuleto_sorte'], chefe: true, desc: 'Velha de olhos verdes. Rio de magia.' },
  rei_bandido:  { id: 'rei_bandido',  nome: 'Rei Bandido',         hp: 80, atk: 15, def: 10, xp: 200, loot: ['espada_bastarda','elixir_maior'],   chefe: true, desc: 'Coroa tosca, sorriso cruel.' },
  hidra:        { id: 'hidra',        nome: 'Hidra do Pântano',    hp: 100,atk: 17, def: 9,  xp: 250, loot: ['panaceia','cota_malha'],            chefe: true, desc: 'Três cabeças, um corpo.' },
  bispo_sombrio:{ id: 'bispo_sombrio',nome: 'Bispo Sombrio',       hp: 110,atk: 19, def: 11, xp: 320, loot: ['cajado_arcano','gema_rubi'],        chefe: true, desc: 'Líder dos cultistas.' },
  mumia_rei:    { id: 'mumia_rei',    nome: 'Rei Mumificado',      hp: 130,atk: 21, def: 13, xp: 400, loot: ['coroa_rei','gema_rubi'],            chefe: true, desc: 'Faraó voltou à vida.' },
  esfinge:      { id: 'esfinge',      nome: 'Esfinge',             hp: 160,atk: 24, def: 15, xp: 550, loot: ['anel_titan','gema_safira'],        chefe: true, desc: 'Guardiã de enigmas.' },
  capitao_pirata:{id: 'capitao_pirata',nome:'Capitão Pirata',      hp: 180,atk: 26, def: 16, xp: 700, loot: ['katana','capa_invisibilidade'],    chefe: true, desc: 'Barba negra, gancho de ferro.' },
  gigante_gelo: { id: 'gigante_gelo', nome: 'Gigante de Gelo',     hp: 200,atk: 28, def: 18, xp: 850, loot: ['armadura_placas','gema_safira'],   chefe: true, desc: 'Titã do norte.' },
  chefe_gigante:{ id: 'chefe_gigante',nome: 'Rei dos Gigantes',    hp: 240,atk: 32, def: 20, xp: 1100,loot: ['montante','anel_titan'],           chefe: true, desc: 'O maior dos gigantes.' },
  dragao_anciao:{ id: 'dragao_anciao',nome: 'Dragão Ancião',       hp: 350,atk: 40, def: 25, xp: 1800,loot: ['lamina_alvorada','armadura_dragao'],chefe: true, desc: 'Escamas vermelhas, asas de tempestade.' },
  rei_antigo:   { id: 'rei_antigo',   nome: 'Rei Antigo',          hp: 500,atk: 50, def: 30, xp: 3000,loot: ['egide','manto_real','coroa_rei'],  chefe: true, desc: 'O último rei. Não está mais vivo — nem morto.' },
};
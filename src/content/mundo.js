// src/content/mundo.js

/* ================================================================== */
/* REGIÕES                                                             */
/* ================================================================== */
export const REGIOES = {
  vila:     { id: 'vila',     nome: 'Coração de Pedraverde', emoji: '🏘', nivel: '1+' },
  floresta: { id: 'floresta', nome: 'Floresta Sombria',       emoji: '🌲', nivel: '3+' },
  pantano:  { id: 'pantano',  nome: 'Pântano Sombrio',        emoji: '🐸', nivel: '5+' },
  colina:   { id: 'colina',   nome: 'Colinas Bandidas',       emoji: '⛰', nivel: '3+' },
  vale:     { id: 'vale',     nome: 'Vale do Sol',            emoji: '☀', nivel: '10+' },
  deserto:  { id: 'deserto',  nome: 'Deserto Escaldante',     emoji: '🏜', nivel: '12+' },
  porto:    { id: 'porto',    nome: 'Costa dos Naufrágios',   emoji: '⚓', nivel: '15+' },
  montanha: { id: 'montanha', nome: 'Pico Nevada',            emoji: '❄', nivel: '15+' },
  castelo:  { id: 'castelo',  nome: 'Castelo do Rei Antigo',  emoji: '🏰', nivel: '25+' },
};

/* ================================================================== */
/* MUNDO                                                               */
/* ================================================================== */
export const MUNDO = {

  /* ================= REGIÃO 1 — VILA ================= */
  pedraverde: {
    id: 'pedraverde', regiao: 'vila',
    nome: 'Vila de Pedraverde',
    desc: 'Uma vila pacata de casas de pedra e telhados de palha. No centro, uma fonte antiga murmura água cristalina. Placas apontam em todas as direções.',
    variacoes: [
      'Crianças correm entre as barracas, rindo.',
      'Um sino toca ao longe.',
      'Pombas voam assustadas da fonte.',
      'Um velho toca alaúde perto da fonte.',
      '',
    ],
    saidas: {
      norte: 'floresta', leste: 'ferraria', oeste: 'alquimista',
      sul: 'mercado', nordeste: 'arena', sudeste: 'vale_sol',
      noroeste: 'portao_arcano',   // ⭐ NOVO
    },
    npcs: [
      {
        nome: 'Anciã Mira',
        falas: [
          '"Bem-vindo a Pedraverde, forasteiro. Faz tempo que não vejo um rosto novo."',
          '"A Floresta Sombria ao norte anda perigosa. Lobos e goblins descem das colinas."',
          '"Dizem que um troll tomou a Caverna Profunda. Ninguém que entrou voltou para contar."',
          '"Além da floresta, há um pântano amaldiçoado. Aranhas gigantes vivem lá."',
          '"Se quiser testar suas habilidades, a Arena fica a nordeste. Ringue de areia, sem risco."',
        ],
      },
      {
        nome: 'Sábio Aldric',
        falas: [], // será preenchido dinamicamente pelo motor
        especial: 'aldric', // marcador pro motor saber que é o narrador
      },
    ],
  },

  ferraria: {
    id: 'ferraria', regiao: 'vila',
    nome: 'Ferraria',
    desc: 'Calor de forno, bigornas e prateleiras de aço. O Ferreiro Bruno limpa o suor e acena.',
    variacoes: ['Faíscas saltam da bigorna.', 'Bruno resmunga sobre o preço do minério.', ''],
    saidas: { oeste: 'pedraverde' },
    npc: {
      nome: 'Ferreiro Bruno',
      falas: ['"Aço bom é aço forjado aqui."', '"Trouxe um machado novo."'],
    },
    loja: {
      nome: 'Ferraria de Bruno',
      itens: ['clava', 'espada_curta', 'espada_longa', 'machado_batalha', 'escudo_madeira',
        'escudo_ferro', 'elmo_ferro', 'armadura_couro', 'broquel', 'capuz_couro', 'sandalias', 'botas_couro'],
    },
  },

  alquimista: {
    id: 'alquimista', regiao: 'vila',
    nome: 'Cabana da Alquimista',
    desc: 'Frascos borbulhantes, ervas no teto, cheiro de enxofre. A Alquimista Yara mexe um caldeirão.',
    variacoes: ['Algo range num armário trancado.', 'Um frasco roxo muda de cor sozinho.', ''],
    saidas: { leste: 'pedraverde' },
    npc: {
      nome: 'Alquimista Yara',
      falas: ['"Não toque em nada."', '"Poções curam. Cuidado com a dose."'],
    },
    loja: {
      nome: 'Bancada da Yara',
      itens: ['pao', 'carne_assada', 'pocao', 'antidoto', 'elixir_maior', 'panaceia'],
    },
  },

  mercado: {
    id: 'mercado', regiao: 'vila',
    nome: 'Mercado da Vila',
    desc: 'Barracas coloridas e negociantes. Um mercador viajante expõe relíquias exóticas.',
    variacoes: ['Um vendedor grita os preços.', 'Duas mulheres discutem.', ''],
    saidas: { norte: 'pedraverde', leste: 'colina_bandidos' },
    npc: {
      nome: 'Mercador Viajante',
      falas: ['"Tenho coisas raras."', '"Cuidado a leste, bandidos."'],
    },
    loja: {
      nome: 'Bazar do Viajante',
      itens: ['adaga', 'florete', 'arco_curto', 'arco_longo', 'cajado_carvalho',
        'amuleto_sorte', 'colar_vitalidade', 'anel_cobre', 'anel_protecao', 'capa_viagem', 'capa_elfica'],
    },
  },

  arena: {
    id: 'arena', regiao: 'vila',
    nome: 'Arena de Treino',
    desc: 'Ringue de areia batida, arquibancadas de madeira. Um velho gladiador observa.',
    variacoes: ['A multidão ecoa.', 'Areia fresca foi jogada no ringue.', ''],
    saidas: { sudoeste: 'pedraverde' },
    arena: true,
    npc: {
      nome: 'Veterano Rodrigo',
      falas: ['"Aqui testamos quem serve."', '"Na arena, ninguém morre."'],
    },
  },

    portao_arcano: {
    id: 'portao_arcano', regiao: 'vila',
    nome: 'Portão Arcano',
    desc: 'Um arco de pedra negra cravado no chão, pulsando com runas azuis. Do centro, uma névoa densa sobe. Dizem que leva a masmorras geradas pela própria magia.',
    variacoes: [
      'As runas do portal brilham mais forte quando você se aproxima.',
      'Um som grave vem de dentro da névoa.',
      'O ar em volta é mais frio.',
      '',
    ],
    saidas: { sudeste: 'pedraverde' },
    portal: true,
    npc: {
      nome: 'Eco Antigo',
      falas: [
        '"... atrás deste portão, a própria magia criou labirintos sem fim."',
        '"Cada entrada é única. Cada saída, uma escolha."',
        '"Morrer aqui dentro é voltar. Fugir é viver com o que achou."',
      ],
    },
  },

  /* ================= REGIÃO 2 — FLORESTA ================= */
  floresta: {
    id: 'floresta', regiao: 'floresta', nivelMinimo: 3,
    nome: 'Floresta Sombria',
    desc: 'Árvores retorcidas filtram uma luz doentia. Olhos brilham entre as sombras. Ao norte, uma fenda. A oeste, o chão fica mole.',
    variacoes: ['Um galho cai do nada.', 'Um uivo distante.', 'Pegadas enormes no barro.', ''],
    saidas: { sul: 'pedraverde', norte: 'caverna', oeste: 'pantano', leste: 'ruinas' },
    inimigos: ['lobo', 'goblin'],
    chanceEncontro: 0.6,
  },

  caverna: {
    id: 'caverna', regiao: 'floresta', nivelMinimo: 5,
    nome: 'Caverna Profunda',
    desc: 'Túnel úmido descendo para o escuro. Ossos pelo chão. Cheiro de ferrugem e fera.',
    variacoes: ['Uma gota ecoa.', 'Um rugido grave faz tudo tremer.', ''],
    saidas: { sul: 'floresta' },
    itensNoChao: ['espada_longa'],
    chefe: 'troll',
  },

  ruinas: {
    id: 'ruinas', regiao: 'floresta', nivelMinimo: 7,
    nome: 'Ruínas Antigas',
    desc: 'Colunas quebradas de um império esquecido. Ossos pelo chão de pedra.',
    variacoes: ['Símbolos brilham nas paredes.', 'Passos ecoam — mas não são seus.', ''],
    saidas: { oeste: 'floresta' },
    inimigos: ['esqueleto', 'esqueleto'],
    chanceEncontro: 0.65,
    itensNoChao: ['cota_malha'],
    chefe: 'ogro',
  },

  /* ================= REGIÃO 3 — PÂNTANO ================= */
  pantano: {
    id: 'pantano', regiao: 'pantano', nivelMinimo: 5,
    nome: 'Pântano Sombrio',
    desc: 'Água parada, névoa densa, teias enormes. Ao norte, colunas antigas. A oeste, ruínas afundadas.',
    variacoes: ['Uma bolha sobe da lama.', 'Algo grande se move sob a água.', ''],
    saidas: { leste: 'floresta', norte: 'covil_bruxa', oeste: 'ruinas_afundadas' },
    inimigos: ['aranha', 'rato', 'aranha'],
    chanceEncontro: 0.7,
  },

  covil_bruxa: {
    id: 'covil_bruxa', regiao: 'pantano', nivelMinimo: 6,
    nome: 'Covil da Bruxa',
    desc: 'Uma cabana torta coberta de musgo, cercada por caveiras e velas. Um caldeirão ferve sozinho.',
    variacoes: ['Algo se mexe no teto.', 'Um corvo pousa na janela.', ''],
    saidas: { sul: 'pantano' },
    chefe: 'bruxa',
  },

  ruinas_afundadas: {
    id: 'ruinas_afundadas', regiao: 'pantano', nivelMinimo: 8,
    nome: 'Ruínas Afundadas',
    desc: 'Muros de pedra submersos em lodo. Runas verdes brilham por entre as raízes. Algo enorme dorme mais adiante.',
    variacoes: ['O lodo se mexe.', 'Um cheiro de podridão.', ''],
    saidas: { leste: 'pantano', norte: 'covil_hidra' },
    inimigos: ['esqueleto', 'aranha'],
    chanceEncontro: 0.7,
  },

  covil_hidra: {
    id: 'covil_hidra', regiao: 'pantano', nivelMinimo: 10,
    nome: 'Covil da Hidra',
    desc: 'Uma câmara alagada com nove tocas. Sete pares de olhos amarelos te encaram das sombras.',
    variacoes: ['Água borbulha nas bordas.', 'Um silvo triplo ecoa.', ''],
    saidas: { sul: 'ruinas_afundadas' },
    chefe: 'hidra',
  },

  /* ================= REGIÃO 4 — COLINAS ================= */
  colina_bandidos: {
    id: 'colina_bandidos', regiao: 'colina', nivelMinimo: 3,
    nome: 'Colina dos Bandidos',
    desc: 'Acampamento improvisado com fogueiras. Homens de olhar duro jogam dados. Ao norte, uma paliçada.',
    variacoes: ['Um deles afia uma faca devagar.', 'Risadas grossas vêm da fogueira.', ''],
    saidas: { oeste: 'mercado', norte: 'fortaleza_bandido' },
    inimigos: ['bandido', 'bandido', 'lobo'],
    chanceEncontro: 0.7,
    itensNoChao: ['machado_batalha'],
  },

  fortaleza_bandido: {
    id: 'fortaleza_bandido', regiao: 'colina', nivelMinimo: 8,
    nome: 'Fortaleza do Rei Bandido',
    desc: 'Paliçadas de troncos, tochas vermelhas. Um trono feito de ossos e ouro ocupa o centro.',
    variacoes: ['Um tambor bate ao longe.', 'Gritos de guerra vêm da muralha.', ''],
    saidas: { sul: 'colina_bandidos' },
    chefe: 'rei_bandido',
  },

  /* ================= REGIÃO 5 — VALE DO SOL ================= */
  vale_sol: {
    id: 'vale_sol', regiao: 'vale', nivelMinimo: 10,
    nome: 'Vale do Sol',
    desc: 'Uma cidade próspera de pedra branca. Fontes, mercadores, e uma catedral no alto da colina. Aqui o mundo é bem maior.',
    variacoes: [
      'Músicos tocam na praça central.',
      'Uma carruagem passa com nobres.',
      'Cheiro de pão fresco vem de uma padaria.',
      'Guardas patrulham em formação.',
      '',
    ],
    saidas: {
      noroeste: 'pedraverde', leste: 'templo_sol', oeste: 'guilda_magos',
      norte: 'esgoto', sul: 'deserto', sudeste: 'porto',
    },
    npc: {
      nome: 'Prefeito Aurélio',
      falas: [
        '"Bem-vindo ao Vale do Sol, forasteiro."',
        '"Cuidado com o esgoto ao norte. Cultistas se escondem lá."',
        '"Ao sul fica o Deserto Escaldante. Só os corajosos atravessam."',
        '"A leste, o Templo do Sol abençoa os justos."',
      ],
    },
  },

  templo_sol: {
    id: 'templo_sol', regiao: 'vale', nivelMinimo: 10,
    nome: 'Templo do Sol',
    desc: 'Um templo de mármore dourado. Vitrais contam a história do deus Sol. Um altar brilha no centro.',
    variacoes: ['Cânticos suaves vêm do fundo.', 'O incenso perfuma o ar.', ''],
    saidas: { oeste: 'vale_sol' },
    npc: {
      nome: 'Sacerdotisa Elena',
      falas: [
        '"A luz do Sol cura todas as feridas."',
        '"Se estiver ferido, descanse aqui."',
      ],
    },
    loja: {
      nome: 'Bênçãos do Sol',
      itens: ['panaceia', 'elixir_maior', 'colar_vitalidade', 'colar_estrelas', 'anel_protecao', 'anel_forca'],
    },
  },

  guilda_magos: {
    id: 'guilda_magos', regiao: 'vale', nivelMinimo: 10,
    nome: 'Guilda dos Magos',
    desc: 'Uma torre circular cheia de livros flutuantes e cristais. Magos discutem feitiços em voz baixa.',
    variacoes: ['Um livro voa até a estante sozinho.', 'Uma bola de luz segue você.', ''],
    saidas: { leste: 'vale_sol' },
    npc: {
      nome: 'Arquimago Thales',
      falas: [
        '"Conhecimento é a maior arma."',
        '"Tenho itens que só magos conseguem usar."',
      ],
    },
    loja: {
      nome: 'Loja Arcana',
      itens: ['cajado_arcano', 'anel_arcano', 'capa_elfica', 'capa_invisibilidade', 'amuleto_sorte', 'anel_titan'],
    },
  },

  esgoto: {
    id: 'esgoto', regiao: 'vale', nivelMinimo: 12,
    nome: 'Esgotos do Vale',
    desc: 'Túneis subterrâneos fedidos. Ratos enormes e cultistas encapuzados. Ao norte, uma passagem trancada.',
    variacoes: ['Água fétida corre pelas paredes.', 'Sussurros vêm de trás.', ''],
    saidas: { sul: 'vale_sol', norte: 'catedral' },
    inimigos: ['rato', 'esqueleto', 'cultista'],
    chanceEncontro: 0.7,
  },

  catedral: {
    id: 'catedral', regiao: 'vale', nivelMinimo: 15,
    nome: 'Catedral Esquecida',
    desc: 'Uma catedral subterrânea tomada por cultistas. Altares negros, velas invertidas. No fundo, um trono.',
    variacoes: ['Cânticos em língua morta ecoam.', 'Sombras se movem nas paredes.', ''],
    saidas: { sul: 'esgoto' },
    chefe: 'bispo_sombrio',
  },

  /* ================= REGIÃO 6 — DESERTO ================= */
  deserto: {
    id: 'deserto', regiao: 'deserto', nivelMinimo: 12,
    nome: 'Deserto Escaldante',
    desc: 'Areias infinitas sob um sol cruel. Ossos de animais, ruínas soterradas. Ao leste, palmeiras. Ao sul, uma pirâmide.',
    variacoes: ['Um mirage tremula no horizonte.', 'Vento quente corta o rosto.', ''],
    saidas: { norte: 'vale_sol', leste: 'oasis', oeste: 'ruinas_perdidas', sul: 'piramide' },
    inimigos: ['escorpiao', 'abutre', 'saqueador'],
    chanceEncontro: 0.6,
  },

  oasis: {
    id: 'oasis', regiao: 'deserto', nivelMinimo: 13,
    nome: 'Oásis Escondido',
    desc: 'Palmeiras, água fresca, caravanas acampadas. Um lugar de descanso no meio do nada.',
    variacoes: ['Mercadores descansam à sombra.', 'Uma flauta toca suave.', ''],
    saidas: { oeste: 'deserto' },
    npc: {
      nome: 'Xeique Rashid',
      falas: ['"Bem-vindo, viajante."', '"Compre minhas especiarias ou siga em paz."'],
    },
    loja: {
      nome: 'Tenda de Rashid',
      itens: ['panaceia', 'elixir_maior', 'capa_viagem', 'anel_cobre', 'florete'],
    },
  },

  ruinas_perdidas: {
    id: 'ruinas_perdidas', regiao: 'deserto', nivelMinimo: 15,
    nome: 'Ruínas Perdidas',
    desc: 'Templo soterrado, coberto de areia. Hieróglifos brilham fracamente. Uma câmara mortuária se abre à frente.',
    variacoes: ['Passos ecoam entre as colunas.', 'Um cheiro de mirra antiga.', ''],
    saidas: { leste: 'deserto' },
    chefe: 'mumia_rei',
  },

  piramide: {
    id: 'piramide', regiao: 'deserto', nivelMinimo: 18,
    nome: 'Pirâmide do Sol',
    desc: 'Uma pirâmide colossal, negra contra o céu. Enigmas esculpidos nas paredes. Algo antigo guarda o topo.',
    variacoes: ['Hieróglifos brilham vermelho.', 'O chão treme de leve.', ''],
    saidas: { norte: 'deserto' },
    chefe: 'esfinge',
  },

  /* ================= REGIÃO 7 — PORTO ================= */
  porto: {
    id: 'porto', regiao: 'porto', nivelMinimo: 15,
    nome: 'Porto das Velas Negras',
    desc: 'Docas movimentadas, tavernas barulhentas e marinheiros bêbados. Ao norte, as montanhas. A leste, uma ilha ao longe.',
    variacoes: ['Um sino de navio toca.', 'Gaivotas gritam.', 'Marinheiros brigam na taverna.'],
    saidas: { noroeste: 'vale_sol', norte: 'base_montanha', leste: 'ilha_pirata' },
    npc: {
      nome: 'Capitão Ancião',
      falas: [
        '"Esse mar já engoliu mil navios."',
        '"Se for à Ilha do Crânio, leve poções."',
        '"Ao norte ficam as Montanhas Nevadas. Só tolos sobem."',
      ],
    },
    loja: {
      nome: 'Loja do Cais',
      itens: ['panaceia', 'elixir_maior', 'espada_bastarda', 'escudo_torre', 'capa_viagem', 'anel_protecao'],
    },
  },

  ilha_pirata: {
    id: 'ilha_pirata', regiao: 'porto', nivelMinimo: 18,
    nome: 'Ilha do Crânio',
    desc: 'Praia de areia negra, palmeiras mortas, caveiras empaladas em estacas. Uma gruta se abre ao norte.',
    variacoes: ['Um papagaio grita obscenidades.', 'Ondas batem nas pedras.', ''],
    saidas: { oeste: 'porto', norte: 'caverna_tesouro' },
    inimigos: ['pirata', 'pirata', 'serpente'],
    chanceEncontro: 0.7,
  },

  caverna_tesouro: {
    id: 'caverna_tesouro', regiao: 'porto', nivelMinimo: 20,
    nome: 'Caverna do Tesouro',
    desc: 'Uma caverna repleta de baús, moedas pelo chão. No centro, um trono feito de ossos e ouro.',
    variacoes: ['Moedas brilham à luz das tochas.', 'Um esqueleto cai de uma cadeira.', ''],
    saidas: { sul: 'ilha_pirata' },
    chefe: 'capitao_pirata',
  },

  /* ================= REGIÃO 8 — MONTANHA ================= */
  base_montanha: {
    id: 'base_montanha', regiao: 'montanha', nivelMinimo: 15,
    nome: 'Base da Montanha',
    desc: 'Pé de uma cordilheira nevada. Cabana de lenhadores, tochas, neve até os joelhos.',
    variacoes: ['Um lobo uiva ao longe.', 'A neve cai fina.', ''],
    saidas: { sul: 'porto', norte: 'passagem_gelo', leste: 'vale_gigantes' },
    inimigos: ['lobo_glacial', 'lobo_glacial'],
    chanceEncontro: 0.65,
  },

  passagem_gelo: {
    id: 'passagem_gelo', regiao: 'montanha', nivelMinimo: 18,
    nome: 'Passagem de Gelo',
    desc: 'Uma trilha estreita entre penhascos gelados. O vento corta como navalha.',
    variacoes: ['Gelo estala sob seus pés.', 'Uma avalanche distante.', ''],
    saidas: { sul: 'base_montanha', norte: 'caverna_gelo' },
    inimigos: ['lobo_glacial', 'golem_gelo'],
    chanceEncontro: 0.7,
  },

  caverna_gelo: {
    id: 'caverna_gelo', regiao: 'montanha', nivelMinimo: 20,
    nome: 'Caverna de Gelo',
    desc: 'Uma caverna azulada, cristais gigantes no teto. No centro, uma silhueta colossal dorme.',
    variacoes: ['Estalactites caem ao longe.', 'O ar é cortante.', ''],
    saidas: { sul: 'passagem_gelo', norte: 'pico_nevada' },
    chefe: 'gigante_gelo',
  },

  vale_gigantes: {
    id: 'vale_gigantes', regiao: 'montanha', nivelMinimo: 22,
    nome: 'Vale dos Gigantes',
    desc: 'Um vale escondido entre picos. Ossos de dragão pelo chão. Uma caverna enorme ao fundo.',
    variacoes: ['Algo enorme respira ao longe.', 'Ossos gigantescos formam arcos.', ''],
    saidas: { oeste: 'base_montanha' },
    chefe: 'chefe_gigante',
  },

  pico_nevada: {
    id: 'pico_nevada', regiao: 'montanha', nivelMinimo: 25,
    nome: 'Pico Nevada',
    desc: 'O topo do mundo. A tempestade gira sem parar. No centro, uma criatura alada dorme sobre um tesouro.',
    variacoes: ['Relâmpagos cruzam o céu.', 'O vento uiva como um dragão.', ''],
    saidas: { sul: 'caverna_gelo' },
    chefe: 'dragao_anciao',
  },

  /* ================= REGIÃO 9 — CASTELO ================= */
  castelo: {
    id: 'castelo', regiao: 'castelo', nivelMinimo: 25,
    nome: 'Castelo do Rei Antigo',
    desc: 'Um castelo negro no alto de um penhasco. Estátuas de reis petrificados alinham a entrada. Só os mais fortes passam.',
    variacoes: ['Estátuas observam você passar.', 'Tochas verdes iluminam o saguão.', ''],
    saidas: { sul: 'vale_sol', leste: 'jardins_reais', oeste: 'masmorra_castelo', norte: 'salao_trono' },
    inimigos: ['guarda_real', 'cavaleiro_negro'],
    chanceEncontro: 0.6,
  },

  jardins_reais: {
    id: 'jardins_reais', regiao: 'castelo', nivelMinimo: 26,
    nome: 'Jardins Reais',
    desc: 'Jardins abandonados, rosas negras, fontes secas. Uma estátua da rainha chora lágrimas de sangue.',
    variacoes: ['Rosas negras balançam sem vento.', 'Uma fonte seca sussurra.', ''],
    saidas: { oeste: 'castelo' },
    npc: {
      nome: 'Fantasma da Rainha',
      falas: ['"O rei... ele não é mais quem era."', '"Fuja enquanto pode."'],
    },
  },

  masmorra_castelo: {
    id: 'masmorra_castelo', regiao: 'castelo', nivelMinimo: 26,
    nome: 'Masmorras do Castelo',
    desc: 'Corredores úmidos, celas quebradas, correntes penduradas. Um cheiro de morte.',
    variacoes: ['Correntes rangem sozinhas.', 'Um grito ecoa de uma cela.', ''],
    saidas: { leste: 'castelo' },
    inimigos: ['cavaleiro_negro', 'mago_negro'],
    chanceEncontro: 0.7,
  },

  salao_trono: {
    id: 'salao_trono', regiao: 'castelo', nivelMinimo: 28,
    nome: 'Salão do Trono',
    desc: 'Um salão colossal de mármore negro. No trono, um rei esquelético com coroa de ferro.',
    variacoes: ['O trono range.', 'Chamas negras ardem nas tochas.', ''],
    saidas: { sul: 'castelo' },
    chefe: 'rei_antigo',
  },
};
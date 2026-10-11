// src/content/itens.js
export const ITENS = {
  /* ============================================================ */
  /* CONSUMÍVEIS — COMIDAS                                         */
  /* ============================================================ */
  pao:             { id: 'pao',             nome: 'Pão Caseiro',          tipo: 'consumivel', cura: 5,    preco: 3,   raridade: 'comum',    desc: 'Restaura 5 HP.' },
  carne_assada:    { id: 'carne_assada',    nome: 'Carne Assada',         tipo: 'consumivel', cura: 12,   preco: 8,   raridade: 'comum',    desc: 'Restaura 12 HP.' },
  peixe_grelhado:  { id: 'peixe_grelhado',  nome: 'Peixe Grelhado',       tipo: 'consumivel', cura: 10,   preco: 7,   raridade: 'comum',    desc: 'Restaura 10 HP.' },
  sopa_ervas:      { id: 'sopa_ervas',      nome: 'Sopa de Ervas',        tipo: 'consumivel', cura: 18,   preco: 14,  raridade: 'incomum',  desc: 'Restaura 18 HP.' },
  banquete:        { id: 'banquete',        nome: 'Banquete Real',        tipo: 'consumivel', cura: 60,   preco: 40,  raridade: 'raro',     desc: 'Restaura 60 HP.' },

  /* CONSUMÍVEIS — POÇÕES */
  pocao:           { id: 'pocao',           nome: 'Poção de Vida',        tipo: 'consumivel', cura: 15,   preco: 10,  raridade: 'comum',    desc: 'Restaura 15 HP.' },
  elixir_maior:    { id: 'elixir_maior',    nome: 'Elixir Maior',         tipo: 'consumivel', cura: 40,   preco: 25,  raridade: 'incomum',  desc: 'Restaura 40 HP.' },
  panaceia:        { id: 'panaceia',        nome: 'Panaceia',             tipo: 'consumivel', cura: 999,  preco: 90,  raridade: 'raro',     desc: 'Restaura TODO o HP.' },
  antidoto:        { id: 'antidoto',        nome: 'Antídoto',             tipo: 'consumivel', cura: 8,    preco: 15,  raridade: 'incomum',  desc: 'Restaura 8 HP e limpa venenos.' },
  elixir_mana:     { id: 'elixir_mana',     nome: 'Elixir de Mana',       tipo: 'consumivel', mana: 20,   preco: 18,  raridade: 'incomum',  desc: 'Restaura 20 MP.' },
  elixir_mana_g:   { id: 'elixir_mana_g',   nome: 'Elixir de Mana Maior', tipo: 'consumivel', mana: 50,   preco: 45,  raridade: 'raro',     desc: 'Restaura 50 MP.' },
  pocao_forca:     { id: 'pocao_forca',     nome: 'Poção da Força',       tipo: 'consumivel', buff: 'forca',      preco: 30,  raridade: 'raro',     desc: 'Aplica Força (3 turnos).' },
  pocao_defesa:    { id: 'pocao_defesa',    nome: 'Poção de Ferro',       tipo: 'consumivel', buff: 'forca_def',  preco: 30,  raridade: 'raro',     desc: 'Aplica +5 DEF (3 turnos).' },
  pocao_regeneracao:{id:'pocao_regeneracao',nome: 'Poção de Regeneração', tipo: 'consumivel', buff: 'regeneracao',preco: 40,  raridade: 'raro',     desc: 'Aplica Regeneração (5 turnos).' },
  pocao_velocidade:{ id: 'pocao_velocidade',nome: 'Poção de Velocidade',  tipo: 'consumivel', cura: 5,    preco: 35,  raridade: 'raro',     desc: 'Aplica efeito de esquiva (+2 turnos).' },
  bomba_fumaca:    { id: 'bomba_fumaca',    nome: 'Bomba de Fumaça',      tipo: 'consumivel', preco: 20,  raridade: 'incomum',  desc: 'Fuga garantida em combate.' },
  frasco_acido:    { id: 'frasco_acido',    nome: 'Frasco de Ácido',      tipo: 'consumivel', preco: 25,  raridade: 'incomum',  desc: 'Causa 12 de dano sem errar.' },

  /* CONSUMÍVEIS — PERGAMINHOS */
  pergaminho_fogo:  { id: 'pergaminho_fogo',  nome: 'Pergaminho de Fogo',  tipo: 'consumivel', magia: 'bola_fogo', preco: 30, raridade: 'raro',  desc: 'Lança Bola de Fogo (sem gastar mana).' },
  pergaminho_gelo:  { id: 'pergaminho_gelo',  nome: 'Pergaminho de Gelo',  tipo: 'consumivel', magia: 'toque_gelido', preco: 25, raridade: 'raro',  desc: 'Lança Toque Gélido.' },
  pergaminho_raio:  { id: 'pergaminho_raio',  nome: 'Pergaminho de Raio',  tipo: 'consumivel', magia: 'raio', preco: 28, raridade: 'raro',  desc: 'Lança Raio.' },
  pergaminho_cura:  { id: 'pergaminho_cura',  nome: 'Pergaminho de Cura',  tipo: 'consumivel', cura: 30, preco: 22, raridade: 'incomum', desc: 'Restaura 30 HP.' },

  /* ============================================================ */
  /* ARMAS — ADAGAS                                                */
  /* ============================================================ */
  punhal_ferro:    { id: 'punhal_ferro',   nome: 'Punhal de Ferro',        tipo: 'arma', atk: 2,  preco: 12,  raridade: 'comum',    desc: '+2 ATK. Discreto.' },
  adaga:           { id: 'adaga',          nome: 'Adaga',                  tipo: 'arma', atk: 2,  preco: 15,  raridade: 'comum',    desc: '+2 ATK. Leve e rápida.' },
  adaga_venenosa:  { id: 'adaga_venenosa', nome: 'Adaga Venenosa',         tipo: 'arma', atk: 4,  preco: 90,  raridade: 'raro',     desc: '+4 ATK. Rastro verde na lâmina.' },
  punhal_sombrio:  { id: 'punhal_sombrio', nome: 'Punhal Sombrio',         tipo: 'arma', atk: 6,  preco: 180, raridade: 'epico',    desc: '+6 ATK. Absorve luz.' },
  adaga_mitica:    { id: 'adaga_mitica',   nome: 'Lágrima da Noite',       tipo: 'arma', atk: 9,  preco: 400, raridade: 'mitico',   desc: '+9 ATK. Feita de estrela caída.' },

  /* ARMAS — ESPADAS */
  espada_curta:    { id: 'espada_curta',   nome: 'Espada Curta',           tipo: 'arma', atk: 3,  preco: 25,  raridade: 'comum',    desc: '+3 ATK. Padrão de milícia.' },
  espada_longa:    { id: 'espada_longa',   nome: 'Espada Longa',           tipo: 'arma', atk: 4,  preco: 40,  raridade: 'comum',    desc: '+4 ATK. Aço confiável.' },
  espada_bastarda: { id: 'espada_bastarda',nome: 'Espada Bastarda',        tipo: 'arma', atk: 6,  preco: 75,  raridade: 'incomum',  desc: '+6 ATK. Uma ou duas mãos.' },
  florete:         { id: 'florete',        nome: 'Florete',                tipo: 'arma', atk: 5,  preco: 70,  raridade: 'incomum',  desc: '+5 ATK. Preciso e rápido.' },
  rapiera:         { id: 'rapiera',        nome: 'Rapieira',               tipo: 'arma', atk: 6,  preco: 95,  raridade: 'incomum',  desc: '+6 ATK. A lâmina dos duelistas.' },
  katana:          { id: 'katana',         nome: 'Katana',                 tipo: 'arma', atk: 7,  preco: 140, raridade: 'raro',     desc: '+7 ATK. Fio dobrado mil vezes.' },
  montante:        { id: 'montante',       nome: 'Montante',               tipo: 'arma', atk: 8,  preco: 130, raridade: 'raro',     desc: '+8 ATK. Lâmina enorme.' },
  espada_carmesim:{ id: 'espada_carmesim', nome: 'Espada Carmesim',        tipo: 'arma', atk: 9,  preco: 220, raridade: 'epico',    desc: '+9 ATK. Sede de sangue.' },
  espada_runa:     { id: 'espada_runa',    nome: 'Espada Rúnica',          tipo: 'arma', atk: 10, preco: 260, raridade: 'epico',    desc: '+10 ATK. Runas brilham ao atacar.' },
  espada_sagrada:  { id: 'espada_sagrada', nome: 'Espada Sagrada',         tipo: 'arma', atk: 11, preco: 320, raridade: 'epico',    desc: '+11 ATK. Abençoada pelos deuses.' },
  lamina_alvorada:{ id: 'lamina_alvorada', nome: 'Lâmina da Alvorada',     tipo: 'arma', atk: 12, preco: 400, raridade: 'lendario', desc: '+12 ATK. Forjada com luz.' },
  espada_vorpal:   { id: 'espada_vorpal',  nome: 'Espada Vorpal',          tipo: 'arma', atk: 14, preco: 550, raridade: 'lendario', desc: '+14 ATK. Corta pescoços.' },
  espada_caos:     { id: 'espada_caos',    nome: 'Lâmina do Caos',         tipo: 'arma', atk: 18, preco: 900, raridade: 'mitico',   desc: '+18 ATK. Muda de forma sozinha.' },

  /* ARMAS — MACHADOS */
  machado_batalha: { id: 'machado_batalha',nome: 'Machado de Batalha',     tipo: 'arma', atk: 6,  preco: 60,  raridade: 'incomum',  desc: '+6 ATK. Pesado e brutal.' },
  machado_anao:    { id: 'machado_anao',   nome: 'Machado Anão',           tipo: 'arma', atk: 7,  preco: 95,  raridade: 'incomum',  desc: '+7 ATK. Forjado em pedra.' },
  machado_guerra:  { id: 'machado_guerra', nome: 'Machado de Guerra',      tipo: 'arma', atk: 8,  preco: 110, raridade: 'raro',     desc: '+8 ATK. Quebra escudos.' },
  machado_duplo:   { id: 'machado_duplo',  nome: 'Machado Duplo',          tipo: 'arma', atk: 9,  preco: 170, raridade: 'epico',    desc: '+9 ATK. Duas lâminas girando.' },
  machado_runico:  { id: 'machado_runico', nome: 'Machado Rúnico',         tipo: 'arma', atk: 11, preco: 250, raridade: 'epico',    desc: '+11 ATK. Runas cantam sangue.' },
  machado_executor:{ id: 'machado_executor',nome:'Machado do Executor',    tipo: 'arma', atk: 13, preco: 420, raridade: 'lendario', desc: '+13 ATK. Já cortou mil cabeças.' },

  /* ARMAS — MARTELOS */
  maca_ferro:      { id: 'maca_ferro',     nome: 'Maça de Ferro',          tipo: 'arma', atk: 5,  preco: 45,  raridade: 'comum',    desc: '+5 ATK. Simples e brutal.' },
  martelo_guerra:  { id: 'martelo_guerra', nome: 'Martelo de Guerra',      tipo: 'arma', atk: 7,  preco: 120, raridade: 'raro',     desc: '+7 ATK. Amassa elmos.' },
  martelo_anao:    { id: 'martelo_anao',   nome: 'Martelo Anão',           tipo: 'arma', atk: 9,  preco: 200, raridade: 'epico',    desc: '+9 ATK. Símbolo de reis.' },
  martelo_trovao:  { id: 'martelo_trovao', nome: 'Martelo do Trovão',      tipo: 'arma', atk: 12, preco: 380, raridade: 'lendario', desc: '+12 ATK. Faíscas a cada golpe.' },

  /* ARMAS — LANÇAS */
  lanca:           { id: 'lanca',          nome: 'Lança',                  tipo: 'arma', atk: 5,  preco: 55,  raridade: 'incomum',  desc: '+5 ATK. Alcance é vantagem.' },
  alabarda:        { id: 'alabarda',       nome: 'Alabarda',               tipo: 'arma', atk: 7,  preco: 110, raridade: 'raro',     desc: '+7 ATK. Arma de guarda real.' },
  lanca_cavalaria: { id: 'lanca_cavalaria',nome: 'Lança de Cavalaria',     tipo: 'arma', atk: 9,  preco: 190, raridade: 'epico',    desc: '+9 ATK. Longa e imponente.' },
  tridente:        { id: 'tridente',       nome: 'Tridente',               tipo: 'arma', atk: 10, preco: 230, raridade: 'epico',    desc: '+10 ATK. Arma dos mares.' },
  lanca_sagrada:   { id: 'lanca_sagrada',  nome: 'Lança Sagrada',          tipo: 'arma', atk: 13, preco: 400, raridade: 'lendario', desc: '+13 ATK. Perfura trevas.' },

  /* ARMAS — CAJADOS */
  cajado_carvalho: { id: 'cajado_carvalho',nome: 'Cajado de Carvalho',     tipo: 'arma', atk: 3,  preco: 30,  raridade: 'comum',    desc: '+3 ATK. Canaliza magia.' },
  cajado_arcano:   { id: 'cajado_arcano',  nome: 'Cajado Arcano',          tipo: 'arma', atk: 6,  preco: 130, raridade: 'raro',     desc: '+6 ATK. Cristal azul.' },
  cajado_negro:    { id: 'cajado_negro',   nome: 'Cajado Negro',           tipo: 'arma', atk: 8,  preco: 210, raridade: 'epico',    desc: '+8 ATK. Feito de ossos.' },
  cajado_lunar:    { id: 'cajado_lunar',   nome: 'Cajado Lunar',           tipo: 'arma', atk: 10, preco: 310, raridade: 'epico',    desc: '+10 ATK. Brilha na lua cheia.' },
  cajado_elemental:{ id: 'cajado_elemental',nome:'Cajado Elemental',       tipo: 'arma', atk: 13, preco: 500, raridade: 'lendario', desc: '+13 ATK. Controla os 4 elementos.' },

  /* ARMAS — ARCOS */
  arco_curto:      { id: 'arco_curto',     nome: 'Arco Curto',             tipo: 'arma', atk: 4,  preco: 45,  raridade: 'comum',    desc: '+4 ATK. Bom para caça.' },
  arco_longo:      { id: 'arco_longo',     nome: 'Arco Longo',             tipo: 'arma', atk: 6,  preco: 95,  raridade: 'incomum',  desc: '+6 ATK. Alcance impressionante.' },
  arco_composito:  { id: 'arco_composito', nome: 'Arco Composto',          tipo: 'arma', atk: 8,  preco: 180, raridade: 'epico',    desc: '+8 ATK. Curvado com tendões.' },
  arco_elfico:     { id: 'arco_elfico',    nome: 'Arco Élfico',            tipo: 'arma', atk: 10, preco: 280, raridade: 'epico',    desc: '+10 ATK. Leve como o vento.' },
  besta_leve:      { id: 'besta_leve',     nome: 'Besta Leve',             tipo: 'arma', atk: 6,  preco: 120, raridade: 'raro',     desc: '+6 ATK. Recarga rápida.' },
  besta_pesada:    { id: 'besta_pesada',   nome: 'Besta Pesada',           tipo: 'arma', atk: 9,  preco: 220, raridade: 'epico',    desc: '+9 ATK. Perfura armaduras.' },

  /* ARMAS — DIVERSAS */
  clava:           { id: 'clava',          nome: 'Clava de Madeira',        tipo: 'arma', atk: 2,  preco: 12,  raridade: 'comum',    desc: '+2 ATK. Tosca, mas eficaz.' },
  luvas_ferro:     { id: 'luvas_ferro',    nome: 'Manoplas de Ferro',       tipo: 'arma', atk: 4,  preco: 50,  raridade: 'comum',    desc: '+4 ATK. Soco pesado.' },
  chakram:         { id: 'chakram',        nome: 'Chakram',                 tipo: 'arma', atk: 7,  preco: 140, raridade: 'raro',     desc: '+7 ATK. Disco afiado.' },
  foice_ceifadora: { id: 'foice_ceifadora',nome: 'Foice Ceifadora',         tipo: 'arma', atk: 12, preco: 340, raridade: 'lendario', desc: '+12 ATK. Colhe almas.' },

  /* ============================================================ */
  /* ESCUDOS                                                       */
  /* ============================================================ */
  broquel:         { id: 'broquel',        nome: 'Broquel',                 tipo: 'escudo', def: 1,  preco: 15,  raridade: 'comum',    desc: '+1 DEF. Pequeno, para duelos.' },
  escudo_madeira:  { id: 'escudo_madeira', nome: 'Escudo de Madeira',       tipo: 'escudo', def: 3,  preco: 30,  raridade: 'comum',    desc: '+3 DEF. Bordas de ferro.' },
  escudo_ferro:    { id: 'escudo_ferro',   nome: 'Escudo de Ferro',         tipo: 'escudo', def: 5,  preco: 70,  raridade: 'incomum',  desc: '+5 DEF. Sólido como parede.' },
  escudo_aco:      { id: 'escudo_aco',     nome: 'Escudo de Aço',           tipo: 'escudo', def: 6,  preco: 110, raridade: 'incomum',  desc: '+6 DEF. Polido e leve.' },
  escudo_torre:    { id: 'escudo_torre',   nome: 'Escudo Torre',            tipo: 'escudo', def: 8,  preco: 160, raridade: 'raro',     desc: '+8 DEF. Cobre o corpo todo.' },
  escudo_elfico:   { id: 'escudo_elfico',  nome: 'Escudo Élfico',           tipo: 'escudo', def: 9,  preco: 240, raridade: 'epico',    desc: '+9 DEF. Feito de luz.' },
  escudo_dragao:   { id: 'escudo_dragao',  nome: 'Escudo de Escamas',       tipo: 'escudo', def: 11, preco: 380, raridade: 'lendario', desc: '+11 DEF. Escamas de dragão.' },
  egide:           { id: 'egide',          nome: 'Égide',                   tipo: 'escudo', def: 14, preco: 550, raridade: 'mitico',   desc: '+14 DEF. Escudo dos deuses.' },

  /* ============================================================ */
  /* ELMOS                                                         */
  /* ============================================================ */
  capuz_couro:     { id: 'capuz_couro',    nome: 'Capuz de Couro',          tipo: 'elmo', def: 1,  preco: 12,  raridade: 'comum',    desc: '+1 DEF. Discreto.' },
  capuz_mago:      { id: 'capuz_mago',     nome: 'Capuz de Mago',           tipo: 'elmo', def: 2,  preco: 30,  raridade: 'comum',    desc: '+2 DEF. Bordado de estrelas.' },
  elmo_ferro:      { id: 'elmo_ferro',     nome: 'Elmo de Ferro',           tipo: 'elmo', def: 3,  preco: 40,  raridade: 'comum',    desc: '+3 DEF. Padrão de soldado.' },
  elmo_aco:        { id: 'elmo_aco',       nome: 'Elmo de Aço',             tipo: 'elmo', def: 5,  preco: 90,  raridade: 'incomum',  desc: '+5 DEF. Polido e resistente.' },
  elmo_torre:      { id: 'elmo_torre',     nome: 'Elmo Torre',              tipo: 'elmo', def: 6,  preco: 130, raridade: 'incomum',  desc: '+6 DEF. Protege o rosto.' },
  capacete_barbaro:{ id: 'capacete_barbaro',nome:'Capacete Bárbaro',         tipo: 'elmo', def: 7,  preco: 150, raridade: 'raro',     desc: '+7 DEF. Chifres nas laterais.' },
  diadema_elfico:  { id: 'diadema_elfico', nome: 'Diadema Élfico',          tipo: 'elmo', def: 8,  atk: 2, preco: 280, raridade: 'epico', desc: '+8 DEF, +2 ATK. Coroa leve.' },
  elmo_dragao:     { id: 'elmo_dragao',    nome: 'Elmo de Dragão',          tipo: 'elmo', def: 11, preco: 400, raridade: 'lendario', desc: '+11 DEF. Escamas vermelhas.' },
  coroa_rei:       { id: 'coroa_rei',      nome: 'Coroa do Rei Antigo',     tipo: 'elmo', def: 9,  preco: 300, raridade: 'epico',    desc: '+9 DEF. Peso da realeza.' },
  elmo_mitico:     { id: 'elmo_mitico',    nome: 'Coroa Celestial',         tipo: 'elmo', def: 15, preco: 700, raridade: 'mitico',   desc: '+15 DEF. Coroa dos imortais.' },

  /* ============================================================ */
  /* ARMADURAS                                                     */
  /* ============================================================ */
  tunica_mago:     { id: 'tunica_mago',    nome: 'Túnica de Mago',          tipo: 'armadura', def: 1,  preco: 20,  raridade: 'comum',    desc: '+1 DEF. Fios encantados.' },
  tunica_arcana:   { id: 'tunica_arcana',  nome: 'Túnica Arcana',           tipo: 'armadura', def: 4,  preco: 120, raridade: 'raro',     desc: '+4 DEF. Brilha sob a lua.' },
  armadura_couro:  { id: 'armadura_couro', nome: 'Armadura de Couro',       tipo: 'armadura', def: 2,  preco: 25,  raridade: 'comum',    desc: '+2 DEF. Simples e eficaz.' },
  armadura_estudada:{id:'armadura_estudada',nome:'Couro Batido',            tipo: 'armadura', def: 3,  preco: 45,  raridade: 'comum',    desc: '+3 DEF. Reforçado com rebites.' },
  cota_malha:      { id: 'cota_malha',     nome: 'Cota de Malha',           tipo: 'armadura', def: 6,  preco: 70,  raridade: 'incomum',  desc: '+6 DEF. Proteção de verdade.' },
  cota_elfica:     { id: 'cota_elfica',    nome: 'Cota Élfica',             tipo: 'armadura', def: 7,  preco: 180, raridade: 'raro',     desc: '+7 DEF. Leve como seda.' },
  cota_anao:       { id: 'cota_anao',      nome: 'Cota Anã',                tipo: 'armadura', def: 8,  preco: 200, raridade: 'epico',    desc: '+8 DEF. Forjada em runas.' },
  armadura_placas: { id: 'armadura_placas',nome: 'Armadura de Placas',      tipo: 'armadura', def: 9,  preco: 150, raridade: 'raro',     desc: '+9 DEF. Metal pesado.' },
  manto_sombrio:   { id: 'manto_sombrio',  nome: 'Manto Sombrio',           tipo: 'armadura', def: 8,  preco: 140, raridade: 'raro',     desc: '+8 DEF. Absorve luz.' },
  armadura_adamante:{id:'armadura_adamante',nome:'Armadura de Adamante',    tipo: 'armadura', def: 12, preco: 350, raridade: 'epico',    desc: '+12 DEF. Metal lendário.' },
  tunica_estelar:  { id: 'tunica_estelar', nome: 'Túnica Estelar',          tipo: 'armadura', def: 11, atk: 2, preco: 380, raridade: 'lendario', desc: '+11 DEF, +2 ATK. Tecida em sonhos.' },
  armadura_dragao: { id: 'armadura_dragao',nome: 'Armadura de Escamas de Dragão', tipo: 'armadura', def: 14, preco: 500, raridade: 'lendario', desc: '+14 DEF. Escamas vermelhas.' },
  armadura_titan:  { id: 'armadura_titan', nome: 'Armadura do Titã',        tipo: 'armadura', def: 18, preco: 800, raridade: 'mitico',   desc: '+18 DEF. Forjada por gigantes.' },

  /* ============================================================ */
  /* BOTAS                                                         */
  /* ============================================================ */
  sandalias:       { id: 'sandalias',      nome: 'Sandálias',               tipo: 'botas', def: 1,  preco: 8,   raridade: 'comum',    desc: '+1 DEF. Leves.' },
  botas_couro:     { id: 'botas_couro',    nome: 'Botas de Couro',          tipo: 'botas', def: 2,  preco: 30,  raridade: 'comum',    desc: '+2 DEF. Confortáveis.' },
  botas_aventureiro:{id:'botas_aventureiro',nome:'Botas do Aventureiro',    tipo: 'botas', def: 3,  preco: 65,  raridade: 'incomum',  desc: '+3 DEF. Couro reforçado.' },
  grevas_ferro:    { id: 'grevas_ferro',   nome: 'Grevas de Ferro',         tipo: 'botas', def: 4,  preco: 80,  raridade: 'incomum',  desc: '+4 DEF. Protegem até os joelhos.' },
  botas_velocidade:{ id: 'botas_velocidade',nome:'Botas da Velocidade',     tipo: 'botas', def: 3,  preco: 180, raridade: 'raro',     desc: '+3 DEF. Sente o chão passar rápido.' },
  botas_silenciosas:{id:'botas_silenciosas',nome:'Botas Silenciosas',       tipo: 'botas', def: 4,  preco: 160, raridade: 'raro',     desc: '+4 DEF. Não faz som.' },
  botas_aladas:    { id: 'botas_aladas',   nome: 'Botas Aladas',            tipo: 'botas', def: 7,  preco: 350, raridade: 'epico',    desc: '+7 DEF. Salta abismos.' },
  botas_miticas:   { id: 'botas_miticas',  nome: 'Botas do Corredor',       tipo: 'botas', def: 10, preco: 600, raridade: 'mitico',   desc: '+10 DEF. Corre sobre as nuvens.' },

  /* ============================================================ */
  /* ANÉIS                                                         */
  /* ============================================================ */
  anel_cobre:      { id: 'anel_cobre',     nome: 'Anel de Cobre',           tipo: 'anel', def: 1,  preco: 20,  raridade: 'comum',    desc: '+1 DEF. Barato e humilde.' },
  anel_prata:      { id: 'anel_prata',     nome: 'Anel de Prata',           tipo: 'anel', def: 2,  preco: 50,  raridade: 'comum',    desc: '+2 DEF. Polido.' },
  anel_ouro:       { id: 'anel_ouro',      nome: 'Anel de Ouro',            tipo: 'anel', def: 3,  preco: 90,  raridade: 'incomum',  desc: '+3 DEF. Cobiçado.' },
  anel_protecao:   { id: 'anel_protecao',  nome: 'Anel de Proteção',        tipo: 'anel', def: 3,  preco: 80,  raridade: 'incomum',  desc: '+3 DEF. Pedra negra.' },
  anel_forca:      { id: 'anel_forca',     nome: 'Anel da Força',           tipo: 'anel', atk: 3,  preco: 80,  raridade: 'incomum',  desc: '+3 ATK. Sente poder.' },
  anel_arcano:     { id: 'anel_arcano',    nome: 'Anel Arcano',             tipo: 'anel', atk: 2,  def: 2, preco: 130, raridade: 'raro', desc: '+2 ATK, +2 DEF.' },
  anel_regeneracao:{ id: 'anel_regeneracao',nome:'Anel da Regeneração',     tipo: 'anel', def: 4,  preco: 180, raridade: 'raro',     desc: '+4 DEF. Cura lentamente.' },
  anel_mana:       { id: 'anel_mana',      nome: 'Anel de Mana',            tipo: 'anel', def: 3,  preco: 160, raridade: 'raro',     desc: '+3 DEF. Reserva de mana.' },
  anel_titan:      { id: 'anel_titan',     nome: 'Anel do Titã',            tipo: 'anel', atk: 5,  def: 5, preco: 350, raridade: 'epico', desc: '+5 ATK, +5 DEF.' },
  anel_selvagem:   { id: 'anel_selvagem',  nome: 'Anel Selvagem',           tipo: 'anel', atk: 6,  def: 3, preco: 320, raridade: 'epico', desc: '+6 ATK, +3 DEF.' },
  anel_imortal:    { id: 'anel_imortal',   nome: 'Anel do Imortal',         tipo: 'anel', atk: 8,  def: 8, preco: 750, raridade: 'mitico', desc: '+8 ATK, +8 DEF.' },

  /* ============================================================ */
  /* COLARES                                                       */
  /* ============================================================ */
  amuleto_sorte:   { id: 'amuleto_sorte',  nome: 'Amuleto da Sorte',        tipo: 'colar', def: 3,  preco: 80,  raridade: 'incomum',  desc: '+3 DEF. Traz sorte.' },
  colar_vitalidade:{ id: 'colar_vitalidade',nome:'Colar da Vitalidade',     tipo: 'colar', def: 4,  preco: 110, raridade: 'incomum',  desc: '+4 DEF. Pulso quente.' },
  colar_mana:      { id: 'colar_mana',     nome: 'Colar de Mana',           tipo: 'colar', def: 4,  preco: 140, raridade: 'raro',     desc: '+4 DEF. Cristais azuis.' },
  pingente_dragao: { id: 'pingente_dragao',nome: 'Pingente do Dragão',      tipo: 'colar', atk: 3,  def: 4, preco: 220, raridade: 'raro', desc: '+3 ATK, +4 DEF.' },
  colar_coracao:   { id: 'colar_coracao',  nome: 'Colar do Coração',        tipo: 'colar', def: 6,  preco: 260, raridade: 'epico',    desc: '+6 DEF. Bate como um segundo coração.' },
  colar_tempo:     { id: 'colar_tempo',    nome: 'Colar do Tempo',          tipo: 'colar', atk: 4,  def: 5, preco: 380, raridade: 'epico', desc: '+4 ATK, +5 DEF. Ampulheta no peito.' },
  colar_estrelas:  { id: 'colar_estrelas', nome: 'Colar das Estrelas',      tipo: 'colar', atk: 5,  def: 6, preco: 420, raridade: 'epico', desc: '+5 ATK, +6 DEF. Fios de luz.' },
  colar_deuses:    { id: 'colar_deuses',   nome: 'Colar dos Deuses',        tipo: 'colar', atk: 7,  def: 9, preco: 800, raridade: 'mitico', desc: '+7 ATK, +9 DEF. Só os eleitos usam.' },

  /* ============================================================ */
  /* CAPAS                                                         */
  /* ============================================================ */
  capa_viagem:     { id: 'capa_viagem',    nome: 'Capa de Viagem',          tipo: 'capa', def: 1,  preco: 15,  raridade: 'comum',    desc: '+1 DEF. Esquenta nas noites frias.' },
  capa_elfica:     { id: 'capa_elfica',    nome: 'Capa Élfica',             tipo: 'capa', def: 3,  preco: 90,  raridade: 'incomum',  desc: '+3 DEF. Muda de cor.' },
  capa_sombria:    { id: 'capa_sombria',   nome: 'Capa Sombria',            tipo: 'capa', def: 4,  preco: 150, raridade: 'raro',     desc: '+4 DEF. Absorve luz.' },
  capa_invisibilidade:{id:'capa_invisibilidade',nome:'Capa da Invisibilidade',tipo:'capa', def: 4, preco: 250, raridade: 'raro',   desc: '+4 DEF. Quase some nas sombras.' },
  capa_elemental:  { id: 'capa_elemental', nome: 'Capa Elemental',          tipo: 'capa', def: 6,  preco: 280, raridade: 'epico',    desc: '+6 DEF. Resistente a magias.' },
  manto_real:      { id: 'manto_real',     nome: 'Manto Real',              tipo: 'capa', def: 8,  atk: 2, preco: 400, raridade: 'lendario', desc: '+8 DEF, +2 ATK. Arminho e ouro.' },
  capa_dragao:     { id: 'capa_dragao',    nome: 'Manto do Dragão',         tipo: 'capa', def: 11, preco: 650, raridade: 'lendario', desc: '+11 DEF. Feito de asas.' },
  capa_mitica:     { id: 'capa_mitica',    nome: 'Manto das Sombras',       tipo: 'capa', def: 14, preco: 900, raridade: 'mitico',   desc: '+14 DEF. Você é intocável.' },

  /* ============================================================ */
  /* MATERIAIS                                                     */
  /* ============================================================ */
  madeira:         { id: 'madeira',        nome: 'Madeira Bruta',           tipo: 'material', preco: 2,   raridade: 'comum',    desc: 'Material. Crafting.' },
  couro:           { id: 'couro',          nome: 'Couro Curtido',           tipo: 'material', preco: 4,   raridade: 'comum',    desc: 'Material. Crafting.' },
  osso:            { id: 'osso',           nome: 'Osso Antigo',             tipo: 'material', preco: 3,   raridade: 'comum',    desc: 'Material. Crafting.' },
  ferro:           { id: 'ferro',          nome: 'Minério de Ferro',        tipo: 'material', preco: 6,   raridade: 'comum',    desc: 'Material. Crafting.' },
  aco:             { id: 'aco',            nome: 'Barra de Aço',            tipo: 'material', preco: 15,  raridade: 'incomum',  desc: 'Material. Crafting avançado.' },
  pele_lobo:       { id: 'pele_lobo',      nome: 'Pele de Lobo',            tipo: 'material', preco: 5,   raridade: 'comum',    desc: 'Material. Crafting.' },
  presa_lobo:      { id: 'presa_lobo',     nome: 'Presa de Lobo',           tipo: 'material', preco: 4,   raridade: 'comum',    desc: 'Material. Crafting.' },
  teia_aranha:     { id: 'teia_aranha',    nome: 'Teia de Aranha',          tipo: 'material', preco: 7,   raridade: 'comum',    desc: 'Material. Resistente e pegajosa.' },
  cristal:         { id: 'cristal',        nome: 'Cristal Arcano',          tipo: 'material', preco: 25,  raridade: 'incomum',  desc: 'Material. Brilha fracamente.' },
  essencia_magica: { id: 'essencia_magica',nome: 'Essência Mágica',         tipo: 'material', preco: 45,  raridade: 'raro',     desc: 'Material. Poder concentrado.' },
  gema_rubi:       { id: 'gema_rubi',      nome: 'Rubi',                    tipo: 'material', preco: 60,  raridade: 'raro',     desc: 'Gema. Encantamentos de fogo/força.' },
  gema_safira:     { id: 'gema_safira',    nome: 'Safira',                  tipo: 'material', preco: 60,  raridade: 'raro',     desc: 'Gema. Encantamentos de gelo/sagrado.' },
  gema_esmeralda:  { id: 'gema_esmeralda', nome: 'Esmeralda',               tipo: 'material', preco: 80,  raridade: 'epico',    desc: 'Gema. Encantamentos de veneno.' },
  gema_diamante:   { id: 'gema_diamante',  nome: 'Diamante',                tipo: 'material', preco: 150, raridade: 'epico',    desc: 'Gema. Encantamentos supremos.' },
  escama_dragao:   { id: 'escama_dragao',  nome: 'Escama de Dragão',        tipo: 'material', preco: 200, raridade: 'lendario', desc: 'Material. Forja de itens lendários.' },
  coracao_dragao:  { id: 'coracao_dragao', nome: 'Coração de Dragão',       tipo: 'material', preco: 500, raridade: 'mitico',   desc: 'Material. Ainda bate.' },

  /* ============================================================ */
  /* RELÍQUIAS E CHAVES (uso narrativo/futuro)                     */
  /* ============================================================ */
  chave_antiga:    { id: 'chave_antiga',   nome: 'Chave Antiga',            tipo: 'material', preco: 40,  raridade: 'raro',     desc: 'Abre algo antigo. Onde?' },
  mapa_tesouro:    { id: 'mapa_tesouro',   nome: 'Mapa do Tesouro',         tipo: 'material', preco: 80,  raridade: 'raro',     desc: 'X marca o lugar.' },
  reliquia_sol:    { id: 'reliquia_sol',   nome: 'Relíquia do Sol',         tipo: 'material', preco: 120, raridade: 'epico',    desc: 'Fragmento do deus Sol.' },
  olho_serpente:   { id: 'olho_serpente',  nome: 'Olho de Serpente',        tipo: 'material', preco: 90,  raridade: 'raro',     desc: 'Ainda se move.' },
  sangue_dragao:   { id: 'sangue_dragao',  nome: 'Sangue de Dragão',        tipo: 'material', preco: 250, raridade: 'epico',    desc: 'Ferve em contato com o ar.' },
  coroa_quebrada:  { id: 'coroa_quebrada', nome: 'Coroa Quebrada',          tipo: 'material', preco: 300, raridade: 'epico',    desc: 'De um rei esquecido.' },
  fragmento_estelar:{id:'fragmento_estelar',nome:'Fragmento Estelar',       tipo: 'material', preco: 400, raridade: 'lendario', desc: 'Pedra caída do céu.' },
  nucleo_magico:   { id: 'nucleo_magico',  nome: 'Núcleo Mágico',           tipo: 'material', preco: 600, raridade: 'mitico',   desc: 'Pulsação de pura magia.' },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const normalizar = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export function acharItem(arg) {
  const alvo = normalizar(arg);
  if (!alvo) return null;
  if (ITENS[alvo]) return ITENS[alvo];
  const lista = Object.values(ITENS);
  return (
    lista.find((i) => normalizar(i.id) === alvo) ||
    lista.find((i) => normalizar(i.nome) === alvo) ||
    lista.find((i) => normalizar(i.nome).includes(alvo)) ||
    lista.find((i) => normalizar(i.id).includes(alvo)) ||
    null
  );
}

export const precoVenda = (item) => Math.max(1, Math.floor(item.preco / 2));

export const SLOTS_EQUIP = ['arma', 'escudo', 'elmo', 'armadura', 'botas', 'anel', 'colar', 'capa'];

export const COR_RARIDADE = {
  comum:    'var(--texto)',
  incomum:  'var(--verde)',
  raro:     'var(--azul)',
  epico:    'var(--roxo)',
  lendario: 'var(--amarelo)',
  mitico:   '#ff9f43',
};

/* Helper: retorna apenas itens de uma categoria */
export function itensPorTipo(tipo) {
  return Object.values(ITENS).filter((i) => i.tipo === tipo);
}

/* Helper: retorna itens por raridade */
export function itensPorRaridade(raridade) {
  return Object.values(ITENS).filter((i) => i.raridade === raridade);
}
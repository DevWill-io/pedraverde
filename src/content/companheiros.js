// src/content/companheiros.js
export const COMPANHEIROS = {
  lira: {
    id: 'lira',
    nome: 'Lira',
    emoji: '🗡',
    classe: 'Ladina',
    local: 'ruinas',
    precisaFlag: 'derrotou_ogro',
    nivelMinimo: 7,
    hpMax: 30,
    atk: 14,
    def: 4,
    magias: ['ataque_furtivo'],
    desc: 'Uma jovem de capuz verde e sorriso torto. Rápida, sarcástica e mortífera.',
    recrutamento: [
      '"Então você derrotou o Ogro. Impressionante, mas não se acostume."',
      '"Não tenho pra onde ir. Se me deixar ir junto, eu cuido das suas costas."',
      '"Só não me chame de parceira. Ainda."',
    ],
    falasCombate: [
      '"Nas costas, vai!"',
      '"Lento demais."',
      '"Eu avisei que era fácil."',
    ],
  },
  borin: {
    id: 'borin',
    nome: 'Borin',
    emoji: '🛡',
    classe: 'Guerreiro Anão',
    local: 'fortaleza_bandido',
    precisaFlag: 'derrotou_rei_bandido',
    nivelMinimo: 9,
    hpMax: 60,
    atk: 12,
    def: 12,
    magias: [],
    desc: 'Anão de barba ruiva e martelo enorme. Fala pouco, mas quando fala, é pra reclamar.',
    recrutamento: [
      '"Você matou aquele ladrão de coroa. Bem feito."',
      '"A minha vila foi destruída por bandidos como esses. Eu devo uma."',
      '"Vou com você. Mas se reclamar do meu ronco, eu volto."',
    ],
    falasCombate: [
      '"Toma!"',
      '"Isso é tudo que você tem?"',
      '"Pela barba do meu avô..."',
    ],
  },
  elyra: {
    id: 'elyra',
    nome: 'Elyra',
    emoji: '✨',
    classe: 'Clériga Élfica',
    local: 'templo_sol',
    precisaFlag: null,
    nivelMinimo: 10,
    hpMax: 40,
    atk: 10,
    def: 8,
    magias: ['cura', 'bencao'],
    desc: 'Uma elfa de cabelo prateado e vestes douradas. Fala baixo, olha longe.',
    recrutamento: [
      '"As sombras crescem no mundo. Eu sinto."',
      '"Permita-me caminhar ao seu lado. Posso curar suas feridas."',
      '"Não sou guerreira, mas meus deuses são."',
    ],
    falasCombate: [
      '"Que a luz te proteja."',
      '"Ainda não é sua hora."',
      '"Sinto muito pelo que virá."',
    ],
  },
  kael: {
    id: 'kael',
    nome: 'Kael',
    emoji: '🔮',
    classe: 'Mago',
    local: 'base_montanha',
    precisaFlag: null,
    nivelMinimo: 15,
    hpMax: 35,
    atk: 16,
    def: 5,
    magias: ['bola_fogo', 'raio'],
    desc: 'Um mago alto e pálido, envolto num manto azul. Fala em enigmas.',
    recrutamento: [
      '"... você. Eu sonhei com você."',
      '"O destino costuma ser cruel. Mas às vezes, ele dá companheiros."',
      '"Vou contigo. Há coisas que preciso ver com meus próprios olhos."',
    ],
    falasCombate: [
      '"Pelo fogo, purificado."',
      '"O vento me obedece."',
      '"Não tema o caos. Ele é seu amigo."',
    ],
  },
};

export const NIVEIS_AFINIDADE = [
  { nivel: 1, min: 0,   titulo: 'Estranhos',        bonus: null },
  { nivel: 2, min: 5,   titulo: 'Conhecidos',       bonus: { atk: 1 } },
  { nivel: 3, min: 15,  titulo: 'Parceiros',        bonus: { atk: 2, def: 1 } },
  { nivel: 4, min: 30,  titulo: 'Amigos',           bonus: { atk: 3, def: 2, hpMax: 10 } },
  { nivel: 5, min: 60,  titulo: 'Irmãos de Armas',  bonus: { atk: 5, def: 3, hpMax: 20 } },
];

export function nivelAfinidade(valor) {
  let nivel = 1;
  for (const n of NIVEIS_AFINIDADE) {
    if (valor >= n.min) nivel = n.nivel;
  }
  return nivel;
}

export function dadosAfinidade(valor) {
  let atual = NIVEIS_AFINIDADE[0];
  for (const n of NIVEIS_AFINIDADE) {
    if (valor >= n.min) atual = n;
  }
  return atual;
}

export function acharCompanheiro(id) {
  return COMPANHEIROS[id] || null;
}

export function companheirosDoLocal(localId) {
  return Object.values(COMPANHEIROS).filter((c) => c.local === localId);
}
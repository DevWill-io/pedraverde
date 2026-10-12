// src/content/dungeon.js
export const DUNGEON_INFO = {
  nome: 'Masmorra Arcana',
  emoji: '🌀',
  desc: 'Um portal de pedra pulsando com energia antiga. De dentro vem um cheiro de morte e ouro.',
};

export function sortearTotalAndares() {
  return 5 + Math.floor(Math.random() * 6); // 5-10
}

const TIPOS_SALA = [
  { tipo: 'combate', peso: 55 },
  { tipo: 'tesouro', peso: 15 },
  { tipo: 'descanso', peso: 12 },
  { tipo: 'armadilha', peso: 10 },
  { tipo: 'evento', peso: 8 },
];

function sortearComPeso(lista) {
  const total = lista.reduce((a, x) => a + x.peso, 0);
  let r = Math.random() * total;
  for (const x of lista) {
    r -= x.peso;
    if (r <= 0) return x.tipo;
  }
  return lista[0].tipo;
}

function sortearTipoSala(andar, total, ehUltimaSala) {
  if (ehUltimaSala && andar === total) return 'chefe_final';
  if (ehUltimaSala && andar % 3 === 0 && andar !== total) return 'mini_chefe';
  return sortearComPeso(TIPOS_SALA);
}

export function gerarDungeon() {
  const totalAndares = sortearTotalAndares();
  const andares = [];
  for (let i = 1; i <= totalAndares; i++) {
    const qtdSalas = 3 + Math.floor(Math.random() * 2); // 3-4
    const salas = [];
    for (let j = 0; j < qtdSalas; j++) {
      salas.push({
        tipo: sortearTipoSala(i, totalAndares, j === qtdSalas - 1),
        visitada: false,
      });
    }
    andares.push(salas);
  }
  return {
    totalAndares,
    andarAtual: 1,
    salaAtual: 0,
    andares,
    recompensaAcumulada: { moedas: 0, xp: 0, itens: [] },
    inicio: Date.now(),
  };
}

export function bonusPorAndar(andar) {
  return {
    hpPct: (andar - 1) * 0.15,
    atkBonus: Math.floor((andar - 1) * 1.2),
    defBonus: Math.floor((andar - 1) * 0.8),
    xpMult: 1 + (andar - 1) * 0.25,
    moedasMult: 1 + (andar - 1) * 0.3,
    lootBonus: andar * 0.08,
  };
}

export function poolInimigos(andar) {
  const pools = [
    ['rato', 'lobo', 'goblin'],
    ['lobo', 'goblin', 'aranha', 'esqueleto'],
    ['esqueleto', 'bandido', 'cultista', 'escorpiao'],
    ['bandido', 'cultista', 'abutre', 'saqueador', 'serpente'],
    ['saqueador', 'serpente', 'pirata', 'lobo_glacial', 'golem_gelo'],
    ['guarda_real', 'cavaleiro_negro', 'mago_negro'],
  ];
  const idx = Math.min(Math.floor((andar - 1) / 2), pools.length - 1);
  return pools[idx];
}

export function poolMiniChefes() {
  return ['troll', 'ogro', 'bruxa', 'rei_bandido'];
}

export function poolChefeFinal() {
  return ['hidra', 'bispo_sombrio', 'mumia_rei', 'esfinge', 'capitao_pirata', 'gigante_gelo'];
}
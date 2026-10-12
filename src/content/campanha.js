// src/content/campanha.js
export const PROLOGO = `Você cresceu ouvindo histórias sobre a queda do Rei Antigo.
Dizem que há mil anos, ele governava um reino próspero, até que
algo — ninguém sabe o quê — o corrompeu. O reino virou ruínas.
O rei virou algo que não vive nem morre.

Você deixou sua vila natal semanas atrás. Carregava uma mochila,
um punhado de moedas e um objetivo: chegar a Pedraverde, a última
vila livre antes das terras amaldiçoadas. Foi sua avó quem te pediu.

"Vá para Pedraverde. Encontre o Sábio Aldric. Ele precisa saber que
as sombras estão se movendo de novo. E talvez... ele precise de você."

Você chegou. É hora de descobrir por quê.`;

export const CAMPANHA = [
  {
    id: 'cap1',
    titulo: 'I. A Ameaça da Floresta',
    emoji: '🌲',
    desc: 'Um troll tomou a Caverna Profunda, ao norte da Floresta Sombria. Os moradores de Pedraverde vivem com medo.',
    objetivo: 'Derrote o Troll das Cavernas na Caverna Profunda.',
    check: (e) => e.flags?.derrotou_troll === true,
    nivelRecomendado: 3,
    recompensa: { moedas: 50, xp: 30 },
  },
  {
    id: 'cap2',
    titulo: 'II. Os Saqueadores da Colina',
    emoji: '⛰',
    desc: 'Bandidos aterrorizam o Mercado. O Rei Bandido planeja atacar Pedraverde.',
    objetivo: 'Derrote o Rei Bandido na Fortaleza.',
    check: (e) => e.flags?.derrotou_rei_bandido === true,
    nivelRecomendado: 7,
    recompensa: { moedas: 100, xp: 60 },
  },
  {
    id: 'cap3',
    titulo: 'III. A Bruxa do Pântano',
    emoji: '🐸',
    desc: 'A Bruxa do Pântano guarda um segredo sobre o Rei Antigo — uma profecia.',
    objetivo: 'Derrote a Bruxa no Covil do Pântano.',
    check: (e) => e.flags?.derrotou_bruxa === true,
    nivelRecomendado: 9,
    recompensa: { moedas: 120, xp: 80 },
  },
  {
    id: 'cap4',
    titulo: 'IV. O Vale em Perigo',
    emoji: '☀',
    desc: 'O Bispo Sombrio lidera um culto ao Rei Antigo. O Vale do Sol corre perigo.',
    objetivo: 'Derrote o Bispo Sombrio na Catedral Esquecida.',
    check: (e) => e.flags?.derrotou_bispo_sombrio === true,
    nivelRecomendado: 14,
    recompensa: { moedas: 200, xp: 150 },
  },
  {
    id: 'cap5',
    titulo: 'V. A Maldição do Deserto',
    emoji: '🏜',
    desc: 'O Rei Mumificado sussurra um aviso: o Rei Antigo não pode ser morto — só substituído.',
    objetivo: 'Derrote o Rei Mumificado nas Ruínas Perdidas.',
    check: (e) => e.flags?.derrotou_mumia_rei === true,
    nivelRecomendado: 16,
    recompensa: { moedas: 250, xp: 200 },
  },
  {
    id: 'cap6',
    titulo: 'VI. O Porto Traiçoeiro',
    emoji: '⚓',
    desc: 'O Capitão Pirata tem um mapa do castelo. Recupere-o.',
    objetivo: 'Derrote o Capitão Pirata na Caverna do Tesouro.',
    check: (e) => e.flags?.derrotou_capitao_pirata === true,
    nivelRecomendado: 19,
    recompensa: { moedas: 300, xp: 250 },
  },
  {
    id: 'cap7',
    titulo: 'VII. A Chave do Dragão',
    emoji: '🐉',
    desc: 'Só o Dragão Ancião pode abrir o portão do castelo. Enfrente-o no Pico Nevada.',
    objetivo: 'Derrote o Dragão Ancião no Pico Nevada.',
    check: (e) => e.flags?.derrotou_dragao_anciao === true,
    nivelRecomendado: 23,
    recompensa: { moedas: 500, xp: 500, itens: ['lamina_alvorada'] },
  },
  {
    id: 'cap8',
    titulo: 'VIII. O Rei Antigo',
    emoji: '🏰',
    desc: 'Chegou a hora. Enfrente o Rei Antigo no Salão do Trono e decida o destino do reino.',
    objetivo: 'Derrote o Rei Antigo e faça sua escolha final.',
    check: (e) => e.flags?.derrotou_rei_antigo === true,
    nivelRecomendado: 27,
    recompensa: { moedas: 1000, xp: 1000 },
  },
];

export const FINAIS = {
  matar: {
    id: 'matar',
    titulo: 'O Silêncio do Trono',
    emoji: '⚔',
    cor: 'final-neutro',
    texto: `Você ergue sua arma e desfere o golpe final. O Rei Antigo não grita —
ele apenas solta um suspiro antigo, como se estivesse esperando por isso
há séculos. O corpo cai e vira pó. O castelo treme, e uma onda de energia
percorre o reino.

Lá fora, as sombras se dissipam. Pedraverde inteira comemora. Os bardos
cantarão sobre você por gerações. Mas enquanto volta pra casa, você sente
que algo ficou inacabado. Uma pergunta sem resposta: por que ele foi
corrompido? E o que evitou que acontecesse de novo?`,
  },
  poupar: {
    id: 'poupar',
    titulo: 'A Redenção do Rei',
    emoji: '☮',
    cor: 'final-bom',
    texto: `Você baixa a arma. O Rei Antigo ergue a cabeça, surpreso. Em seus olhos
vazios, algo brilha — talvez um resto de humanidade. Ele sussurra:
"Você é o primeiro... em mil anos... que não me olha como monstro."

O encanto se quebra. A coroa cai no chão, e o que resta do rei se dissolve
em luz suave. O castelo se enche de sol. As sombras somem de todo o reino.
Lendas dirão que o Rei Antigo não foi morto — foi perdoado. E que o perdão
é a única arma que o corrompido não pode resistir.`,
  },
  juntar: {
    id: 'juntar',
    titulo: 'O Novo Rei Antigo',
    emoji: '👑',
    cor: 'final-mau',
    texto: `Você recolhe a coroa do chão. Ela ainda está quente. Ao tocá-la, uma
voz antiga sussurra em sua mente — a mesma voz que corrompeu o rei
original. Você tenta resistir, mas o poder é doce demais.

Quando o sol nasce em Pedraverde, um novo Rei Antigo observa o reino
do alto do castelo. Sua primeira ordem: silêncio. Seu primeiro decreto:
obediência. Ninguém sabe que você um dia foi herói. Ninguém lembra.
Só o Sábio Aldric, que foge para as montanhas com lágrimas nos olhos,
sabe o que aconteceu. E ele escreve tudo num diário — para que, um dia,
alguém leia. Alguém como você foi.`,
  },
};

export function capituloAtual(e) {
  for (let i = 0; i < CAMPANHA.length; i++) {
    if (!CAMPANHA[i].check(e)) return { indice: i, cap: CAMPANHA[i] };
  }
  return { indice: CAMPANHA.length, cap: null }; // campanha completa
}

export function totalCapitulos() {
  return CAMPANHA.length;
}

/* Falas do Sábio Aldric — variam conforme progresso da campanha */
export function falasAldric(e) {
  const { indice } = capituloAtual(e);
  const base = [
    '"Ah, você deve ser o jovem que a avó mandou."',
    '"Não se preocupe, eu sabia que você viria. Sente-se."',
  ];

  const falasPorCapitulo = [
    // Cap 1 - Ainda no começo
    [
      '"As sombras voltaram a se mover. O Troll das Cavernas é só o começo."',
      '"Vá para o norte. A Floresta Sombria guarda mais do que lobos."',
    ],
    // Cap 2
    [
      '"Você derrotou o Troll? Impressionante. Mas há mais."',
      '"Os bandidos da colina receberam ouro de mãos desconhecidas. Alguém está unindo os inimigos."',
      '"Suspeito do pior. Precisamos investigar."',
    ],
    // Cap 3
    [
      '"O Rei Bandido caiu. Mas descobriu alguma coisa, não foi?"',
      '"Sim... o nome do Rei Antigo voltou a ser sussurrado."',
      '"Uma bruxa no pântano conhece a profecia. Vá até ela."',
    ],
    // Cap 4
    [
      '"A bruxa contou tudo. Agora sabemos o que o Rei Antigo era antes da corrupção."',
      '"Ele não era tirano. Era um protetor. Algo o transformou."',
      '"Um bispo sombrio no Vale do Sol pode ter respostas. Cuidado com ele."',
    ],
    // Cap 5
    [
      '"O Bispo era apenas um fantoche. A corrupção é mais antiga do que imaginávamos."',
      '"O deserto guarda a múmia de um rei que testemunhou tudo. Ele falará."',
      '"Você está mais perto da verdade do que qualquer um em mil anos."',
    ],
    // Cap 6
    [
      '"O Rei Mumificado te contou? A corrupção não pode ser destruída."',
      '"Só... escolhida. Essa é a maldição."',
      '"Precisamos do mapa do porto. É o único caminho para o castelo."',
    ],
    // Cap 7
    [
      '"O Pirata tinha o mapa. Agora só falta a chave."',
      '"O Dragão Ancião guarda a entrada do castelo. Ele não é mau — é guardião."',
      '"Se conseguir passar por ele, saberá o que fazer."',
    ],
    // Cap 8
    [
      '"Você está pronto. Eu não posso ir com você."',
      '"Lembre-se: o Rei Antigo não é seu inimigo. A coroa é."',
      '"Sua escolha definirá o futuro de todos. Escolha com o coração, não com a espada."',
    ],
    // Campanha completa
    [
      '"Está feito. O reino verá um novo amanhecer."',
      '"Qualquer que tenha sido sua escolha, você carregou o peso que ninguém mais carregaria."',
      '"Descanse, herói. Você mereceu."',
    ],
  ];

  const extras = falasPorCapitulo[indice] || falasPorCapitulo[falasPorCapitulo.length - 1];
  return [...base, ...extras];
}
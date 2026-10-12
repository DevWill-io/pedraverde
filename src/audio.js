// src/audio.js
/* Sons e música gerados via Web Audio API — nenhum arquivo MP3. */

import { getAmbiente } from './content/ambientes.js';

let ctx = null;
let habilitado = true;
let volume = 0.5;

/* Nodes persistentes da música */
let musicaGainNode = null;
let musicaReverbNode = null;
let musicaRevInNode = null;

function getCtx() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch { return null; }
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

export function setSomHabilitado(v) { habilitado = !!v; }

export function setVolume(v) {
  volume = Math.max(0, Math.min(1, v));
  // Atualiza música em tempo real
  if (musicaGainNode && musicaGainNode.context) {
    const agora = musicaGainNode.context.currentTime;
    // Música um pouco mais baixa que efeitos (não domina o jogo)
    musicaGainNode.gain.setTargetAtTime(volume * 0.5, agora, 0.08);
  }
}

export function getVolume() { return volume; }
export function isHabilitado() { return habilitado; }

/* ------------------------------------------------------------------ */
/* EFEITOS SONOROS                                                     */
/* ------------------------------------------------------------------ */

function nota(freq, dur, tipo = 'sine', vol = 1, delay = 0) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  const t = c.currentTime + delay;
  osc.type = tipo;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol * volume, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function ruido(dur, vol = 0.4) {
  const c = getCtx();
  if (!c) return;
  const buffer = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
  }
  const src = c.createBufferSource();
  const gain = c.createGain();
  src.buffer = buffer;
  gain.gain.value = vol * volume;
  src.connect(gain);
  gain.connect(c.destination);
  src.start();
}

const SONS = {
  clique: () => nota(880, 0.05, 'square', 0.3),
  comando: () => nota(660, 0.06, 'sine', 0.4),
  dano: () => { ruido(0.15, 0.5); nota(120, 0.15, 'sawtooth', 0.3); },
  danoCritico: () => { ruido(0.25, 0.6); nota(90, 0.25, 'sawtooth', 0.4); nota(180, 0.2, 'square', 0.2, 0.05); },
  cura: () => { nota(660, 0.15, 'sine', 0.4); nota(880, 0.15, 'sine', 0.4, 0.1); nota(1320, 0.2, 'sine', 0.3, 0.2); },
  magia: () => { nota(440, 0.15, 'triangle', 0.4); nota(660, 0.15, 'triangle', 0.35, 0.08); nota(990, 0.25, 'triangle', 0.3, 0.16); },
  moeda: () => { nota(1200, 0.06, 'square', 0.3); nota(1600, 0.06, 'square', 0.3, 0.05); },
  levelup: () => { [523, 659, 784, 1047].forEach((f, i) => nota(f, 0.2, 'triangle', 0.4, i * 0.12)); },
  morte: () => { [440, 330, 220, 165].forEach((f, i) => nota(f, 0.35, 'sawtooth', 0.4, i * 0.15)); },
  vitoria: () => { [523, 659, 784].forEach((f, i) => nota(f, 0.25, 'triangle', 0.4, i * 0.1)); },
  erro: () => { nota(200, 0.2, 'square', 0.3); nota(150, 0.25, 'square', 0.25, 0.08); },
  eventoBom: () => { nota(880, 0.1, 'sine', 0.3); nota(1175, 0.15, 'sine', 0.3, 0.1); },
  eventoRuim: () => { nota(220, 0.25, 'square', 0.3); nota(160, 0.3, 'square', 0.25, 0.1); },
  craft: () => { ruido(0.15, 0.35); nota(660, 0.15, 'triangle', 0.35, 0.1); nota(990, 0.2, 'triangle', 0.3, 0.25); },
  encantar: () => { nota(523, 0.15, 'sine', 0.3); nota(784, 0.15, 'sine', 0.3, 0.1); nota(1047, 0.3, 'sine', 0.35, 0.2); nota(1568, 0.35, 'sine', 0.3, 0.3); },
  chat: () => { nota(880, 0.08, 'sine', 0.25); nota(1175, 0.1, 'sine', 0.25, 0.06); },
};

export function tocar(nome) {
  if (!habilitado) return;
  const fn = SONS[nome];
  if (!fn) return;
  try { fn(); } catch {}
}

export function somDeLinha(tipo) {
  const mapa = {
    'dano-causado': 'dano',
    'dano-critico': 'danoCritico',
    'dano-recebido': 'dano',
    'dano-status': 'dano',
    cura: 'cura',
    magia: 'magia',
    'dano-magico': 'magia',
    buff: 'magia',
    compra: 'moeda',
    venda: 'moeda',
    loot: 'moeda',
    pickup: 'moeda',
    'level-up': 'levelup',
    morte: 'morte',
    vitoria: 'vitoria',
    erro: 'erro',
    'evento-bom': 'eventoBom',
    'evento-ruim': 'eventoRuim',
    craft: 'craft',
    encantar: 'encantar',
  };
  return mapa[tipo] || null;
}

/* ================================================================== */
/* MÚSICA DE FUNDO — ambiência medieval                                */
/* ================================================================== */
/*
  Sistema:
    • Pad sustentado com 3 notas por acorde (terceira, quinta, oitava)
    • Baixo contínuo reforçando a fundamental
    • Progressão de 4 acordes em Lá menor: Am → F → G → C/G
    • Cada acorde dura ~10s, alternando lentamente
    • Filtro passa-baixa para suavizar (som quente, tipo cordas)
    • Reverb de convolução (impulso gerado) — dá sensação de templo
    • Volume controlado em tempo real via gainNode mestre
*/

let musicaAtiva = false;
let musicaTimer = null;
let passoAcorde = 0;

/* Progressão em Lá menor */
const PROGRESSAO = [
  {
    nome: 'Am',
    baixo: 110.00,                            // A2
    notas: [220.00, 261.63, 329.63],          // A3, C4, E4
    dur: 10,
  },
  {
    nome: 'F',
    baixo: 87.31,                             // F2
    notas: [174.61, 220.00, 261.63],          // F3, A3, C4
    dur: 10,
  },
  {
    nome: 'G',
    baixo: 98.00,                             // G2
    notas: [196.00, 246.94, 293.66],          // G3, B3, D4
    dur: 10,
  },
  {
    nome: 'C/G',
    baixo: 130.81,                            // C3
    notas: [196.00, 261.63, 329.63],          // G3, C4, E4
    dur: 10,
  },
];

/* Master gain da música — controlado por setVolume() */
function getMusicaGain(c) {
  if (musicaGainNode && musicaGainNode.context === c) return musicaGainNode;
  musicaGainNode = c.createGain();
  musicaGainNode.gain.value = volume * 0.5;
  musicaGainNode.connect(c.destination);
  return musicaGainNode;
}

/* Reverb por convolução com impulso gerado (decai como um templo) */
function getReverb(c) {
  if (musicaReverbNode && musicaReverbNode.context === c) return musicaReverbNode;
  const convolver = c.createConvolver();
  const rate = c.sampleRate;
  const length = Math.floor(rate * 3.2); // 3.2s de cauda
  const impulse = c.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      const t = i / length;
      // Curva de decaimento mais orgânica
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.8) * (1 - t * 0.3);
    }
  }
  convolver.buffer = impulse;
  musicaReverbNode = convolver;
  return convolver;
}

/* Reverb input (soma tudo que vai pro reverb) */
function getReverbIn(c) {
  if (musicaRevInNode && musicaRevInNode.context === c) return musicaRevInNode;
  musicaRevInNode = c.createGain();
  const convolver = getReverb(c);
  const master = getMusicaGain(c);
  // Sinal seco (dry) vai direto pro master; molhado (wet) passa pelo reverb
  musicaRevInNode.connect(convolver);
  convolver.connect(master);
  return musicaRevInNode;
}

/* Toca um acorde como pad sustentado */
function tocarAcorde(acorde) {
  const c = getCtx();
  if (!c || !musicaAtiva) return;

  const t = c.currentTime;
  const master = getMusicaGain(c);
  const revIn = getReverbIn(c);
  const dur = acorde.dur;

  /* --- Baixo contínuo --- */
  {
    const osc = c.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = acorde.baixo;

    const sub = c.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = acorde.baixo * 0.5; // sub-oitava

    const eg = c.createGain();
    eg.gain.setValueAtTime(0, t);
    eg.gain.linearRampToValueAtTime(0.09, t + 2.5);
    eg.gain.linearRampToValueAtTime(0.075, t + dur * 0.7);
    eg.gain.linearRampToValueAtTime(0, t + dur);

    const subGain = c.createGain();
    subGain.gain.value = 0.4;

    osc.connect(eg);
    sub.connect(subGain);
    subGain.connect(eg);
    eg.connect(master);
    eg.connect(revIn);

    osc.start(t);
    sub.start(t);
    osc.stop(t + dur + 0.5);
    sub.stop(t + dur + 0.5);
  }

  /* --- Notas do acorde (pad) --- */
  acorde.notas.forEach((freq, idx) => {
    /* Oscilador principal — triângulo (som de cordas suaves) */
    const osc = c.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;

    /* Detune muito leve para espessura (2º oscilador) */
    const osc2 = c.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = freq * 1.004;
    const osc2Gain = c.createGain();
    osc2Gain.gain.value = 0.5;

    /* Filtro passa-baixa — corta agudos, deixa quente */
    const filtro = c.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.setValueAtTime(700, t);
    // Suave abertura/fechamento do filtro (dá "respiro")
    filtro.frequency.linearRampToValueAtTime(1400, t + dur * 0.5);
    filtro.frequency.linearRampToValueAtTime(900, t + dur);
    filtro.Q.value = 1.2;

    /* Envelope suave (attack 2.5s, release 2.5s) */
    const eg = c.createGain();
    const volNota = 0.05 - idx * 0.008; // notas agudas um pouco mais baixas
    eg.gain.setValueAtTime(0, t);
    eg.gain.linearRampToValueAtTime(volNota, t + 2.5);
    eg.gain.linearRampToValueAtTime(volNota * 0.8, t + dur * 0.75);
    eg.gain.linearRampToValueAtTime(0, t + dur);

    osc.connect(filtro);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filtro);
    filtro.connect(eg);
    eg.connect(master);
    eg.connect(revIn);

    osc.start(t);
    osc2.start(t);
    osc.stop(t + dur + 0.5);
    osc2.stop(t + dur + 0.5);
  });

  /* --- Sino distante ocasional (nota alta esparsa) --- */
  if (passoAcorde % 2 === 0 && Math.random() < 0.7) {
    const notaAlta = acorde.notas[0] * 3; // duas oitavas acima da raiz
    const osc = c.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = notaAlta;

    const eg = c.createGain();
    eg.gain.setValueAtTime(0, t + 3);
    eg.gain.linearRampToValueAtTime(0.02, t + 3.2);
    eg.gain.exponentialRampToValueAtTime(0.0001, t + 8);

    osc.connect(eg);
    eg.connect(master);
    eg.connect(revIn);

    osc.start(t + 3);
    osc.stop(t + 8.5);
  }
}

/* Agenda o próximo acorde */
function agendarAcorde() {
  if (!musicaAtiva) return;
  const acorde = PROGRESSAO[passoAcorde % PROGRESSAO.length];
  passoAcorde++;
  tocarAcorde(acorde);
  // Próximo acorde entra antes do anterior acabar, para as ondas se sobreporem
  const intervalo = (acorde.dur - 2) * 1000;
  musicaTimer = setTimeout(agendarAcorde, intervalo);
}

export function iniciarMusica() {
  if (musicaAtiva) return;
  const c = getCtx();
  if (!c) return;
  const começar = () => {
    musicaAtiva = true;
    passoAcorde = 0;
    // Toca imediatamente o primeiro
    agendarAcorde();
  };
  if (c.state === 'suspended') {
    c.resume().then(começar).catch(() => {});
  } else {
    começar();
  }
}

export function pararMusica() {
  musicaAtiva = false;
  if (musicaTimer) {
    clearTimeout(musicaTimer);
    musicaTimer = null;
  }
  // Fade-out suave do master
  if (musicaGainNode && musicaGainNode.context) {
    const agora = musicaGainNode.context.currentTime;
    musicaGainNode.gain.cancelScheduledValues(agora);
    musicaGainNode.gain.setValueAtTime(musicaGainNode.gain.value, agora);
    musicaGainNode.gain.linearRampToValueAtTime(0, agora + 1.5);
    // Depois reajusta para quando religar
    setTimeout(() => {
      if (musicaGainNode && musicaGainNode.context && !musicaAtiva) {
        musicaGainNode.gain.value = 0;
      }
    }, 1600);
  }
}

export function musicaEstaAtiva() {
  return musicaAtiva;
}

/* ================================================================== */
/* SONS AMBIENTAIS POR BIOMA                                           */
/* ================================================================== */
/*
  Cada região tem um perfil de ambiente com:
    • vento base contínuo (filtro modulado)
    • eventos aleatórios (pássaros, gotas, sapos, ondas, etc.)
*/

let ambienteHabilitado = true;
let ambienteAtivo = false;
let ambienteNodes = null;
let ambienteTimer = null;
let ambientePerfil = null;
let ambienteGain = null;

/* Gain node dedicado do ambiente (separado dos efeitos e da música) */
function getAmbienteGain(c) {
  if (ambienteGain && ambienteGain.context === c) return ambienteGain;
  ambienteGain = c.createGain();
  ambienteGain.gain.value = ambienteHabilitado ? volume * 0.12 : 0;
  ambienteGain.connect(c.destination);
  return ambienteGain;
}

/* Atualiza o volume do ambiente em tempo real */
export function setAmbienteVolume(v) {
  if (ambienteGain && ambienteGain.context) {
    const agora = ambienteGain.context.currentTime;
    ambienteGain.gain.setTargetAtTime(
      ambienteHabilitado ? v * 0.12 : 0,
      agora,
      0.15,
    );
  }
}

export function setAmbienteHabilitado(v) {
  ambienteHabilitado = !!v;
  if (ambienteGain && ambienteGain.context) {
    const agora = ambienteGain.context.currentTime;
    ambienteGain.gain.setTargetAtTime(
      ambienteHabilitado && ambienteAtivo ? volume * 0.12 : 0,
      agora,
      0.3,
    );
  }

  if (!ambienteHabilitado) {
    pararAmbiente();
  }
}

export function isAmbienteHabilitado() { return ambienteHabilitado; }
export function isAmbienteAtivo() { return ambienteAtivo; }

/* Cria vento contínuo — versão suave */
function criarVento(c, intensidade) {
  const bufferSize = c.sampleRate * 3;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  // Ruído mais suave (marrom, menos agudo)
  let ultimo = 0;
  for (let i = 0; i < bufferSize; i++) {
    const branco = Math.random() * 2 - 1;
    ultimo = (ultimo + 0.02 * branco) / 1.02;
    data[i] = ultimo * 3.5;
  }

  const src = c.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  // Passa-baixa suave (sem ressonância)
  const filtro = c.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.value = 200 + intensidade * 300;
  filtro.Q.value = 0.3;

  // LFO bem lento para dar respiração
  const lfo = c.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.05 + Math.random() * 0.04;

  const lfoGain = c.createGain();
  lfoGain.gain.value = 80 + intensidade * 100;

  lfo.connect(lfoGain);
  lfoGain.connect(filtro.frequency);

  // Volume MUITO mais baixo
  const gain = c.createGain();
  gain.gain.value = 0.015 + intensidade * 0.035;

  src.connect(filtro);
  filtro.connect(gain);

  src.start();
  lfo.start();

  return { src, lfo, filtro, gain };
}

/* Eventos sonoros */
/* Eventos sonoros */
function tocarEvento(c, tipo, gainNode) {
  const agora = c.currentTime;

  const criarNota = (freqIni, freqFim, dur, tipo, vol) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(freqIni, agora);
    osc.frequency.exponentialRampToValueAtTime(freqFim, agora + dur);
    g.gain.setValueAtTime(0, agora);
    g.gain.linearRampToValueAtTime(vol, agora + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, agora + dur);
    osc.connect(g);
    g.connect(gainNode);
    osc.start(agora);
    osc.stop(agora + dur + 0.05);
  };

  const criarRuido = (dur, vol, filtroFreq, tipo = 'lowpass') => {
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = tipo;
    f.frequency.value = filtroFreq;
    const g = c.createGain();
    g.gain.value = vol;
    src.connect(f);
    f.connect(g);
    g.connect(gainNode);
    src.start();
  };

  switch (tipo) {
    case 'passaro': {
      const base = 2200 + Math.random() * 1800;
      const n = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const delay = i * (0.06 + Math.random() * 0.04);
        const osc = c.createOscillator();
        const g = c.createGain();
        const t = agora + delay;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(base, t);
        osc.frequency.linearRampToValueAtTime(base + 400 + Math.random() * 300, t + 0.04);
        osc.frequency.linearRampToValueAtTime(base - 200, t + 0.08);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.03, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        osc.connect(g);
        g.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.12);
      }
      break;
    }
    case 'galinha': {
      const base = 800 + Math.random() * 300;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(base, agora);
      osc.frequency.linearRampToValueAtTime(base * 1.5, agora + 0.08);
      osc.frequency.linearRampToValueAtTime(base * 0.7, agora + 0.18);
      g.gain.setValueAtTime(0, agora);
      g.gain.linearRampToValueAtTime(0.022, agora + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, agora + 0.22);
      osc.connect(g);
      g.connect(gainNode);
      osc.start(agora);
      osc.stop(agora + 0.25);
      break;
    }
    case 'coruja': {
      const base = 400 + Math.random() * 100;
      for (let i = 0; i < 2; i++) {
        const t = agora + i * 0.5;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(base, t);
        osc.frequency.linearRampToValueAtTime(base * 1.2, t + 0.15);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.025, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(g);
        g.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.4);
      }
      break;
    }
    case 'corvo': {
      const base = 600 + Math.random() * 200;
      for (let i = 0; i < 2; i++) {
        const t = agora + i * 0.25;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(base, t);
        osc.frequency.linearRampToValueAtTime(base * 0.6, t + 0.12);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.018, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(g);
        g.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.18);
      }
      break;
    }
    case 'sapo': {
      const base = 180 + Math.random() * 80;
      for (let i = 0; i < 3; i++) {
        const t = agora + i * 0.12;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(base, t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.022, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(g);
        g.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.15);
      }
      break;
    }
    case 'grilo': {
      const base = 4500 + Math.random() * 800;
      for (let i = 0; i < 6; i++) {
        const t = agora + i * 0.04;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'triangle';
        osc.frequency.value = base;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.012, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        osc.connect(g);
        g.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.05);
      }
      break;
    }
    case 'gota': {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900 + Math.random() * 400, agora);
      osc.frequency.exponentialRampToValueAtTime(300, agora + 0.15);
      g.gain.setValueAtTime(0, agora);
      g.gain.linearRampToValueAtTime(0.018, agora + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, agora + 0.2);
      osc.connect(g);
      g.connect(gainNode);
      osc.start(agora);
      osc.stop(agora + 0.25);
      break;
    }
    case 'galho': {
      criarRuido(0.15, 0.025, 1800, 'highpass');
      break;
    }
    case 'onda': {
      criarRuido(1.2, 0.03, 900, 'lowpass');
      break;
    }
    case 'gaivota': {
      const base = 1400 + Math.random() * 400;
      for (let i = 0; i < 2; i++) {
        const t = agora + i * 0.35;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(base, t);
        osc.frequency.linearRampToValueAtTime(base * 0.8, t + 0.15);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.018, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(g);
        g.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.3);
      }
      break;
    }
    case 'sino_navio': {
      const base = 300;
      [base, base * 2.2, base * 3.6].forEach((f, i) => {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        g.gain.setValueAtTime(0, agora);
        g.gain.linearRampToValueAtTime(0.02 / (i + 1), agora + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, agora + 1.5);
        osc.connect(g);
        g.connect(gainNode);
        osc.start(agora);
        osc.stop(agora + 1.6);
      });
      break;
    }
    case 'vento_forte': {
      criarRuido(2.5, 0.035, 700, 'bandpass');
      break;
    }
    case 'areia': {
      criarRuido(1.8, 0.02, 2500, 'highpass');
      break;
    }
    case 'gelo': {
      const base = 1800 + Math.random() * 1000;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(base, agora);
      osc.frequency.exponentialRampToValueAtTime(base * 0.5, agora + 0.3);
      g.gain.setValueAtTime(0, agora);
      g.gain.linearRampToValueAtTime(0.015, agora + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, agora + 0.4);
      osc.connect(g);
      g.connect(gainNode);
      osc.start(agora);
      osc.stop(agora + 0.5);
      break;
    }
    case 'tocha': {
      criarRuido(0.25, 0.03, 1200, 'bandpass');
      break;
    }
    case 'corrente': {
      criarRuido(0.4, 0.02, 800, 'bandpass');
      setTimeout(() => criarRuido(0.3, 0.018, 1000, 'bandpass'), 80);
      break;
    }
    case 'carrinho': {
      const base = 120 + Math.random() * 40;
      for (let i = 0; i < 4; i++) {
        const t = agora + i * 0.12;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'square';
        osc.frequency.value = base;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.015, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(g);
        g.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.06);
      }
      break;
    }
  }
}

/* Agenda o próximo evento sonoro */
function agendarEvento() {
  if (!ambienteAtivo || !ambientePerfil) return;
  const c = getCtx();
  if (!c) return;
  const gain = getAmbienteGain(c);

  // Aumenta bastante o intervalo (2.5x maior que antes)
  const [minS, maxS] = ambientePerfil.intervalo || [3, 7];
  const delay = (minS * 2.5 + Math.random() * (maxS - minS) * 2.5) * 1000;

  ambienteTimer = setTimeout(() => {
    if (!ambienteAtivo || !ambientePerfil) return;
    const eventos = ambientePerfil.eventos || [];
    // 45% de chance de não tocar nada (silêncio entre eventos)
    if (eventos.length && Math.random() < 0.55) {
      const ev = eventos[Math.floor(Math.random() * eventos.length)];
      try { tocarEvento(c, ev, gain); } catch {}
    }
    agendarEvento();
  }, delay);
}

/* Inicia ambiente para uma região */
export function iniciarAmbiente(perfilId) {
  const c = getCtx();
  if (!c) return;

  // Já está tocando o mesmo perfil? Não faz nada
  if (ambienteAtivo && ambientePerfil?.id === perfilId) return;

  // Para o anterior (se houver)
  pararAmbiente();

  ambientePerfil = getAmbiente(perfilId);
  ambienteAtivo = true;

  const gain = getAmbienteGain(c);
  gain.gain.setTargetAtTime(
    ambienteHabilitado ? volume * 0.35 : 0,
    c.currentTime,
    0.6,
  );

  // Cria vento contínuo
  ambienteNodes = criarVento(c, ambientePerfil.vento);
  ambienteNodes.src.connect(gain);
  // (o gain interno do vento já está ligado ao filtro)
  ambienteNodes.gain.disconnect();
  ambienteNodes.gain.connect(gain);

  // Agenda eventos
  agendarEvento();
}

/* Para o ambiente atual */
export function pararAmbiente() {
  ambienteAtivo = false;
  if (ambienteTimer) {
    clearTimeout(ambienteTimer);
    ambienteTimer = null;
  }
  const c = getCtx();
  if (ambienteNodes && c) {
    const agora = c.currentTime;
    const g = ambienteNodes.gain;
    if (g) {
      try {
        g.gain.setTargetAtTime(0, agora, 0.4);
      } catch {}
    }
    const src = ambienteNodes.src;
    const lfo = ambienteNodes.lfo;
    setTimeout(() => {
      try { src?.stop(); } catch {}
      try { lfo?.stop(); } catch {}
    }, 1200);
    ambienteNodes = null;
  }
  ambientePerfil = null;
}
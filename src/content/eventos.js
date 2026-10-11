// src/content/eventos.js
import { ITENS } from './itens.js';

function addItem(e, id, qtd = 1) {
  const atual = e.inventario.find((i) => i.id === id);
  if (atual) atual.qtd += qtd;
  else e.inventario.push({ id, qtd });
}

/* ------------------------------------------------------------------ */
/* Eventos aleatórios ao viajar                                        */
/* ------------------------------------------------------------------ */
/* tipo: 'bom' | 'ruim' | 'neutro'                                     */
/* peso: quanto maior, mais chance de sair                              */
/* naoInimigo: só dispara se NÃO estiver em combate                     */

export const EVENTOS = [
  /* --- BONS --- */
  {
    id: 'moedas',
    tipo: 'bom',
    peso: 20,
    aplicar(e, p) {
      const qtd = 3 + Math.floor(Math.random() * 8);
      e.moedas += qtd;
      p(`💰 Você encontra ${qtd} moedas no chão, meio enterradas.`, 'evento-bom');
    },
  },
  {
    id: 'pocao_achada',
    tipo: 'bom',
    peso: 15,
    aplicar(e, p) {
      addItem(e, 'pocao', 1);
      p('🧪 Um pequeno frasco brilha entre as pedras. É uma Poção de Vida!', 'evento-bom');
    },
  },
  {
    id: 'fonte_cura',
    tipo: 'bom',
    peso: 12,
    aplicar(e, p) {
      const antes = e.hp;
      e.hp = Math.min(e.hpMax, e.hp + 15);
      const ganho = e.hp - antes;
      if (ganho > 0) {
        p(`💧 Você encontra uma fonte cristalina e bebe. Recupera ${ganho} HP.`, 'evento-bom');
      } else {
        p('💧 Você encontra uma fonte cristalina, mas já está com HP cheio.', 'evento-neutro');
      }
    },
  },
  {
    id: 'bencao_antiga',
    tipo: 'bom',
    peso: 5,
    aplicar(e, p) {
      e.mana = e.manaMax;
      p('✨ Runas antigas brilham na parede. Sua mana é totalmente restaurada.', 'evento-bom');
    },
  },
  {
    id: 'item_raro',
    tipo: 'bom',
    peso: 4,
    aplicar(e, p) {
      const raros = ['anel_protecao', 'capa_elfica', 'colar_vitalidade'];
      const id = raros[Math.floor(Math.random() * raros.length)];
      addItem(e, id, 1);
      p(`✦ Um baú esquecido no canto. Dentro: ${ITENS[id].nome}!`, 'evento-epico');
    },
  },

  /* --- RUINS --- */
  {
    id: 'armadilha',
    tipo: 'ruim',
    peso: 18,
    aplicar(e, p) {
      const dano = 4 + Math.floor(Math.random() * 6);
      e.hp -= dano;
      p(`⚠ Uma armadilha de estacas dispara do chão! Você perde ${dano} HP.`, 'evento-ruim');
    },
  },
  {
    id: 'ladrao',
    tipo: 'ruim',
    peso: 12,
    aplicar(e, p) {
      const perdidas = Math.min(e.moedas, 5 + Math.floor(Math.random() * 10));
      if (perdidas > 0) {
        e.moedas -= perdidas;
        p(`🥷 Um ladrão some na névoa com ${perdidas} moedas suas!`, 'evento-ruim');
      } else {
        p('🥷 Um ladrão tenta roubar você, mas sua bolsa está vazia. Ele foge irritado.', 'evento-neutro');
      }
    },
  },
  {
    id: 'veneno_alim',
    tipo: 'ruim',
    peso: 8,
    aplicar(e, p) {
      p('☠ Você pisa em algo mole e um gás verde sobe do chão. Está envenenado!', 'evento-ruim');
      if (!e.efeitos) e.efeitos = [];
      e.efeitos = e.efeitos.filter((ef) => ef.tipo !== 'veneno');
      e.efeitos.push({ tipo: 'veneno', valor: 2, duracao: 3 });
    },
  },
  {
    id: 'sonho_estranho',
    tipo: 'ruim',
    peso: 6,
    aplicar(e, p) {
      const antes = e.mana;
      e.mana = Math.max(0, e.mana - 8);
      const perda = antes - e.mana;
      if (perda > 0) {
        p(`👁 Uma visão distorcida passa pelos seus olhos. Você perde ${perda} de mana.`, 'evento-ruim');
      } else {
        p('👁 Uma visão distorcida passa pelos seus olhos... mas você está sem mana.', 'evento-neutro');
      }
    },
  },

  /* --- NEUTROS --- */
  {
    id: 'viajante',
    tipo: 'neutro',
    peso: 15,
    aplicar(e, p) {
      p('🧙 Um viajante encapuzado passa por você sem falar. Um leve aceno, e some.', 'evento-neutro');
    },
  },
  {
    id: 'nada',
    tipo: 'neutro',
    peso: 25,
    aplicar(e, p) {
      p('🍃 O vento passa. Nada acontece.', 'evento-neutro');
    },
  },
];

/* Sorteio ponderado */
export function sortearEvento(excluir = []) {
  const lista = EVENTOS.filter((ev) => !excluir.includes(ev.id));
  const total = lista.reduce((acc, ev) => acc + ev.peso, 0);
  let r = Math.random() * total;
  for (const ev of lista) {
    r -= ev.peso;
    if (r <= 0) return ev;
  }
  return lista[lista.length - 1];
}
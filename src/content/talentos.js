// src/content/talentos.js
/*
  Cada classe tem talentos nos níveis 5, 10, 15 e 20.
  Ao atingir esses níveis, o jogador ganha 1 ponto de talento.

  Estrutura:
    id       — identificador único
    nome     — nome exibido
    emoji    — ícone
    desc     — descrição
    bonus    — bônus permanentes diretos (atk, def, hpMax, manaMax)
    flag     — comportamento especial checado em combate (opcional)
*/

export const TALENTOS = {
  guerreiro: {
    5: [
      {
        id: 'furia',
        nome: 'Fúria',
        emoji: '🔥',
        desc: '+50% de dano quando seu HP estiver abaixo de 30%.',
        flag: 'furia',
      },
      {
        id: 'resistencia',
        nome: 'Resistência',
        emoji: '🛡',
        desc: '+4 DEF permanente.',
        bonus: { def: 4 },
      },
    ],
    10: [
      {
        id: 'golpe_duplo',
        nome: 'Golpe Duplo',
        emoji: '⚔',
        desc: '25% de chance de atacar duas vezes por turno.',
        flag: 'golpe_duplo',
      },
      {
        id: 'segunda_chance',
        nome: 'Segunda Chance',
        emoji: '❤',
        desc: 'Uma vez por combate, revive com 30% do HP ao cair.',
        flag: 'segunda_chance',
      },
    ],
    15: [
      {
        id: 'berserker',
        nome: 'Berserker',
        emoji: '💥',
        desc: '+6 ATK, mas -2 DEF.',
        bonus: { atk: 6, def: -2 },
      },
      {
        id: 'guardiao',
        nome: 'Guardião',
        emoji: '🏰',
        desc: '+6 DEF e +15 HP máx.',
        bonus: { def: 6, hpMax: 15 },
      },
    ],
    20: [
      {
        id: 'campeao',
        nome: 'Campeão',
        emoji: '👑',
        desc: '+8 ATK e +20 HP máx.',
        bonus: { atk: 8, hpMax: 20 },
      },
      {
        id: 'imortal',
        nome: 'Imortal',
        emoji: '⚡',
        desc: '+40 HP máx e +3 DEF.',
        bonus: { hpMax: 40, def: 3 },
      },
    ],
  },

  mago: {
    5: [
      {
        id: 'metamagia',
        nome: 'Metamagia',
        emoji: '🌀',
        desc: 'Magias custam 20% menos MP.',
        flag: 'metamagia',
      },
      {
        id: 'foco_mago',
        nome: 'Foco Arcano',
        emoji: '🎯',
        desc: '+3 de dano em todas as magias de ataque.',
        flag: 'foco_mago',
      },
    ],
    10: [
      {
        id: 'mestre_arcano',
        nome: 'Mestre Arcano',
        emoji: '📘',
        desc: '+20 MP máximo.',
        bonus: { manaMax: 20 },
      },
      {
        id: 'regeneracao_magica',
        nome: 'Regeneração Mágica',
        emoji: '✨',
        desc: 'Recupera 3 MP a cada turno de combate.',
        flag: 'regen_mp',
      },
    ],
    15: [
      {
        id: 'piromante',
        nome: 'Piromante',
        emoji: '🔥',
        desc: '+5 de dano em magias de fogo.',
        flag: 'piromante',
      },
      {
        id: 'criomante',
        nome: 'Criomante',
        emoji: '❄',
        desc: '+20% de chance de congelar com magias de gelo.',
        flag: 'criomante',
      },
    ],
    20: [
      {
        id: 'arquimago',
        nome: 'Arquimago',
        emoji: '🔮',
        desc: '+30 MP máx e +3 dano mágico.',
        bonus: { manaMax: 30 },
        flag: 'foco_mago',
      },
      {
        id: 'sabio',
        nome: 'Sábio',
        emoji: '📖',
        desc: '+15 HP máx, +10 MP máx, +3 DEF.',
        bonus: { hpMax: 15, manaMax: 10, def: 3 },
      },
    ],
  },

  ladino: {
    5: [
      {
        id: 'furtividade',
        nome: 'Furtividade',
        emoji: '👤',
        desc: '+4 DEF permanente.',
        bonus: { def: 4 },
      },
      {
        id: 'assassino',
        nome: 'Assassino',
        emoji: '🗡',
        desc: 'Ataques críticos causam 3× dano em vez de 2×.',
        flag: 'assassino',
      },
    ],
    10: [
      {
        id: 'veneno_aprimorado',
        nome: 'Veneno Aprimorado',
        emoji: '☠',
        desc: 'Todo ataque básico tem 25% de envenenar o alvo.',
        flag: 'veneno_auto',
      },
      {
        id: 'velocidade',
        nome: 'Velocidade',
        emoji: '💨',
        desc: '20% de chance de atacar duas vezes.',
        flag: 'golpe_duplo',
      },
    ],
    15: [
      {
        id: 'mestre_sombras',
        nome: 'Mestre das Sombras',
        emoji: '🌑',
        desc: '+6 ATK quando em HP cheio.',
        flag: 'mestre_sombras',
      },
      {
        id: 'evasao',
        nome: 'Evasão',
        emoji: '💫',
        desc: '50% de chance de esquiva quando HP abaixo de 50%.',
        flag: 'evasao',
      },
    ],
    20: [
      {
        id: 'sombra_mortal',
        nome: 'Sombra Mortal',
        emoji: '💀',
        desc: '+8 ATK, +4 DEF. Assassino embutido (crítico 3×).',
        bonus: { atk: 8, def: 4 },
        flag: 'assassino',
      },
      {
        id: 'fantasma',
        nome: 'Fantasma',
        emoji: '👻',
        desc: '+5 DEF, +3 ATK. Imune a veneno e sangramento.',
        bonus: { def: 5, atk: 3 },
        flag: 'imune_veneno',
      },
    ],
  },

  clerigo: {
    5: [
      {
        id: 'fe',
        nome: 'Fé',
        emoji: '🙏',
        desc: 'Todas as curas recuperam 30% a mais.',
        flag: 'fe',
      },
      {
        id: 'julgamento',
        nome: 'Julgamento',
        emoji: '⚖',
        desc: '+50% de dano contra mortos-vivos (esqueletos, múmias).',
        flag: 'julgamento',
      },
    ],
    10: [
      {
        id: 'bencao_duradoura',
        nome: 'Bênção Duradoura',
        emoji: '🌟',
        desc: 'Buffs duram +2 turnos.',
        flag: 'bencao_duradoura',
      },
      {
        id: 'aura_sagrada',
        nome: 'Aura Sagrada',
        emoji: '💫',
        desc: '+4 DEF permanente.',
        bonus: { def: 4 },
      },
    ],
    15: [
      {
        id: 'sacerdote',
        nome: 'Sacerdote',
        emoji: '⛪',
        desc: '+6 DEF, +20 HP máx.',
        bonus: { def: 6, hpMax: 20 },
      },
      {
        id: 'curandeiro',
        nome: 'Curandeiro',
        emoji: '💚',
        desc: 'Usar magia de cura remove efeitos negativos.',
        flag: 'curandeiro',
      },
    ],
    20: [
      {
        id: 'santo',
        nome: 'Santo',
        emoji: '😇',
        desc: '+30 HP máx. Regenera 2 HP por turno de combate.',
        bonus: { hpMax: 30 },
        flag: 'regen_hp',
      },
      {
        id: 'inquisidor',
        nome: 'Inquisidor',
        emoji: '☀',
        desc: '+5 ATK, +5 DEF, +5 dano contra mortos-vivos.',
        bonus: { atk: 5, def: 5 },
        flag: 'julgamento',
      },
    ],
  },

  arqueiro: {
    5: [
      {
        id: 'tiro_rapido',
        nome: 'Tiro Rápido',
        emoji: '🏹',
        desc: '20% de chance de atacar duas vezes.',
        flag: 'golpe_duplo',
      },
      {
        id: 'mira_letal',
        nome: 'Mira Letal',
        emoji: '🎯',
        desc: '+5 ATK permanente.',
        bonus: { atk: 5 },
      },
    ],
    10: [
      {
        id: 'flecha_perfurante',
        nome: 'Flecha Perfurante',
        emoji: '➡',
        desc: 'Seus ataques ignoram 3 DEF do inimigo.',
        flag: 'perfurante',
      },
      {
        id: 'tiro_certeiro',
        nome: 'Tiro Certeiro',
        emoji: '✔',
        desc: '+4 ATK, +3 DEF.',
        bonus: { atk: 4, def: 3 },
      },
    ],
    15: [
      {
        id: 'cacador',
        nome: 'Caçador',
        emoji: '🐺',
        desc: '+7 ATK permanente.',
        bonus: { atk: 7 },
      },
      {
        id: 'atirador_elite',
        nome: 'Atirador de Elite',
        emoji: '🔭',
        desc: '15% de chance de crítico extra em cada ataque.',
        flag: 'critico_extra',
      },
    ],
    20: [
      {
        id: 'mestre_arqueiro',
        nome: 'Mestre Arqueiro',
        emoji: '👑',
        desc: '+10 ATK, +5 DEF.',
        bonus: { atk: 10, def: 5 },
      },
      {
        id: 'olho_aguia',
        nome: 'Olho de Águia',
        emoji: '🦅',
        desc: '+8 ATK. Ações "forte" nunca erram.',
        bonus: { atk: 8 },
        flag: 'sem_erro_forte',
      },
    ],
  },
};

/* Cache de lookup */
const _mapa = {};
for (const classeId of Object.keys(TALENTOS)) {
  for (const nivel of Object.keys(TALENTOS[classeId])) {
    for (const t of TALENTOS[classeId][nivel]) {
      _mapa[t.id] = t;
    }
  }
}

export function acharTalento(id) {
  return _mapa[id] || null;
}

/** Retorna os 2 talentos daquele nível para a classe */
export function talentosDoNivel(classeId, nivel) {
  return TALENTOS[classeId]?.[nivel] || null;
}

/** Níveis onde o jogador ganha talento */
export const NIVEIS_TALENTO = [5, 10, 15, 20];
// src/content/conquistas.js
/*
  Cada conquista tem:
    id       — identificador único
    nome     — nome exibido
    emoji    — ícone
    desc     — descrição
    cat      — categoria (progressao, combate, chefes, exploracao, itens, economia, eventos)
    bonus    — bônus permanente ao desbloquear (opcional)
    titulo   — se tiver, vira um título que pode ser equipado
    check    — função que recebe (e) e retorna true/false
*/

export const CONQUISTAS = [
  /* ============================================================ */
  /* PROGRESSÃO                                                    */
  /* ============================================================ */
  {
    id: 'nv_5', nome: 'Aprendiz', emoji: '🌱', cat: 'progressao',
    desc: 'Alcance o nível 5.',
    bonus: { hpMax: 10 },
    check: (e) => e.nivel >= 5,
  },
  {
    id: 'nv_10', nome: 'Veterano', emoji: '⚔', cat: 'progressao',
    desc: 'Alcance o nível 10.',
    bonus: { atk: 2 },
    titulo: 'Veterano',
    check: (e) => e.nivel >= 10,
  },
  {
    id: 'nv_15', nome: 'Herói', emoji: '🏆', cat: 'progressao',
    desc: 'Alcance o nível 15.',
    bonus: { hpMax: 20, def: 2 },
    titulo: 'Herói',
    check: (e) => e.nivel >= 15,
  },
  {
    id: 'nv_20', nome: 'Lenda', emoji: '👑', cat: 'progressao',
    desc: 'Alcance o nível 20.',
    bonus: { atk: 3, def: 3 },
    titulo: 'Lenda',
    check: (e) => e.nivel >= 20,
  },
  {
    id: 'nv_30', nome: 'Semideus', emoji: '✨', cat: 'progressao',
    desc: 'Alcance o nível 30.',
    bonus: { hpMax: 50, atk: 5, def: 5 },
    titulo: 'Semideus',
    check: (e) => e.nivel >= 30,
  },
  {
    id: 'nv_50', nome: 'Imortal', emoji: '🌟', cat: 'progressao',
    desc: 'Alcance o nível 50. Poucos chegam tão longe.',
    bonus: { hpMax: 100, atk: 10, def: 10 },
    titulo: 'Imortal',
    check: (e) => e.nivel >= 50,
  },

  /* ============================================================ */
  /* COMBATE — quantidade de kills                                 */
  /* ============================================================ */
  {
    id: 'kill_1', nome: 'Primeiro Sangue', emoji: '🩸', cat: 'combate',
    desc: 'Derrote seu primeiro inimigo.',
    bonus: { atk: 1 },
    check: (e) => totalKills(e) >= 1,
  },
  {
    id: 'kill_10', nome: 'Caçador', emoji: '🏹', cat: 'combate',
    desc: 'Derrote 10 inimigos.',
    bonus: { atk: 2 },
    titulo: 'Caçador',
    check: (e) => totalKills(e) >= 10,
  },
  {
    id: 'kill_50', nome: 'Predador', emoji: '🐺', cat: 'combate',
    desc: 'Derrote 50 inimigos.',
    bonus: { atk: 3 },
    titulo: 'Predador',
    check: (e) => totalKills(e) >= 50,
  },
  {
    id: 'kill_100', nome: 'Carrasco', emoji: '⚔', cat: 'combate',
    desc: 'Derrote 100 inimigos.',
    bonus: { atk: 4 },
    titulo: 'Carrasco',
    check: (e) => totalKills(e) >= 100,
  },
  {
    id: 'kill_500', nome: 'Exterminador', emoji: '💀', cat: 'combate',
    desc: 'Derrote 500 inimigos.',
    bonus: { atk: 8 },
    titulo: 'Exterminador',
    check: (e) => totalKills(e) >= 500,
  },

  /* ============================================================ */
  /* COMBATE — variações                                            */
  /* ============================================================ */
  {
    id: 'arena_10', nome: 'Gladiador', emoji: '🏟', cat: 'combate',
    desc: 'Vença 10 lutas na arena.',
    bonus: { hpMax: 15 },
    titulo: 'Gladiador',
    check: (e) => (e.estatisticas?.vitoriasArena || 0) >= 10,
  },
  {
    id: 'arena_50', nome: 'Campeão da Arena', emoji: '🥇', cat: 'combate',
    desc: 'Vença 50 lutas na arena.',
    bonus: { hpMax: 30, atk: 3 },
    titulo: 'Campeão',
    check: (e) => (e.estatisticas?.vitoriasArena || 0) >= 50,
  },
  {
    id: 'sobreviveu_1hp', nome: 'Milagre', emoji: '❤', cat: 'combate',
    desc: 'Sobreviva a um combate com 1 HP.',
    bonus: { hpMax: 5 },
    check: (e) => e.flags?.teve_1hp === true,
  },
  {
    id: 'danototal_1000', nome: 'Máquina de Guerra', emoji: '💥', cat: 'combate',
    desc: 'Cause 1.000 de dano total.',
    bonus: { atk: 3 },
    check: (e) => (e.estatisticas?.danoTotal || 0) >= 1000,
  },
  {
    id: 'danototal_10000', nome: 'Flagelo', emoji: '🌋', cat: 'combate',
    desc: 'Cause 10.000 de dano total.',
    bonus: { atk: 6 },
    titulo: 'Flagelo',
    check: (e) => (e.estatisticas?.danoTotal || 0) >= 10000,
  },

  /* ============================================================ */
  /* CHEFES                                                        */
  /* ============================================================ */
  {
    id: 'chefe_troll', nome: 'Matador de Trolls', emoji: '🧌', cat: 'chefes',
    desc: 'Derrote o Troll das Cavernas.',
    bonus: { atk: 2 },
    check: (e) => e.flags?.derrotou_troll === true,
  },
  {
    id: 'chefe_ogro', nome: 'Esmagador de Ogros', emoji: '👹', cat: 'chefes',
    desc: 'Derrote o Ogro das Ruínas.',
    bonus: { atk: 2 },
    check: (e) => e.flags?.derrotou_ogro === true,
  },
  {
    id: 'chefe_bruxa', nome: 'Caça-Bruxas', emoji: '🧙‍♀️', cat: 'chefes',
    desc: 'Derrote a Bruxa do Pântano.',
    bonus: { def: 3 },
    check: (e) => e.flags?.derrotou_bruxa === true,
  },
  {
    id: 'chefe_rei_bandido', nome: 'Justiceiro', emoji: '⚖', cat: 'chefes',
    desc: 'Derrote o Rei Bandido.',
    bonus: { atk: 3 },
    titulo: 'Justiceiro',
    check: (e) => e.flags?.derrotou_rei_bandido === true,
  },
  {
    id: 'chefe_hidra', nome: 'Cortador de Cabeças', emoji: '🐍', cat: 'chefes',
    desc: 'Derrote a Hidra do Pântano.',
    bonus: { atk: 4 },
    check: (e) => e.flags?.derrotou_hidra === true,
  },
  {
    id: 'chefe_bispo', nome: 'Herege', emoji: '⛪', cat: 'chefes',
    desc: 'Derrote o Bispo Sombrio.',
    bonus: { atk: 4, def: 2 },
    titulo: 'Herege',
    check: (e) => e.flags?.derrotou_bispo_sombrio === true,
  },
  {
    id: 'chefe_mumia', nome: 'Profanador', emoji: '🏺', cat: 'chefes',
    desc: 'Derrote o Rei Mumificado.',
    bonus: { atk: 5 },
    titulo: 'Profanador',
    check: (e) => e.flags?.derrotou_mumia_rei === true,
  },
  {
    id: 'chefe_esfinge', nome: 'Decifrador', emoji: '🦁', cat: 'chefes',
    desc: 'Derrote a Esfinge.',
    bonus: { atk: 5, def: 3 },
    titulo: 'Decifrador',
    check: (e) => e.flags?.derrotou_esfinge === true,
  },
  {
    id: 'chefe_pirata', nome: 'Terror dos Mares', emoji: '🏴‍☠️', cat: 'chefes',
    desc: 'Derrote o Capitão Pirata.',
    bonus: { atk: 6 },
    titulo: 'Terror dos Mares',
    check: (e) => e.flags?.derrotou_capitao_pirata === true,
  },
  {
    id: 'chefe_gigante', nome: 'Matador de Gigantes', emoji: '🗡', cat: 'chefes',
    desc: 'Derrote o Gigante de Gelo.',
    bonus: { atk: 6, def: 4 },
    titulo: 'Matador de Gigantes',
    check: (e) => e.flags?.derrotou_gigante_gelo === true,
  },
  {
    id: 'chefe_rei_gigante', nome: 'Rei dos Reis', emoji: '⚡', cat: 'chefes',
    desc: 'Derrote o Rei dos Gigantes.',
    bonus: { atk: 8, def: 5 },
    titulo: 'Rei dos Reis',
    check: (e) => e.flags?.derrotou_chefe_gigante === true,
  },
  {
    id: 'chefe_dragao', nome: 'Matador de Dragões', emoji: '🐉', cat: 'chefes',
    desc: 'Derrote o Dragão Ancião.',
    bonus: { atk: 10, def: 6 },
    titulo: 'Matador de Dragões',
    check: (e) => e.flags?.derrotou_dragao_anciao === true,
  },
  {
    id: 'chefe_rei_antigo', nome: 'O Fim de uma Era', emoji: '🏰', cat: 'chefes',
    desc: 'Derrote o Rei Antigo. Você venceu Pedraverde.',
    bonus: { hpMax: 100, atk: 15, def: 10 },
    titulo: 'Lenda de Pedraverde',
    check: (e) => e.flags?.derrotou_rei_antigo === true,
  },

  /* ============================================================ */
  /* EXPLORAÇÃO                                                    */
  /* ============================================================ */
  {
    id: 'visita_5', nome: 'Andarilho', emoji: '🚶', cat: 'exploracao',
    desc: 'Visite 5 locais diferentes.',
    bonus: { hpMax: 5 },
    check: (e) => (e.estatisticas?.locaisVisitados?.length || 0) >= 5,
  },
  {
    id: 'visita_15', nome: 'Explorador', emoji: '🗺', cat: 'exploracao',
    desc: 'Visite 15 locais diferentes.',
    bonus: { hpMax: 15 },
    titulo: 'Explorador',
    check: (e) => (e.estatisticas?.locaisVisitados?.length || 0) >= 15,
  },
  {
    id: 'visita_30', nome: 'Cartógrafo', emoji: '🧭', cat: 'exploracao',
    desc: 'Visite 30 locais diferentes.',
    bonus: { hpMax: 30, def: 3 },
    titulo: 'Cartógrafo',
    check: (e) => (e.estatisticas?.locaisVisitados?.length || 0) >= 30,
  },
  {
    id: 'visita_todos', nome: 'Conquistador', emoji: '🌍', cat: 'exploracao',
    desc: 'Visite TODOS os locais do mundo.',
    bonus: { hpMax: 50, atk: 5, def: 5 },
    titulo: 'Conquistador',
    check: (e) => (e.estatisticas?.locaisVisitados?.length || 0) >= 30,
  },

  /* ============================================================ */
  /* ITENS                                                         */
  /* ============================================================ */
  {
    id: 'item_unico', nome: 'Mochileiro', emoji: '🎒', cat: 'itens',
    desc: 'Tenha 5 tipos diferentes de item no inventário ao mesmo tempo.',
    bonus: { hpMax: 5 },
    check: (e) => (e.inventario?.length || 0) >= 5,
  },
  {
    id: 'item_colecionador', nome: 'Colecionador', emoji: '📦', cat: 'itens',
    desc: 'Tenha 15 tipos diferentes de item no inventário ao mesmo tempo.',
    bonus: { hpMax: 15 },
    titulo: 'Colecionador',
    check: (e) => (e.inventario?.length || 0) >= 15,
  },
  {
    id: 'equip_completo', nome: 'Bem Equipado', emoji: '⚙', cat: 'itens',
    desc: 'Tenha itens equipados em todos os 8 slots.',
    bonus: { def: 4 },
    titulo: 'Bem Equipado',
    check: (e) => {
      const eq = e.equipado || {};
      const slots = ['arma', 'escudo', 'elmo', 'armadura', 'botas', 'anel', 'colar', 'capa'];
      return slots.every((s) => eq[s]);
    },
  },
  {
    id: 'encantador', nome: 'Encantador', emoji: '✨', cat: 'itens',
    desc: 'Encante 3 itens.',
    bonus: { atk: 2 },
    check: (e) => (e.estatisticas?.itensEncantados || 0) >= 3,
  },
  {
    id: 'forjador', nome: 'Forjador', emoji: '⚒', cat: 'itens',
    desc: 'Craft 10 itens.',
    bonus: { atk: 3 },
    titulo: 'Forjador',
    check: (e) => (e.estatisticas?.itensCriados || 0) >= 10,
  },
  {
    id: 'mestre_forjador', nome: 'Mestre Ferreiro', emoji: '🔨', cat: 'itens',
    desc: 'Craft 50 itens.',
    bonus: { atk: 5, def: 3 },
    titulo: 'Mestre Ferreiro',
    check: (e) => (e.estatisticas?.itensCriados || 0) >= 50,
  },
  {
    id: 'raro_equipado', nome: 'Portador de Relíquias', emoji: '✦', cat: 'itens',
    desc: 'Equipe um item de raridade raro ou superior.',
    bonus: { atk: 2, def: 2 },
    check: (e) => {
      const ITENS = require_itens();
      for (const slot of Object.keys(e.equipado || {})) {
        const id = e.equipado[slot];
        if (!id) continue;
        const it = ITENS[id];
        if (it?.raridade && ['raro', 'epico', 'lendario', 'mitico'].includes(it.raridade)) return true;
      }
      return false;
    },
  },

  /* ============================================================ */
  /* ECONOMIA                                                      */
  /* ============================================================ */
  {
    id: 'moedas_100', nome: 'Bolso Cheio', emoji: '💰', cat: 'economia',
    desc: 'Acumule 100 moedas.',
    bonus: { hpMax: 5 },
    check: (e) => e.moedas >= 100,
  },
  {
    id: 'moedas_500', nome: 'Rico', emoji: '💎', cat: 'economia',
    desc: 'Acumule 500 moedas.',
    bonus: { hpMax: 10 },
    titulo: 'Rico',
    check: (e) => e.moedas >= 500,
  },
  {
    id: 'moedas_2000', nome: 'Magnata', emoji: '👑', cat: 'economia',
    desc: 'Acumule 2.000 moedas.',
    bonus: { hpMax: 20, atk: 2 },
    titulo: 'Magnata',
    check: (e) => e.moedas >= 2000,
  },
  {
    id: 'moedas_10000', nome: 'Tesoureiro do Reino', emoji: '🏦', cat: 'economia',
    desc: 'Acumule 10.000 moedas. Você é mais rico que reis.',
    bonus: { hpMax: 40, atk: 5, def: 5 },
    titulo: 'Tesoureiro',
    check: (e) => e.moedas >= 10000,
  },

  /* ============================================================ */
  /* EVENTOS / QUESTS                                              */
  /* ============================================================ */
  {
    id: 'quest_1', nome: 'Primeira Missão', emoji: '📜', cat: 'eventos',
    desc: 'Complete sua primeira quest.',
    bonus: { hpMax: 5 },
    check: (e) => (e.questsCompletas?.length || 0) >= 1,
  },
  {
    id: 'quest_5', nome: 'Aventureiro', emoji: '📖', cat: 'eventos',
    desc: 'Complete 5 quests.',
    bonus: { atk: 2 },
    check: (e) => (e.questsCompletas?.length || 0) >= 5,
  },
  {
    id: 'quest_10', nome: 'Herói das Missões', emoji: '🌟', cat: 'eventos',
    desc: 'Complete 10 quests.',
    bonus: { atk: 4, hpMax: 15 },
    titulo: 'Herói das Missões',
    check: (e) => (e.questsCompletas?.length || 0) >= 10,
  },
  {
    id: 'eventos_20', nome: 'Acompanhante da Sorte', emoji: '🍀', cat: 'eventos',
    desc: 'Viva 20 eventos aleatórios.',
    bonus: { hpMax: 10 },
    check: (e) => (e.estatisticas?.eventosVividos || 0) >= 20,
  },
  {
    id: 'morte_1', nome: 'Não Morri de Vez', emoji: '💫', cat: 'eventos',
    desc: 'Morra pela primeira vez.',
    bonus: { hpMax: 10 },
    check: (e) => (e.estatisticas?.mortes || 0) >= 1,
  },
  {
    id: 'morte_10', nome: 'Fênix', emoji: '🔥', cat: 'eventos',
    desc: 'Morra 10 vezes e continue tentando.',
    bonus: { hpMax: 30, atk: 3 },
    titulo: 'Fênix',
    check: (e) => (e.estatisticas?.mortes || 0) >= 10,
  },
  {
    id: 'talentos_4', nome: 'Árvore Completa', emoji: '🌳', cat: 'eventos',
    desc: 'Aprenda 4 talentos (árvore completa).',
    bonus: { hpMax: 20, atk: 3, def: 3 },
    titulo: 'Árvore Completa',
    check: (e) => (e.talentos?.length || 0) >= 4,
  },
];

function totalKills(e) {
  return Object.values(e.estatisticas?.inimigosMortos || {}).reduce((a, b) => a + b, 0);
}

/* Helper interno para não importar ITENS aqui (evita loop) */
let _itensCache = null;
function require_itens() {
  if (_itensCache) return _itensCache;
  return {};
}

/* Permite que jogo.js injete ITENS */
export function injetarItens(itens) {
  _itensCache = itens;
}

/* Categorias */
export const CATEGORIAS_CONQUISTAS = {
  progressao: { nome: 'Progressão', emoji: '📈' },
  combate:    { nome: 'Combate',    emoji: '⚔' },
  chefes:     { nome: 'Chefes',     emoji: '👑' },
  exploracao: { nome: 'Exploração', emoji: '🗺' },
  itens:      { nome: 'Itens',      emoji: '🎒' },
  economia:   { nome: 'Economia',   emoji: '💰' },
  eventos:    { nome: 'Eventos',    emoji: '🎲' },
};

export function acharConquista(id) {
  return CONQUISTAS.find((c) => c.id === id) || null;
}

export function conquistasPorCategoria() {
  const mapa = {};
  for (const c of CONQUISTAS) {
    if (!mapa[c.cat]) mapa[c.cat] = [];
    mapa[c.cat].push(c);
  }
  return mapa;
}
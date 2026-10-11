// src/content/receitas.js
/* 
  Cada receita:
    id           — id do item a criar (deve existir em itens.js)
    materiais    — { idMaterial: qtd } necessário
    moedas       — custo em moedas (opcional, padrão 0)
    nivel        — nível mínimo (opcional, padrão 1)
    estacao      — 'ferraria' | 'alquimia' | 'cozinha' (opcional)
*/

export const RECEITAS = [
  /* ---------- FERRARIA: ARMAS ---------- */
  {
    id: 'espada_curta', moedas: 10, nivel: 1, estacao: 'ferraria',
    materiais: { ferro: 2, madeira: 1 },
  },
  {
    id: 'espada_longa', moedas: 20, nivel: 3, estacao: 'ferraria',
    materiais: { ferro: 4, madeira: 1 },
  },
  {
    id: 'espada_bastarda', moedas: 40, nivel: 5, estacao: 'ferraria',
    materiais: { ferro: 6, madeira: 2, couro: 1 },
  },
  {
    id: 'machado_batalha', moedas: 30, nivel: 4, estacao: 'ferraria',
    materiais: { ferro: 5, madeira: 3 },
  },
  {
    id: 'machado_guerra', moedas: 60, nivel: 7, estacao: 'ferraria',
    materiais: { ferro: 8, madeira: 3, osso: 2 },
  },
  {
    id: 'lanca', moedas: 25, nivel: 3, estacao: 'ferraria',
    materiais: { ferro: 3, madeira: 3 },
  },
  {
    id: 'alabarda', moedas: 70, nivel: 8, estacao: 'ferraria',
    materiais: { ferro: 10, madeira: 2, couro: 2 },
  },
  {
    id: 'montante', moedas: 100, nivel: 10, estacao: 'ferraria',
    materiais: { ferro: 15, madeira: 2, gema_rubi: 1 },
  },

  /* ---------- FERRARIA: ARMADURAS ---------- */
  {
    id: 'escudo_madeira', moedas: 15, nivel: 1, estacao: 'ferraria',
    materiais: { madeira: 4, couro: 1 },
  },
  {
    id: 'escudo_ferro', moedas: 40, nivel: 4, estacao: 'ferraria',
    materiais: { ferro: 5, madeira: 2, couro: 1 },
  },
  {
    id: 'escudo_torre', moedas: 80, nivel: 8, estacao: 'ferraria',
    materiais: { ferro: 12, madeira: 3, gema_safira: 1 },
  },
  {
    id: 'elmo_ferro', moedas: 25, nivel: 3, estacao: 'ferraria',
    materiais: { ferro: 4, couro: 1 },
  },
  {
    id: 'elmo_aco', moedas: 60, nivel: 7, estacao: 'ferraria',
    materiais: { ferro: 8, gema_safira: 1 },
  },
  {
    id: 'cota_malha', moedas: 45, nivel: 5, estacao: 'ferraria',
    materiais: { ferro: 8, couro: 2 },
  },
  {
    id: 'armadura_placas', moedas: 110, nivel: 10, estacao: 'ferraria',
    materiais: { ferro: 15, couro: 4, gema_rubi: 1 },
  },
  {
    id: 'grevas_ferro', moedas: 50, nivel: 6, estacao: 'ferraria',
    materiais: { ferro: 6, couro: 3 },
  },

  /* ---------- ALQUIMIA: POÇÕES ---------- */
  {
    id: 'pocao', moedas: 3, nivel: 1, estacao: 'alquimia',
    materiais: { osso: 1, cristal: 1 },
  },
  {
    id: 'elixir_maior', moedas: 15, nivel: 4, estacao: 'alquimia',
    materiais: { cristal: 3, osso: 2 },
  },
  {
    id: 'panaceia', moedas: 50, nivel: 8, estacao: 'alquimia',
    materiais: { cristal: 6, gema_safira: 1 },
  },
  {
    id: 'antidoto', moedas: 8, nivel: 2, estacao: 'alquimia',
    materiais: { teia_aranha: 2, cristal: 1 },
  },

  /* ---------- COZINHA: COMIDAS ---------- */
  {
    id: 'pao', moedas: 1, nivel: 1, estacao: 'cozinha',
    materiais: { madeira: 1 },
  },
  {
    id: 'carne_assada', moedas: 3, nivel: 2, estacao: 'cozinha',
    materiais: { pele_lobo: 1, madeira: 1 },
  },

  /* ---------- ARMAS MÁGICAS (receitas especiais) ---------- */
  {
    id: 'cajado_carvalho', moedas: 20, nivel: 2, estacao: 'ferraria',
    materiais: { madeira: 4, cristal: 2 },
  },
  {
    id: 'cajado_arcano', moedas: 90, nivel: 9, estacao: 'ferraria',
    materiais: { madeira: 6, cristal: 5, gema_safira: 1 },
  },

  /* ---------- JOIAS (receitas de joalheria) ---------- */
  {
    id: 'anel_protecao', moedas: 50, nivel: 5, estacao: 'ferraria',
    materiais: { ferro: 3, gema_safira: 1, cristal: 2 },
  },
  {
    id: 'anel_forca', moedas: 50, nivel: 5, estacao: 'ferraria',
    materiais: { ferro: 3, gema_rubi: 1, cristal: 2 },
  },
  {
    id: 'colar_vitalidade', moedas: 70, nivel: 6, estacao: 'ferraria',
    materiais: { ferro: 2, gema_rubi: 1, cristal: 3 },
  },
];

/* Helper: acha receita pelo id do item */
export function acharReceita(itemId) {
  return RECEITAS.find((r) => r.id === itemId) || null;
}

/* Helper: filtra receitas por estação */
export function receitasPorEstacao(estacao) {
  return RECEITAS.filter((r) => r.estacao === estacao);
}
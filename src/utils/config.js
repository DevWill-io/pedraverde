// src/utils/config.js
/* Persistência da configuração do jogador (idioma, som, tema, etc.) */

const CHAVE = 'pedraverde:config';

export function lerConfig() {
  try {
    const raw = localStorage.getItem(CHAVE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function gravarConfig(c) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(c));
  } catch {}
}
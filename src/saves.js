// src/saves.js
import { firebaseAtivo, db } from './firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { xpProximoNivel } from './engine/jogo';
import { RACAS } from './content/racas.js';
import { CLASSES } from './content/classes.js';
import { ITENS } from './content/itens.js';

const chaveLocal = (uid, slot) => `pedraverde:${uid}:slot${slot}`;

export function lerLocal(uid, slot) {
  try {
    const raw = localStorage.getItem(chaveLocal(uid, slot));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function gravarLocal(uid, slot, data) {
  try {
    localStorage.setItem(chaveLocal(uid, slot), JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage cheio ou indisponível', e);
  }
}

export function apagarLocal(uid, slot) {
  try {
    localStorage.removeItem(chaveLocal(uid, slot));
  } catch {}
}

async function lerNuvem(uid, slot) {
  if (!firebaseAtivo || !db) return null;
  try {
    const ref = doc(db, 'saves', uid, 'slots', String(slot));
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.warn('Falha ao ler a nuvem:', e);
    return null;
  }
}

async function gravarNuvem(uid, slot, data) {
  if (!firebaseAtivo || !db) return false;
  try {
    const ref = doc(db, 'saves', uid, 'slots', String(slot));
    await setDoc(ref, data);
    return true;
  } catch (e) {
    console.warn('Falha ao gravar na nuvem:', e);
    return false;
  }
}

export async function lerSlot(uid, slot, usarNuvem = true) {
  const local = lerLocal(uid, slot);
  const nuvem = usarNuvem ? await lerNuvem(uid, slot) : null;

  if (!local) return nuvem;
  if (!nuvem) return local;
  return (local.atualizadoEm || 0) >= (nuvem.atualizadoEm || 0) ? local : nuvem;
}

export async function gravarSlot(uid, slot, data, usarNuvem = true) {
  gravarLocal(uid, slot, data);
  if (usarNuvem) await gravarNuvem(uid, slot, data);
}

export async function apagarSlot(uid, slot, usarNuvem = true) {
  apagarLocal(uid, slot);
  if (usarNuvem && firebaseAtivo && db) {
    try {
      await deleteDoc(doc(db, 'saves', uid, 'slots', String(slot)));
    } catch (e) {
      console.warn('Falha ao apagar na nuvem:', e);
    }
  }
}

export const SLOTS = [1, 2, 3];

/* ================================================================== */
/* VALIDAÇÃO DE SAVE                                                   */
/* ================================================================== */

/**
 * Valida se um save é "são" (não foi editado manualmente de forma
 * absurda). Retorna { valido, erros[] }.
 *
 * Não é proteção perfeita: alguém determinado pode forjar um save
 * coerente. Mas pega 95% dos casos:
 *  - Saves corrompidos por bug
 *  - Saves editados "na cara" (nível 99 com 0 XP, HP 9999, etc.)
 *  - Saves com campos obrigatórios faltando
 */
export function validarSave(dados) {
  const erros = [];

  if (!dados || typeof dados !== 'object') {
    return { valido: false, erros: ['Arquivo inválido — não é um objeto.'] };
  }

  /* ---------- Campos obrigatórios ---------- */
  const obrigatorios = ['nome', 'raca', 'classe', 'nivel', 'xp', 'xpProx', 'hpMax', 'hp', 'atk', 'def', 'moedas', 'inventario'];
  for (const campo of obrigatorios) {
    if (dados[campo] === undefined || dados[campo] === null) {
      erros.push(`Campo obrigatório ausente: "${campo}".`);
    }
  }
  if (erros.length) return { valido: false, erros };

  /* ---------- Nome ---------- */
  if (typeof dados.nome !== 'string' || dados.nome.length < 1 || dados.nome.length > 30) {
    erros.push('Nome inválido (deve ter entre 1 e 30 caracteres).');
  }

  /* ---------- Raça e classe ---------- */
  if (!RACAS[dados.raca]) erros.push(`Raça desconhecida: "${dados.raca}".`);
  if (!CLASSES[dados.classe]) erros.push(`Classe desconhecida: "${dados.classe}".`);

  /* ---------- Nível ---------- */
  if (typeof dados.nivel !== 'number' || dados.nivel < 1 || dados.nivel > 100) {
    erros.push(`Nível inválido (${dados.nivel}). Deve estar entre 1 e 100.`);
  }

  /* ---------- XP ---------- */
  if (typeof dados.xp !== 'number' || dados.xp < 0) {
    erros.push(`XP inválido (${dados.xp}).`);
  }
  if (typeof dados.xpProx !== 'number' || dados.xpProx <= 0) {
    erros.push(`XP próximo inválido (${dados.xpProx}).`);
  }

  // XP não pode ser maior que o necessário pro próximo nível
  if (dados.nivel && dados.xpProx && dados.xp >= dados.xpProx) {
    erros.push(`XP (${dados.xp}) maior que o limite do nível (${dados.xpProx}).`);
  }

  // xpProx deve bater com a fórmula (tolerância pequena pra saves antigos)
  if (typeof dados.nivel === 'number' && typeof dados.xpProx === 'number') {
    const esperado = xpProximoNivel(dados.nivel);
    const tolerancia = Math.max(5, Math.round(esperado * 0.15));
    if (Math.abs(dados.xpProx - esperado) > tolerancia) {
      erros.push(`XP próximo inconsistente (${dados.xpProx}, esperado ~${esperado}).`);
    }
  }

  /* ---------- HP ---------- */
  // HP máx teórico máximo: base 30 + 5*(nivel-1) + bônus de raça (15) + classe (10) + conquistas (~250) + talentos (~80)
  // Vou ser generoso: 30 + 5*nivel + 300
  if (typeof dados.nivel === 'number') {
    const hpMaxTeorico = 30 + 5 * dados.nivel + 300;
    if (typeof dados.hpMax !== 'number' || dados.hpMax < 15 || dados.hpMax > hpMaxTeorico) {
      erros.push(`HP máximo fora do esperado (${dados.hpMax}, teto ~${hpMaxTeorico}).`);
    }
    if (typeof dados.hp !== 'number' || dados.hp < 0 || dados.hp > dados.hpMax) {
      erros.push(`HP atual inválido (${dados.hp}/${dados.hpMax}).`);
    }
  }

  /* ---------- ATK / DEF ---------- */
  if (typeof dados.nivel === 'number') {
    const atkTeorico = 30 + dados.nivel * 2;
    const defTeorico = 30 + dados.nivel * 2;
    if (typeof dados.atk !== 'number' || dados.atk < 0 || dados.atk > atkTeorico) {
      erros.push(`ATK fora do esperado (${dados.atk}, teto ~${atkTeorico}).`);
    }
    if (typeof dados.def !== 'number' || dados.def < 0 || dados.def > defTeorico) {
      erros.push(`DEF fora do esperado (${dados.def}, teto ~${defTeorico}).`);
    }
  }

  /* ---------- Moedas ---------- */
  if (typeof dados.moedas !== 'number' || dados.moedas < 0 || dados.moedas > 1_000_000) {
    erros.push(`Moedas fora do esperado (${dados.moedas}, teto 1.000.000).`);
  }

  /* ---------- Inventário ---------- */
  if (!Array.isArray(dados.inventario)) {
    erros.push('Inventário deve ser uma lista.');
  } else {
    if (dados.inventario.length > 500) {
      erros.push(`Inventário com itens demais (${dados.inventario.length}).`);
    }
    for (const item of dados.inventario) {
      if (!item || typeof item.id !== 'string') {
        erros.push('Item do inventário inválido (sem id).');
        break;
      }
      if (!ITENS[item.id]) {
        erros.push(`Item desconhecido no inventário: "${item.id}".`);
        break;
      }
      if (typeof item.qtd !== 'number' || item.qtd < 1 || item.qtd > 999) {
        erros.push(`Quantidade inválida no item "${item.id}" (${item.qtd}).`);
        break;
      }
    }
  }

  /* ---------- Mana (opcional mas se existir, checar) ---------- */
  if (typeof dados.mana === 'number' && typeof dados.manaMax === 'number') {
    if (dados.mana < 0 || dados.mana > dados.manaMax) {
      erros.push(`Mana inválida (${dados.mana}/${dados.manaMax}).`);
    }
    if (dados.manaMax > 500) {
      erros.push(`Mana máxima fora do esperado (${dados.manaMax}).`);
    }
  }

  return { valido: erros.length === 0, erros };
}

/* ================================================================== */
/* EXPORT / IMPORT                                                     */
/* ================================================================== */

export function exportarSave(estado, slot) {
  if (!estado) throw new Error('Nada para exportar.');
  const json = JSON.stringify(estado, null, 2);
  const blob = new Blob([json], { type: 'application/json' });

  const nomeBruto = `pedraverde-${estado.nome || 'save'}-nv${estado.nivel || 1}-slot${slot}`;
  const nomeLimpo = nomeBruto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\-_]/g, '_')
    .slice(0, 80);

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${nomeLimpo}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function lerArquivoSave(file) {
  return new Promise((resolve, reject) => {
    if (!file) { reject(new Error('Nenhum arquivo selecionado.')); return; }
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error('Arquivo muito grande (máx 2MB).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      let dados;
      try {
        dados = JSON.parse(ev.target.result);
      } catch {
        reject(new Error('O arquivo não é um JSON válido.'));
        return;
      }

      const { valido, erros } = validarSave(dados);
      if (!valido) {
        reject(new Error('Save inválido:\n\n• ' + erros.join('\n• ')));
        return;
      }

      resolve(dados);
    };
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo.'));
    reader.readAsText(file);
  });
}
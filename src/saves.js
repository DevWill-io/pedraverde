// src/saves.js
import { firebaseAtivo, db } from './firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

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

/**
 * Mescla inteligente: pega o save mais recente entre local e nuvem.
 */
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
/* EXPORT / IMPORT                                                     */
/* ================================================================== */

/**
 * Gera e baixa um arquivo .json com o save.
 * O nome do arquivo inclui o nome do personagem e nível.
 */
export function exportarSave(estado, slot) {
  if (!estado) throw new Error('Nada para exportar.');
  const json = JSON.stringify(estado, null, 2);
  const blob = new Blob([json], { type: 'application/json' });

  // Nome limpo do arquivo
  const nomeBruto = `pedraverde-${estado.nome || 'save'}-nv${estado.nivel || 1}-slot${slot}`;
  const nomeLimpo = nomeBruto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')       // remove acentos
    .replace(/[^a-zA-Z0-9\-_]/g, '_')      // troca o resto por _
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

/**
 * Lê um arquivo .json exportado e devolve o objeto do save.
 * Valida que parece um save de Pedraverde válido.
 */
export function lerArquivoSave(file) {
  return new Promise((resolve, reject) => {
    if (!file) { reject(new Error('Nenhum arquivo selecionado.')); return; }
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error('Arquivo muito grande (máx 2MB).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const dados = JSON.parse(ev.target.result);
        if (!dados || typeof dados !== 'object') {
          reject(new Error('Arquivo inválido.'));
          return;
        }
        // Validação básica: precisa ter os campos essenciais
        if (!dados.nome || typeof dados.nivel !== 'number') {
          reject(new Error('Este arquivo não parece um save de Pedraverde.'));
          return;
        }
        resolve(dados);
      } catch {
        reject(new Error('O arquivo não é um JSON válido.'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo.'));
    reader.readAsText(file);
  });
}

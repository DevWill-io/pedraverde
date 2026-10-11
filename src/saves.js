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
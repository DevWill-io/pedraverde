// src/chat.js
import { firebaseAtivo, db } from './firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';

/* ------------------------------------------------------------------ */
/* CHAT GLOBAL                                                         */
/* ------------------------------------------------------------------ */

const COL_CHAT = 'chat_global';

export function chatDisponivel() {
  return Boolean(firebaseAtivo && db);
}

export function ouvirChat(callback) {
  if (!chatDisponivel()) return () => {};
  const q = query(
    collection(db, COL_CHAT),
    orderBy('ts', 'desc'),
    limit(80),
  );
  return onSnapshot(
    q,
    (snap) => {
      const lista = [];
      snap.forEach((d) => {
        const v = d.data();
        lista.push({
          id: d.id,
          uid: v.uid,
          nome: v.nome,
          texto: v.texto,
          ts: v.ts?.toMillis?.() || Date.now(),
        });
      });
      callback(lista);
    },
    (err) => {
      console.warn('Chat: erro ao ouvir', err);
      callback([]);
    },
  );
}

export async function enviarMensagem(uid, nome, texto) {
  if (!chatDisponivel()) throw new Error('Chat indisponível.');
  const limpo = String(texto || '').trim().slice(0, 200);
  if (!limpo) return;
  await addDoc(collection(db, COL_CHAT), {
    uid,
    nome: String(nome).slice(0, 20),
    texto: limpo,
    ts: serverTimestamp(),
  });
}

/* ------------------------------------------------------------------ */
/* RANKING GLOBAL                                                      */
/* ------------------------------------------------------------------ */

const COL_RANK = 'ranking';

export function rankingDisponivel() {
  return Boolean(firebaseAtivo && db);
}

export async function publicarRanking(uid, dados) {
  if (!rankingDisponivel() || !uid) return;
  try {
    await setDoc(doc(db, COL_RANK, uid), {
      uid,
      nome: String(dados.nome || 'Herói').slice(0, 20),
      nivel: dados.nivel || 1,
      classe: dados.classe || 'guerreiro',
      raca: dados.raca || 'humano',
      local: dados.local || 'Pedraverde',
      ts: serverTimestamp(),
    });
  } catch (e) {
    console.warn('Ranking: falha ao publicar', e);
  }
}

export async function lerRanking(limite = 20) {
  if (!rankingDisponivel()) return [];
  try {
    const q = query(
      collection(db, COL_RANK),
      orderBy('nivel', 'desc'),
      limit(limite),
    );
    const snap = await getDocs(q);
    const lista = [];
    snap.forEach((d) => lista.push(d.data()));
    return lista;
  } catch (e) {
    console.warn('Ranking: falha ao ler', e);
    return [];
  }
}
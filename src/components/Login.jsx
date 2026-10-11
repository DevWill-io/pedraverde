import React, { use, useState } from 'react';
import { firebaseAtivo, auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { traduzir } from '../content/i18n.js';
import { tocar } from '../audio.js';

export default function Login({ idioma = 'pt', onOffline, onTutorial }) {
  const t = (k) => traduzir(idioma, k);
  const [modo, setModo] = useState('entrar');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function enviar(ev) {
    ev.preventDefault();
    setErro('');
    setCarregando(true);
    tocar('clique');
    try {
      if (!firebaseAtivo || !auth) throw new Error('Firebase não configurado.');
      if (modo === 'entrar') await signInWithEmailAndPassword(auth, email, senha);
      else await createUserWithEmailAndPassword(auth, email, senha);
    } catch (e) {
      setErro(traduzErro(e));
      tocar('erro');
    } finally {
      setCarregando(false);
    }
  }

  async function anonimo() {
    setErro('');
    setCarregando(true);
    tocar('clique');
    try {
      if (!firebaseAtivo || !auth) throw new Error('Firebase não configurado.');
      await signInAnonymously(auth);
    } catch (e) {
      setErro(traduzErro(e));
      tocar('erro');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="tela centro">
      <div className="painel login">
        <h1 className="titulo">{t('login.titulo')}</h1>
        <p className="subtitulo">{t('login.sub')}</p>

        <div className="abas">
          <button
            className={modo === 'entrar' ? 'aba ativa' : 'aba'}
            onClick={() => { tocar('clique'); setModo('entrar'); setErro(''); }}
          >
            {t('login.entrar')}
          </button>
          <button
            className={modo === 'cadastrar' ? 'aba ativa' : 'aba'}
            onClick={() => { tocar('clique'); setModo('cadastrar'); setErro(''); }}
          >
            {t('login.cadastrar')}
          </button>
        </div>

        <form onSubmit={enviar} className="form">
          <label>
            {t('login.email')}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label>
            {t('login.senha')}
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />
          </label>
          {erro && <div className="erro">{erro}</div>}
          <button className="botao primario" disabled={carregando}>
            {carregando ? t('login.carregando') : modo === 'entrar' ? t('login.btnEntrar') : t('login.btnCriar')}
          </button>
        </form>

        <div className="divisor">{t('login.ou')}</div>

        <button className="botao" onClick={anonimo} disabled={carregando || !firebaseAtivo}>
          {t('login.anonimo')}
        </button>
        <button className="botao" onClick={() => { tocar('clique'); onOffline(); }} disabled={carregando}>
          {t('login.offline')}
        </button>

        <button className="botao botao-tutorial" onClick={() => { tocar('clique'); onTutorial(); }}>
          {t('login.tutorial')}
        </button>

        {!firebaseAtivo && <p className="aviso">{t('login.aviso')}</p>}
      </div>
    </div>
  );
}

function traduzErro(e) {
  const c = e?.code || '';
  if (c.includes('invalid-credential') || c.includes('wrong-password')) return 'E-mail ou senha inválidos / Invalid credentials.';
  if (c.includes('user-not-found')) return 'Conta não encontrada / Account not found.';
  if (c.includes('email-already-in-use')) return 'Esse e-mail já está cadastrado / Email already in use.';
  if (c.includes('weak-password')) return 'Senha muito curta / Weak password.';
  if (c.includes('invalid-email')) return 'E-mail inválido / Invalid email.';
  if (c.includes('network')) return 'Sem conexão / Network error.';
  if (c.includes('operation-not-allowed')) return 'Método desativado / Method disabled.';
  return e?.message || 'Erro inesperado.';
}
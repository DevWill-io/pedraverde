// src/App.jsx
import { useEffect, useState } from 'react';
import { firebaseAtivo, auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { novoJogo } from './engine/jogo';
import { lerSlot, gravarSlot } from './saves';
import { MUNDO } from './content/mundo.js';
import { lerIdioma, gravarIdioma, traduzir } from './content/i18n.js';
import {
  tocar, setSomHabilitado, setVolume,
  iniciarMusica, pararMusica, musicaEstaAtiva,
} from './audio.js';
import { ouvirPromptInstalar } from './pwa.js';
import { publicarRanking } from './chat.js';
import { lerConfig, gravarConfig } from './utils/config.js';
import Login from './components/Login.jsx';
import Slots from './components/Slots.jsx';
import Tutorial from './components/Tutorial.jsx';
import Config from './components/Config.jsx';
import Chat from './components/Chat.jsx';
import Ranking from './components/Ranking.jsx';
import TelaCriacao from './components/TelaCriacao.jsx';
import TelaJogo from './components/TelaJogo.jsx';
import { setAmbienteHabilitado, setAmbienteVolume } from './audio.js';

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [slotAtual, setSlotAtual] = useState(null);
  const [estadoInicial, setEstadoInicial] = useState(null);
  const [slotPendente, setSlotPendente] = useState(null);
  const [mostrarTutorial, setMostrarTutorial] = useState(false);
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [mostrarChat, setMostrarChat] = useState(false);
  const [mostrarRanking, setMostrarRanking] = useState(false);

  const cfg = lerConfig();
  const [idioma, setIdioma] = useState(cfg.idioma || lerIdioma());
  const [som, setSom] = useState(cfg.som !== false);
  const [volume, setVolumeState] = useState(typeof cfg.volume === 'number' ? cfg.volume : 0.5);
  const [musica, setMusica] = useState(!!cfg.musica);
  const [tema, setTema] = useState(cfg.tema || 'escuro');
  const [ambiente, setAmbiente] = useState(cfg.ambiente !== false);
  const [temPromptInstalar, setTemPromptInstalar] = useState(false);

  /* Aplica config */
  useEffect(() => {
    setSomHabilitado(som);
    setVolume(volume);
    setAmbienteHabilitado(ambiente);   // ⭐ NOVO
    setAmbienteVolume(volume);         // ⭐ NOVO
    gravarConfig({ idioma, som, ambiente, volume, musica, tema });  // incluir ambiente
    document.documentElement.setAttribute('data-tema', tema);
  }, [idioma, som, ambiente, volume, musica, tema]);

  useEffect(() => { gravarIdioma(idioma); }, [idioma]);
  useEffect(() => { ouvirPromptInstalar(setTemPromptInstalar); }, []);

  /* Música */
  useEffect(() => {
    if (musica) {
      const tentarIniciar = () => { if (!musicaEstaAtiva()) iniciarMusica(); };
      tentarIniciar();
      window.addEventListener('click', tentarIniciar, { once: true });
      window.addEventListener('touchstart', tentarIniciar, { once: true });
      return () => {
        window.removeEventListener('click', tentarIniciar);
        window.removeEventListener('touchstart', tentarIniciar);
      };
    } else pararMusica();
  }, [musica]);

  /* Sessão Firebase */
  useEffect(() => {
    if (!firebaseAtivo || !auth) { setCarregando(false); return; }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUsuario(u ? { uid: u.uid, email: u.email, anonimo: u.isAnonymous, offline: false } : null);
      setCarregando(false);
    });
    return unsub;
  }, []);

  const usarNuvem = Boolean(usuario && !usuario.offline && firebaseAtivo);

  function entrarOffline() {
    setUsuario({ uid: 'offline', email: null, anonimo: true, offline: true });
  }

  async function sair() {
    setSlotAtual(null);
    setEstadoInicial(null);
    setSlotPendente(null);
    if (usuario && !usuario.offline && auth) {
      try { await signOut(auth); } catch {}
    } else {
      setUsuario(null);
    }
  }

  async function escolherSlot(slot, continuar) {
    if (continuar) {
      const d = await lerSlot(usuario.uid, slot, usarNuvem);
      if (d) {
        setEstadoInicial(d);
        setSlotAtual(slot);
        return;
      }
    }
    setSlotPendente(slot);
  }

  async function confirmarCriacao(dados) {
    const novo = novoJogo(dados);
    const pac = { ...novo, log: [], atualizadoEm: Date.now() };
    await gravarSlot(usuario.uid, slotPendente, pac, usarNuvem);
    setEstadoInicial(pac);
    setSlotAtual(slotPendente);
    setSlotPendente(null);
  }

  function cancelarCriacao() { setSlotPendente(null); }

  async function salvarSlot(d) {
    await gravarSlot(usuario.uid, slotAtual, d, usarNuvem);
    if (usarNuvem && usuario?.uid) {
      publicarRanking(usuario.uid, {
        nome: d.nome, nivel: d.nivel, classe: d.classe, raca: d.raca,
        local: (MUNDO[d.local] || {}).nome || 'Pedraverde',
      }).catch(() => {});
    }
  }

  async function carregarSlot() {
    return await lerSlot(usuario.uid, slotAtual, usarNuvem);
  }

  const abrirTutorial = () => { tocar('clique'); setMostrarTutorial(true); };
  const fecharTutorial = () => setMostrarTutorial(false);
  const abrirConfig = () => { tocar('clique'); setMostrarConfig(true); };
  const abrirChat = () => { tocar('clique'); setMostrarChat(true); };
  const abrirRanking = () => { tocar('clique'); setMostrarRanking(true); };

  const usuarioParaChat = usuario && !usuario.offline
    ? { ...usuario, nome: (estadoInicial && estadoInicial.nome) || usuario.email?.split('@')[0] || 'Anônimo' }
    : null;

  /* -------- Renderização por estado -------- */

  if (mostrarTutorial) return <Tutorial idioma={idioma} onVoltar={fecharTutorial} />;

  if (carregando) {
    return (
      <div className="tela centro">
        <div className="carregando">{traduzir(idioma, 'slots.carregando')}</div>
      </div>
    );
  }

  if (!usuario) {
    return <Login idioma={idioma} onOffline={entrarOffline} onTutorial={abrirTutorial} />;
  }

  if (slotPendente !== null) {
    return (
      <TelaCriacao
        idioma={idioma}
        onConfirmar={confirmarCriacao}
        onCancelar={cancelarCriacao}
      />
    );
  }

  if (slotAtual === null) {
    return (
      <Slots
        idioma={idioma}
        usuario={usuario}
        usarNuvem={usarNuvem}
        onEscolher={escolherSlot}
        onSair={sair}
      />
    );
  }

  return (
    <>
      <TelaJogo
        key={slotAtual}
        usuario={usuario}
        usarNuvem={usarNuvem}
        slot={slotAtual}
        estadoInicial={estadoInicial}
        idioma={idioma}
        onSalvar={salvarSlot}
        onCarregar={carregarSlot}
        onVoltarSlots={() => { setSlotAtual(null); setEstadoInicial(null); }}
        onSair={sair}
        onTutorial={abrirTutorial}
        onConfig={abrirConfig}
        onChat={abrirChat}
        onRanking={abrirRanking}
        temPromptInstalar={temPromptInstalar}
      />

      {mostrarConfig && (
        <Config
          idioma={idioma}
          setarIdioma={setIdioma}
          som={som}
          setarSom={setSom}
          ambiente={ambiente}              // ⭐ NOVO
          setarAmbiente={setAmbiente}      // ⭐ NOVO
          volume={volume}
          setarVolume={setVolumeState}
          musica={musica}
          setarMusica={setMusica}
          tema={tema}
          setarTema={setTema}
          temPromptInstalar={temPromptInstalar}
          onFechar={() => setMostrarConfig(false)}
        />
      )}

      {mostrarChat && (
        <Chat idioma={idioma} usuario={usuarioParaChat} onFechar={() => setMostrarChat(false)} />
      )}

      {mostrarRanking && (
        <Ranking idioma={idioma} usuario={usuario} onFechar={() => setMostrarRanking(false)} />
      )}
    </>
  );
}
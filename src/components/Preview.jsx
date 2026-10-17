// src/components/Preview.jsx
import { useState, useEffect } from 'react';

const EMAIL_AUTORIZADO = 'williamssilva2133kk@gmail.com';

export default function Preview({ usuario, onVoltar }) {
  const [abaAtiva, setAbaAtiva] = useState(1);
  const [modoCaptura, setModoCaptura] = useState(false);
  const [dicaVisivel, setDicaVisivel] = useState(false);

  // Quando entra no modo captura, mostra dica por 3 segundos
  useEffect(() => {
    if (modoCaptura) {
      setDicaVisivel(true);
      const t = setTimeout(() => setDicaVisivel(false), 3000);
      return () => clearTimeout(t);
    } else {
      setDicaVisivel(false);
    }
  }, [modoCaptura]);

  if (!usuario || (usuario.email || '').toLowerCase() !== EMAIL_AUTORIZADO) {
    return (
      <div className="tela centro">
        <div className="painel" style={{ textAlign: 'center' }}>
          <h2 className="titulo-menor">🔒 Acesso Restrito</h2>
          <p className="subtitulo">Esta página é privada.</p>
          <button className="botao" onClick={onVoltar}>← Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`tela preview-tela ${modoCaptura ? 'modo-captura' : ''}`}>
      <header className="preview-header">
        <div className="preview-header-titulo">
          <span className="preview-logo">📖</span>
          <span>Guia do Projeto</span>
        </div>
        <div className="preview-header-acoes">
          <button
            className="botao preview-btn-capturar"
            onClick={() => setModoCaptura(true)}
          >
            📸 Capturar
          </button>
          <button className="botao preview-btn-voltar" onClick={onVoltar}>←</button>
        </div>
      </header>

      <nav className="preview-abas">
        <button className={abaAtiva === 1 ? 'aba-prev ativa' : 'aba-prev'} onClick={() => setAbaAtiva(1)}>
          <span className="num">1</span> Login
        </button>
        <button className={abaAtiva === 2 ? 'aba-prev ativa' : 'aba-prev'} onClick={() => setAbaAtiva(2)}>
          <span className="num">2</span> Criação
        </button>
        <button className={abaAtiva === 3 ? 'aba-prev ativa' : 'aba-prev'} onClick={() => setAbaAtiva(3)}>
          <span className="num">3</span> Jogo
        </button>
      </nav>

      <main className="preview-conteudo">
        {abaAtiva === 1 && <AbaLogin />}
        {abaAtiva === 2 && <AbaCriacao />}
        {abaAtiva === 3 && <AbaJogo />}
      </main>

      {/* ============ MODO CAPTURA ============ */}
      {modoCaptura && (
        <>
          <button
            className="captura-sair"
            onClick={() => setModoCaptura(false)}
            title="Sair do modo captura"
          >
            ✕ Sair
          </button>

          <div className="captura-tabs">
            <button
              className={abaAtiva === 1 ? 'ativa' : ''}
              onClick={() => setAbaAtiva(1)}
              title="Login"
            >1</button>
            <button
              className={abaAtiva === 2 ? 'ativa' : ''}
              onClick={() => setAbaAtiva(2)}
              title="Criação"
            >2</button>
            <button
              className={abaAtiva === 3 ? 'ativa' : ''}
              onClick={() => setAbaAtiva(3)}
              title="Jogo"
            >3</button>
          </div>

          {dicaVisivel && (
            <div className="captura-dica">
              📸 Tire o print agora
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ================================================================ */
/* ABA 1 — LOGIN                                                     */
/* ================================================================ */
function AbaLogin() {
  return (
    <div className="card-tela">
      <div className="card-topo">
        <span className="card-num">TELA 01</span>
        <h2 className="card-titulo">🔐 Login e Acesso</h2>
      </div>

      <div className="card-mockup">
        <div className="mini-painel-login">
          <div className="mini-titulo">PEDRAVERDE</div>
          <div className="mini-sub">um RPG de texto</div>
          <div className="mini-abas">
            <span className="mini-aba ativa">Entrar</span>
            <span className="mini-aba">Cadastrar</span>
          </div>
          <div className="mini-input">aventureiro@pedraverde.com</div>
          <div className="mini-input">••••••••</div>
          <div className="mini-btn primario">Entrar</div>
          <div className="mini-divisor">ou</div>
          <div className="mini-btn">Anônimo</div>
          <div className="mini-btn">Offline</div>
        </div>
      </div>

      <ul className="card-lista">
        <li><strong>Login com e-mail</strong> — save na nuvem (Firebase)</li>
        <li><strong>Anônimo</strong> — sem senha, save temporário</li>
        <li><strong>Offline</strong> — sem internet, save no dispositivo</li>
      </ul>

      <div className="card-destaque">
        🔥 Sincroniza entre dispositivos · regras de segurança no Firestore
      </div>
    </div>
  );
}

/* ================================================================ */
/* ABA 2 — CRIAÇÃO                                                   */
/* ================================================================ */
function AbaCriacao() {
  return (
    <div className="card-tela">
      <div className="card-topo">
        <span className="card-num">TELA 02</span>
        <h2 className="card-titulo">🧝 Criação de Personagem</h2>
      </div>

      <div className="card-mockup">
        <div className="mini-painel-criacao">
          <div className="mini-nome">
            Nome <span className="mini-nome-valor">Aelric</span>
          </div>

          <div className="mini-secao">Raça</div>
          <div className="mini-racas">
            <div className="mini-raca"><span>🧑</span>Humano</div>
            <div className="mini-raca ativa"><span>🧝</span>Elfo</div>
            <div className="mini-raca"><span>🧔</span>Anão</div>
            <div className="mini-raca"><span>👹</span>Orc</div>
            <div className="mini-raca"><span>🧒</span>Halfling</div>
          </div>

          <div className="mini-secao">Classe</div>
          <div className="mini-classes">
            <div className="mini-classe"><span>⚔</span>Guerreiro</div>
            <div className="mini-classe ativa"><span>🔮</span>Mago</div>
            <div className="mini-classe"><span>🗡</span>Ladino</div>
            <div className="mini-classe"><span>✨</span>Clérigo</div>
            <div className="mini-classe"><span>🏹</span>Arqueiro</div>
          </div>

          <div className="mini-stats">
            <div><span>HP</span><strong>27</strong></div>
            <div><span>MP</span><strong>55</strong></div>
            <div><span>ATK</span><strong>14</strong></div>
            <div><span>DEF</span><strong>3</strong></div>
          </div>

          <div className="mini-combo">🧝 Elfo · 🔮 Mago</div>
        </div>
      </div>

      <ul className="card-lista">
        <li><strong>5 raças × 5 classes</strong> = 25 combinações</li>
        <li><strong>Preview em tempo real</strong> dos atributos</li>
        <li><strong>Talentos por classe</strong> a cada 5 níveis</li>
      </ul>

      <div className="card-destaque">
        🔥 Cada build tem estilo próprio — Orc/Guerreiro, Elfo/Mago, Anão/Guerreiro…
      </div>
    </div>
  );
}

/* ================================================================ */
/* ABA 3 — JOGO                                                      */
/* ================================================================ */
function AbaJogo() {
  return (
    <div className="card-tela">
      <div className="card-topo">
        <span className="card-num">TELA 03</span>
        <h2 className="card-titulo">⚔ Tela de Jogo</h2>
      </div>

      <div className="card-mockup">
        <div className="mini-jogo">
          <div className="mini-status">
            <span>🧝 Aelric</span>
            <span>Nv 9</span>
            <span>◈ 145</span>
            <span className="mini-local">Floresta</span>
          </div>
          <div className="mini-barras">
            <div className="mini-barra"><div className="mini-hp" style={{ width: '70%' }} /><span>HP 42/60</span></div>
            <div className="mini-barra"><div className="mini-mp" style={{ width: '80%' }} /><span>MP 44/55</span></div>
          </div>
          <div className="mini-tempo">
            <span>🌧 Chuva</span><span>🌙 Noite</span><span>🕐 21:00</span>
          </div>
          <div className="mini-log">
            <div className="mini-linha jgd">› olhar</div>
            <div className="mini-linha lcl">◆ Floresta Sombria</div>
            <div className="mini-linha cmb">⚔ Lobo Selvagem surge!</div>
            <div className="mini-linha dan">⚔ Você causa 18 de dano.</div>
            <div className="mini-linha rec">💥 Lobo contra-ataca: 6.</div>
            <div className="mini-linha vic">☠ Lobo derrotado!</div>
            <div className="mini-linha lvl">✦ LEVEL UP! Nível 9.</div>
          </div>
          <div className="mini-chips">
            <span>olhar</span><span>mapa</span><span>status</span>
          </div>
          <div className="mini-entrada">
            <span>&gt;</span> digite um comando...
          </div>
        </div>
      </div>

      <ul className="card-lista">
        <li><strong>55+ comandos</strong> — olhar, ir, atacar, loja, magia…</li>
        <li><strong>Combate d20</strong> — 7 ações por turno</li>
        <li><strong>9 regiões · 12 chefes · 167 itens</strong></li>
      </ul>

      <div className="card-destaque">
        🔥 Tudo por texto · interface pensada pro celular
      </div>
    </div>
  );
}

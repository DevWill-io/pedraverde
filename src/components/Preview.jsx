// src/components/Preview.jsx
import { useState } from 'react';

/* ================================================================ */
/* ⚠️  TROQUE PELO SEU E-MAIL ABAIXO                                  */
/* ================================================================ */
const EMAIL_AUTORIZADO = 'TROQUE_PELO_SEU_EMAIL';

/* ================================================================ */
/* Componente principal                                              */
/* ================================================================ */
export default function Preview({ usuario, onVoltar }) {
  const [abaAtiva, setAbaAtiva] = useState(1);

  // Bloqueia acesso
  if (!usuario || usuario.email !== EMAIL_AUTORIZADO) {
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
    <div className="tela preview-tela">
      <header className="preview-header">
        <h1>📸 Preview de Apresentação</h1>
        <button className="botao" onClick={onVoltar}>← Voltar</button>
      </header>

      <nav className="preview-abas">
        <button
          className={abaAtiva === 1 ? 'aba-prev ativa' : 'aba-prev'}
          onClick={() => setAbaAtiva(1)}
        >
          <span className="num">1</span> Login
        </button>
        <button
          className={abaAtiva === 2 ? 'aba-prev ativa' : 'aba-prev'}
          onClick={() => setAbaAtiva(2)}
        >
          <span className="num">2</span> Criação
        </button>
        <button
          className={abaAtiva === 3 ? 'aba-prev ativa' : 'aba-prev'}
          onClick={() => setAbaAtiva(3)}
        >
          <span className="num">3</span> Jogo
        </button>
      </nav>

      <main className="preview-conteudo">
        {abaAtiva === 1 && <AbaLogin />}
        {abaAtiva === 2 && <AbaCriacao />}
        {abaAtiva === 3 && <AbaJogo />}
      </main>

      <footer className="preview-rodape">
        Print da tela {abaAtiva} · Pedraverde
      </footer>
    </div>
  );
}

/* ================================================================ */
/* Aba 1 — Login                                                     */
/* ================================================================ */
function AbaLogin() {
  return (
    <div className="preview-moldura preview-moldura-login">
      <div className="painel login">
        <h1 className="titulo">PEDRAVERDE</h1>
        <p className="subtitulo">um RPG de texto</p>

        <div className="abas">
          <button className="aba ativa">Entrar</button>
          <button className="aba">Cadastrar</button>
        </div>

        <div className="form">
          <label>
            E-mail
            <input type="email" defaultValue="aventureiro@pedraverde.com" readOnly />
          </label>
          <label>
            Senha
            <input type="password" defaultValue="••••••••" readOnly />
          </label>
          <button className="botao primario">Entrar</button>
        </div>

        <div className="divisor">ou</div>

        <button className="botao">Jogar como anônimo</button>
        <button className="botao">Jogar offline (sem nuvem)</button>
        <button className="botao botao-tutorial">📖 Tutorial</button>
      </div>
    </div>
  );
}

/* ================================================================ */
/* Aba 2 — Criação de personagem                                     */
/* ================================================================ */
function AbaCriacao() {
  const RACAS_MOCK = [
    { id: 'humano', emoji: '🧑', nome: 'Humano', desc: 'Versátil e ambicioso.', bonus: '+5 HP · +2 ATK · +2 DEF' },
    { id: 'elfo', emoji: '🧝', nome: 'Elfo', desc: 'Ágil e ligado à magia.', bonus: '+2 ATK · +1 DEF · +15 MP', ativa: true },
    { id: 'anao', emoji: '🧔', nome: 'Anão', desc: 'Resistente e teimoso.', bonus: '+15 HP · +1 ATK · +4 DEF' },
    { id: 'orc', emoji: '👹', nome: 'Orc', desc: 'Brutal e selvagem.', bonus: '+8 HP · +4 ATK' },
    { id: 'halfling', emoji: '🧒', nome: 'Halfling', desc: 'Pequeno e sortudo.', bonus: '+3 HP · +1 ATK · +3 DEF' },
  ];

  const CLASSES_MOCK = [
    { id: 'guerreiro', emoji: '⚔', nome: 'Guerreiro', desc: 'Corpo a corpo.', bonus: '+10 HP · +3 ATK · +3 DEF' },
    { id: 'mago', emoji: '🔮', nome: 'Mago', desc: 'Dano mágico.', bonus: '-5 HP · +30 MP', magias: '🔥 ⚡ ❄ 🛡', ativa: true },
    { id: 'ladino', emoji: '🗡', nome: 'Ladino', desc: 'Rápido e mortal.', bonus: '+2 ATK · +1 DEF · +10 MP' },
    { id: 'clerigo', emoji: '✨', nome: 'Clérigo', desc: 'Cura e protege.', bonus: '+5 HP · +2 DEF · +20 MP' },
    { id: 'arqueiro', emoji: '🏹', nome: 'Arqueiro', desc: 'Precisão à distância.', bonus: '+3 HP · +3 ATK · +1 DEF' },
  ];

  return (
    <div className="preview-moldura preview-moldura-criacao">
      <div className="painel painel-criacao">
        <h2 className="titulo-menor">Criação de Personagem</h2>
        <p className="subtitulo">Escolha quem você será em Pedraverde</p>

        <div className="form-criacao">
          <label className="campo-nome">
            Nome
            <input type="text" defaultValue="Aelric" readOnly />
          </label>

          <div className="secao-criacao">
            <div className="secao-titulo">Raça</div>
            <div className="grade-opcoes">
              {RACAS_MOCK.map((r) => (
                <div key={r.id} className={r.ativa ? 'card-opcao ativa' : 'card-opcao'}>
                  <div className="opcao-emoji">{r.emoji}</div>
                  <div className="opcao-nome">{r.nome}</div>
                  <div className="opcao-desc">{r.desc}</div>
                  <div className="opcao-bonus">{r.bonus}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="secao-criacao">
            <div className="secao-titulo">Classe</div>
            <div className="grade-opcoes">
              {CLASSES_MOCK.map((c) => (
                <div key={c.id} className={c.ativa ? 'card-opcao ativa' : 'card-opcao'}>
                  <div className="opcao-emoji">{c.emoji}</div>
                  <div className="opcao-nome">{c.nome}</div>
                  <div className="opcao-desc">{c.desc}</div>
                  <div className="opcao-bonus">{c.bonus}</div>
                  {c.magias && <div className="opcao-magias">{c.magias}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="preview-stats">
            <div className="preview-titulo">Atributos iniciais</div>
            <div className="preview-grid">
              <div><span className="p-label">HP</span> <span className="p-valor p-hp">27</span></div>
              <div><span className="p-label">Mana</span> <span className="p-valor p-mana">55</span></div>
              <div><span className="p-label">ATK</span> <span className="p-valor p-atk">14</span></div>
              <div><span className="p-label">DEF</span> <span className="p-valor p-def">3</span></div>
            </div>
            <div className="preview-combo">🧝 Elfo · 🔮 Mago</div>
          </div>

          <div className="botoes-criacao">
            <button className="botao">Cancelar</button>
            <button className="botao primario">Iniciar Aventura</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/* Aba 3 — Tela de jogo                                              */
/* ================================================================ */
function AbaJogo() {
  const LOG_MOCK = [
    { tipo: 'jogador', texto: '> olhar' },
    { tipo: 'local', texto: '◆ Floresta Sombria' },
    { tipo: 'sistema', texto: 'Árvores retorcidas filtram uma luz doentia. Olhos brilham entre as sombras.' },
    { tipo: 'tempo-info', texto: '🌧 Chuva · 🌙 Noite · 🕐 21:00' },
    { tipo: 'saidas', texto: 'Saídas: sul → Pedraverde · norte → Caverna · oeste → Pântano' },
    { tipo: 'separador', texto: '' },
    { tipo: 'jogador', texto: '> atacar' },
    { tipo: 'combate-inicio', texto: '⚔ Um Lobo Selvagem surge das sombras!' },
    { tipo: 'dano-causado', texto: '⚔ Você causa 18 de dano. (12/30 HP)' },
    { tipo: 'combate', texto: '  Seu modificador: +7 (d20+7)' },
    { tipo: 'dano-recebido', texto: '💥 Lobo contra-ataca: 6 de dano. (42/60 HP)' },
    { tipo: 'dano-causado', texto: '🗡 Lira: "Nas costas, vai!" ⚔ causa 12 de dano. (0/30 HP)' },
    { tipo: 'vitoria', texto: '☠ Lobo Selvagem derrotado em 3 turnos!' },
    { tipo: 'xp', texto: '+18 XP. (340/620)' },
    { tipo: 'loot', texto: 'Loot: Poção de Vida.' },
    { tipo: 'quest', texto: '📅 Missão diária completa: ⚔ Caçada Diária!' },
    { tipo: 'level-up', texto: '✦ LEVEL UP! Nível 9. (+5 HP, +1 ATK, +1 DEF, +3 Mana)' },
    { tipo: 'destaque', texto: '✦ Você subiu de nível! Confira "talentos" para pontos novos.' },
  ];

  return (
    <div className="preview-moldura preview-moldura-jogo">
      <div className="tela jogo">
        {/* Status bar */}
        <header className="status-bar">
          <div className="status-linha">
            <span className="tag nome">🧝 Aelric</span>
            <span className="tag">🔮 Mago</span>
            <span className="tag">Nv 9</span>
            <span className="tag">ATK 25</span>
            <span className="tag">DEF 15</span>
            <span className="tag moeda">◈ 145</span>
            <span className="tag tag-talento">★ 1</span>
            <span className="tag tag-campanha">🐸 3/8</span>
            <span className="tag local">Floresta Sombria</span>
          </div>
          <div className="barras">
            <div className="barra">
              <div className="barra-preenchimento hp-ok" style={{ width: '70%' }} />
              <span className="barra-texto">HP 42/60</span>
            </div>
            <div className="barra">
              <div className="barra-preenchimento mana" style={{ width: '80%' }} />
              <span className="barra-texto">MP 44/55</span>
            </div>
            <div className="barra">
              <div className="barra-preenchimento xp" style={{ width: '55%' }} />
              <span className="barra-texto">XP 340/620</span>
            </div>
          </div>

          <div className="faixa-tempo">
            <span className="tempo-tag clima-chuva">🌧 Chuva</span>
            <span className="tempo-tag periodo-noite">🌙 Noite</span>
            <span className="tempo-tag tempo-hora">🕐 21:00</span>
            <span className="tempo-tag tempo-dia">📅 Dia 12</span>
          </div>

          <div className="faixa-companheiro">
            <span className="comp-tag">🗡 Lira</span>
            <span className="comp-classe">Ladina</span>
            <span className="comp-afin">💞 18</span>
          </div>
        </header>

        {/* Log */}
        <main className="log">
          {LOG_MOCK.map((l, i) => (
            <div key={i} className={`linha ${l.tipo}`}>
              <span className="texto">{l.texto}</span>
            </div>
          ))}
        </main>

        {/* Chips */}
        <div className="atalhos">
          <button className="chip">olhar</button>
          <button className="chip">mapa</button>
          <button className="chip">clima</button>
          <button className="chip">status</button>
          <button className="chip chip-companheiro">☻ party</button>
          <button className="chip chip-limpar">limpar</button>
        </div>

        {/* Input */}
        <div className="entrada">
          <span className="prompt">&gt;</span>
          <input type="text" readOnly placeholder="digite um comando... (ajuda)" />
          <button className="botao primario">Enviar</button>
        </div>

        {/* Barra de botões */}
        <nav className="barra-botoes">
          <button>Salvar</button>
          <button>Carregar</button>
          <button>💬</button>
          <button>🏆</button>
          <button>📖</button>
          <button>⚙</button>
          <button>Slots</button>
          <button>Sair</button>
        </nav>
      </div>
    </div>
  );
}
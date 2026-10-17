// src/components/Preview.jsx
import { useState } from 'react';

/* ================================================================ */
/* ⚠️  E-MAIL AUTORIZADO A VER O GUIA                                */
/* ================================================================ */
const EMAIL_AUTORIZADO = 'williamssilva2133kk@gmail.com';

export default function Preview({ usuario, onVoltar }) {
  const [abaAtiva, setAbaAtiva] = useState(1);

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
    <div className="tela preview-tela">
      <header className="preview-header">
        <div>
          <h1>📖 Guia do Projeto — Pedraverde</h1>
          <p className="preview-header-sub">Apresentação interativa · 3 telas principais</p>
        </div>
        <button className="botao" onClick={onVoltar}>← Voltar</button>
      </header>

      <nav className="preview-abas">
        <button
          className={abaAtiva === 1 ? 'aba-prev ativa' : 'aba-prev'}
          onClick={() => setAbaAtiva(1)}
        >
          <span className="num">1</span>
          <span className="aba-prev-label">Login</span>
        </button>
        <button
          className={abaAtiva === 2 ? 'aba-prev ativa' : 'aba-prev'}
          onClick={() => setAbaAtiva(2)}
        >
          <span className="num">2</span>
          <span className="aba-prev-label">Criação</span>
        </button>
        <button
          className={abaAtiva === 3 ? 'aba-prev ativa' : 'aba-prev'}
          onClick={() => setAbaAtiva(3)}
        >
          <span className="num">3</span>
          <span className="aba-prev-label">Jogo</span>
        </button>
      </nav>

      <main className="preview-conteudo">
        {abaAtiva === 1 && <AbaLogin />}
        {abaAtiva === 2 && <AbaCriacao />}
        {abaAtiva === 3 && <AbaJogo />}
      </main>
    </div>
  );
}

/* ================================================================ */
/* ABA 1 — LOGIN                                                     */
/* ================================================================ */
function AbaLogin() {
  return (
    <div className="guia-tela">
      {/* Cabeçalho explicativo */}
      <div className="guia-cabecalho">
        <div className="guia-num">TELA 01</div>
        <h2 className="guia-titulo">🔐 Login e Acesso</h2>
        <p className="guia-descricao">
          A porta de entrada do Pedraverde. Aqui o jogador escolhe como quer se identificar
          antes de começar a aventura. O jogo funciona <strong>100% offline</strong> — você
          pode jogar sem internet, salvando tudo no dispositivo.
        </p>
      </div>

      {/* Mockup da tela */}
      <div className="guia-mockup guia-mockup-login">
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

      {/* O que se faz aqui */}
      <div className="guia-secao">
        <h3 className="guia-secao-titulo">🎯 O que você pode fazer aqui</h3>
        <ul className="guia-lista">
          <li>
            <strong>Criar conta com e-mail</strong> — saves sincronizados na nuvem
            entre dispositivos.
          </li>
          <li>
            <strong>Jogar como anônimo</strong> — entra sem senha, save temporário
            vinculado ao navegador.
          </li>
          <li>
            <strong>Jogar offline</strong> — sem Firebase, save só no próprio aparelho.
            Ideal pra testar ou jogar sem internet.
          </li>
          <li>
            <strong>Ler o tutorial</strong> — guia completo do jogo com 11 seções
            (comandos, combate, magias, crafting…).
          </li>
        </ul>
      </div>

      {/* Destaque */}
      <div className="guia-destaque">
        <span className="guia-destaque-icone">💡</span>
        <div>
          <strong>Destaque técnico:</strong> login com Firebase Authentication.
          Os saves são armazenados no Firestore com regras de segurança que garantem
          que cada jogador só acessa os próprios dados.
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/* ABA 2 — CRIAÇÃO DE PERSONAGEM                                     */
/* ================================================================ */
function AbaCriacao() {
  const RACAS_MOCK = [
    { emoji: '🧑', nome: 'Humano', desc: 'Versátil e ambicioso.', bonus: '+5 HP · +2 ATK · +2 DEF' },
    { emoji: '🧝', nome: 'Elfo', desc: 'Ágil e ligado à magia.', bonus: '+2 ATK · +1 DEF · +15 MP', ativa: true },
    { emoji: '🧔', nome: 'Anão', desc: 'Resistente e teimoso.', bonus: '+15 HP · +1 ATK · +4 DEF' },
    { emoji: '👹', nome: 'Orc', desc: 'Brutal e selvagem.', bonus: '+8 HP · +4 ATK' },
    { emoji: '🧒', nome: 'Halfling', desc: 'Pequeno e sortudo.', bonus: '+3 HP · +1 ATK · +3 DEF' },
  ];

  const CLASSES_MOCK = [
    { emoji: '⚔', nome: 'Guerreiro', desc: 'Corpo a corpo.', bonus: '+10 HP · +3 ATK · +3 DEF' },
    { emoji: '🔮', nome: 'Mago', desc: 'Dano mágico.', bonus: '-5 HP · +30 MP', magias: '🔥 ⚡ ❄ 🛡', ativa: true },
    { emoji: '🗡', nome: 'Ladino', desc: 'Rápido e mortal.', bonus: '+2 ATK · +1 DEF · +10 MP' },
    { emoji: '✨', nome: 'Clérigo', desc: 'Cura e protege.', bonus: '+5 HP · +2 DEF · +20 MP' },
    { emoji: '🏹', nome: 'Arqueiro', desc: 'Precisão à distância.', bonus: '+3 HP · +3 ATK · +1 DEF' },
  ];

  return (
    <div className="guia-tela">
      <div className="guia-cabecalho">
        <div className="guia-num">TELA 02</div>
        <h2 className="guia-titulo">🧝 Criação de Personagem</h2>
        <p className="guia-descricao">
          Aqui começa a jornada. O jogador escolhe o nome, a <strong>raça</strong> e a{' '}
          <strong>classe</strong> do herói. Cada combinação gera atributos iniciais
          diferentes — e um estilo de jogo próprio. São <strong>5 raças × 5 classes = 25
          combinações possíveis</strong>.
        </p>
      </div>

      <div className="guia-mockup guia-mockup-criacao">
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
                  <div key={r.nome} className={r.ativa ? 'card-opcao ativa' : 'card-opcao'}>
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
                  <div key={c.nome} className={c.ativa ? 'card-opcao ativa' : 'card-opcao'}>
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

      <div className="guia-secao">
        <h3 className="guia-secao-titulo">🎯 O que você pode fazer aqui</h3>
        <ul className="guia-lista">
          <li><strong>Escolher a raça</strong> — define bônus iniciais de HP, ATK, DEF e MP.</li>
          <li><strong>Escolher a classe</strong> — define as magias iniciais e o estilo (tanque, mago, DPS, suporte).</li>
          <li><strong>Ver preview em tempo real</strong> — os atributos mudam conforme você troca raça ou classe.</li>
          <li><strong>Bônus por nível</strong> — cada 5 níveis o jogador escolhe talentos únicos da classe.</li>
        </ul>
      </div>

      <div className="guia-destaque">
        <span className="guia-destaque-icone">💡</span>
        <div>
          <strong>Combinações populares:</strong> <em>Orc + Guerreiro</em> para dano bruto,{' '}
          <em>Elfo + Mago</em> para magia pura, <em>Anão + Guerreiro</em> para aguentar porrada.
          Não existe build "errada" — cada uma tem um caminho.
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/* ABA 3 — JOGO                                                      */
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
    { tipo: 'dano-recebido', texto: '💥 Lobo contra-ataca: 6 de dano. (42/60 HP)' },
    { tipo: 'dano-causado', texto: '🗡 Lira: "Nas costas, vai!" ⚔ causa 12 de dano. (0/30 HP)' },
    { tipo: 'vitoria', texto: '☠ Lobo Selvagem derrotado em 3 turnos!' },
    { tipo: 'xp', texto: '+18 XP. (340/620)' },
    { tipo: 'loot', texto: 'Loot: Poção de Vida.' },
    { tipo: 'quest', texto: '📅 Missão diária completa: ⚔ Caçada Diária!' },
    { tipo: 'level-up', texto: '✦ LEVEL UP! Nível 9. (+5 HP, +1 ATK, +1 DEF, +3 Mana)' },
  ];

  return (
    <div className="guia-tela">
      <div className="guia-cabecalho">
        <div className="guia-num">TELA 03</div>
        <h2 className="guia-titulo">⚔ Tela de Jogo — Terminal Medieval</h2>
        <p className="guia-descricao">
          O coração do jogo. Um <strong>terminal retrô</strong> onde o jogador digita
          comandos de texto e o jogo responde em tempo real. Tudo acontece no log
          central, com cores diferentes por tipo de mensagem. A interface foi pensada
          para dar a sensação de estar jogando um RPG de mesa em um terminal antigo.
        </p>
      </div>

      <div className="guia-mockup guia-mockup-jogo">
        <div className="tela jogo">
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

          <main className="log">
            {LOG_MOCK.map((l, i) => (
              <div key={i} className={`linha ${l.tipo}`}>
                <span className="texto">{l.texto}</span>
              </div>
            ))}
          </main>

          <div className="atalhos">
            <button className="chip">olhar</button>
            <button className="chip">mapa</button>
            <button className="chip">clima</button>
            <button className="chip">status</button>
            <button className="chip chip-companheiro">☻ party</button>
            <button className="chip chip-limpar">limpar</button>
          </div>

          <div className="entrada">
            <span className="prompt">&gt;</span>
            <input type="text" readOnly placeholder="digite um comando... (ajuda)" />
            <button className="botao primario">Enviar</button>
          </div>

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

      <div className="guia-secao">
        <h3 className="guia-secao-titulo">🎯 O que você pode fazer aqui</h3>
        <ul className="guia-lista">
          <li>
            <strong>Digitar comandos</strong> — <code>olhar</code>, <code>ir norte</code>,{' '}
            <code>atacar</code>, <code>loja</code>, <code>inventario</code>… mais de 55 no total.
          </li>
          <li>
            <strong>Combate tático</strong> — 7 ações por turno (atacar, forte, rápido,
            defender, esquivar, focar, fugir) com sistema de dado d20.
          </li>
          <li>
            <strong>Explorar 9 regiões</strong> — da vila inicial até o castelo do Rei
            Antigo, com bloqueio por nível.
          </li>
          <li>
            <strong>Enfrentar chefes únicos</strong> — cada um com padrão de ataque
            próprio (o Troll faz Golpe Terra a cada 3 turnos, o Dragão exala Sopro de Fogo…).
          </li>
          <li>
            <strong>Coletar 167 itens</strong> — armas, armaduras, poções, gemas, em 6
            raridades (do comum ao mítico).
          </li>
          <li>
            <strong>Craftar e encantar</strong> — 28 receitas de forja e 5 encantamentos
            elementais.
          </li>
          <li>
            <strong>Companheiro ativo</strong> — Lira, Borin, Elyra ou Kael lutam ao seu
            lado e evoluem com afinidade.
          </li>
          <li>
            <strong>Sistema dia/noite e clima</strong> — chuva, tempestade, neve e nevoeiro
            alteram o combate em tempo real.
          </li>
        </ul>
      </div>

      <div className="guia-destaque">
        <span className="guia-destaque-icone">💡</span>
        <div>
          <strong>Interface pensada para mobile:</strong> barras de status coloridas,
          chips de atalho, log rolável com limite de linhas e input fixo no rodapé —
          tudo para caber no celular sem esmagar.
        </div>
      </div>
    </div>
  );
}

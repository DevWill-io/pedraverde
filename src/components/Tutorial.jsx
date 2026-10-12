// src/components/Tutorial.jsx
import { useState } from 'react';

const SECOES = [
  { id: 'boasvindas', titulo: 'Boas-vindas', emoji: '🎮' },
  { id: 'criacao', titulo: 'Criação', emoji: '🧝' },
  { id: 'comandos', titulo: 'Comandos', emoji: '⌨' },
  { id: 'combate', titulo: 'Combate', emoji: '⚔' },
  { id: 'magias', titulo: 'Magias', emoji: '🔮' },
  { id: 'talentos', titulo: 'Talentos', emoji: '🌟' },
  { id: 'conquistas', titulo: 'Conquistas', emoji: '🏆' },
  { id: 'crafting', titulo: 'Crafting', emoji: '⚒' },
  { id: 'mapa', titulo: 'Mapa', emoji: '🗺' },
  { id: 'progressao', titulo: 'Progressão', emoji: '📈' },
  { id: 'dicas', titulo: 'Dicas', emoji: '💡' },
];

export default function Tutorial({ onVoltar }) {
  const [secaoAtiva, setSecaoAtiva] = useState('boasvindas');

  return (
    <div className="tela tutorial">
      <header className="tutorial-header">
        <h1 className="tutorial-titulo">📖 Tutorial — Pedraverde</h1>
        <button className="botao" onClick={onVoltar}>← Voltar</button>
      </header>

      <nav className="tutorial-tabs">
        {SECOES.map((s) => (
          <button
            key={s.id}
            className={secaoAtiva === s.id ? 'tut-tab ativa' : 'tut-tab'}
            onClick={() => setSecaoAtiva(s.id)}
          >
            <span className="tut-tab-emoji">{s.emoji}</span>
            <span className="tut-tab-nome">{s.titulo}</span>
          </button>
        ))}
      </nav>

      <main className="tutorial-conteudo">
        {secaoAtiva === 'boasvindas' && <SecaoBoasVindas />}
        {secaoAtiva === 'criacao' && <SecaoCriacao />}
        {secaoAtiva === 'comandos' && <SecaoComandos />}
        {secaoAtiva === 'combate' && <SecaoCombate />}
        {secaoAtiva === 'magias' && <SecaoMagias />}
        {secaoAtiva === 'talentos' && <SecaoTalentos />}
        {secaoAtiva === 'conquistas' && <SecaoConquistas />}
        {secaoAtiva === 'crafting' && <SecaoCrafting />}
        {secaoAtiva === 'mapa' && <SecaoMapa />}
        {secaoAtiva === 'progressao' && <SecaoProgressao />}
        {secaoAtiva === 'dicas' && <SecaoDicas />}
      </main>
    </div>
  );
}

/* ================================================================== */
/* SEÇÕES                                                              */
/* ================================================================== */

function SecaoBoasVindas() {
  return (
    <div className="tut-secao">
      <h2>🎮 Bem-vindo a Pedraverde</h2>
      <p>Pedraverde é um <strong>RPG de texto</strong> jogável no navegador. Você digita comandos em um terminal retrô e recebe respostas em texto. Tudo é narrado — cabe a você imaginar o mundo.</p>

      <h3>Como funciona</h3>
      <ul>
        <li>Você <strong>cria um personagem</strong> escolhendo raça e classe</li>
        <li>Explora um mundo com <strong>9 regiões</strong> e <strong>35+ locais</strong></li>
        <li>Enfrenta <strong>23 tipos de inimigos</strong>, incluindo <strong>12 chefes</strong></li>
        <li>Coleta itens, forja equipamentos, aprende magias</li>
        <li>Escolhe <strong>talentos</strong> a cada 5 níveis</li>
        <li>Desbloqueia <strong>conquistas</strong> e <strong>títulos</strong></li>
        <li>Sobe de nível, completa quests e derrota o <strong>Rei Antigo</strong></li>
      </ul>

      <h3>O terminal</h3>
      <p>Todo o jogo acontece num <strong>log rolável</strong>. Cada linha tem uma cor e um ícone que indicam o tipo de mensagem:</p>
      <ul>
        <li><span className="tut-prefixo">&gt;</span> Comando que você digitou</li>
        <li><span className="tut-prefixo azul">◆</span> Títulos, destaques, itens</li>
        <li><span className="tut-prefixo verde">✓</span> Sucesso</li>
        <li><span className="tut-prefixo vermelho">✗</span> Erro ou dano recebido</li>
        <li><span className="tut-prefixo amarelo">⚔</span> Combate, dano causado</li>
        <li><span className="tut-prefixo roxo">✦</span> Magia, level up, loot raro</li>
        <li><span className="tut-prefixo amarelo">🏆</span> Conquista desbloqueada</li>
        <li><span className="tut-prefixo amarelo">★</span> Talento disponível</li>
      </ul>

      <h3>Primeiros passos</h3>
      <ol>
        <li>Crie seu personagem (nome, raça, classe)</li>
        <li>Digite <code>ajuda</code> para ver os comandos</li>
        <li>Digite <code>olhar</code> para descrever onde você está</li>
        <li>Digite <code>mapa</code> para ver o mundo</li>
        <li>Digite <code>ir norte</code> para começar a explorar</li>
      </ol>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> a qualquer momento você pode clicar nos <em>chips</em> abaixo do log para preencher automaticamente o comando. Aperte <strong>↑</strong> e <strong>↓</strong> para navegar pelo histórico.
      </div>
    </div>
  );
}

function SecaoCriacao() {
  return (
    <div className="tut-secao">
      <h2>🧝 Criação de Personagem</h2>
      <p>Ao iniciar um novo jogo, você escolhe três coisas: <strong>nome</strong>, <strong>raça</strong> e <strong>classe</strong>. A combinação define seus atributos iniciais.</p>

      <h3>Raças</h3>
      <table className="tut-tabela">
        <thead>
          <tr><th>Raça</th><th>Foco</th><th>Bônus</th></tr>
        </thead>
        <tbody>
          <tr><td>🧑 Humano</td><td>Equilibrado</td><td>+5 HP, +2 ATK, +2 DEF, +5 MP</td></tr>
          <tr><td>🧝 Elfo</td><td>Magia</td><td>+3 ATK, +1 DEF, +15 MP</td></tr>
          <tr><td>🧔 Anão</td><td>Tanque</td><td>+15 HP, +1 ATK, +4 DEF, -5 MP</td></tr>
          <tr><td>👹 Orc</td><td>Dano bruto</td><td>+8 HP, +5 ATK, -5 MP</td></tr>
          <tr><td>🧒 Halfling</td><td>Esquiva</td><td>+3 HP, +1 ATK, +3 DEF, +5 MP</td></tr>
        </tbody>
      </table>

      <h3>Classes</h3>
      <table className="tut-tabela">
        <thead>
          <tr><th>Classe</th><th>Estilo</th><th>Bônus</th><th>Magias</th></tr>
        </thead>
        <tbody>
          <tr><td>⚔ Guerreiro</td><td>Corpo a corpo</td><td>+10 HP, +3 ATK, +3 DEF</td><td>Investida</td></tr>
          <tr><td>🔮 Mago</td><td>Dano mágico</td><td>-5 HP, +30 MP</td><td>Bola de Fogo, Raio, Toque Gélido, Escudo</td></tr>
          <tr><td>🗡 Ladino</td><td>Furtivo</td><td>+2 ATK, +1 DEF, +10 MP</td><td>Ataque Furtivo</td></tr>
          <tr><td>✨ Clérigo</td><td>Suporte</td><td>+5 HP, +1 ATK, +2 DEF, +20 MP</td><td>Cura, Escudo, Bênção</td></tr>
          <tr><td>🏹 Arqueiro</td><td>Precisão</td><td>+3 HP, +4 ATK, +1 DEF, +10 MP</td><td>Tiro Certeiro</td></tr>
        </tbody>
      </table>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> não existe combinação "errada". Cada raça e classe tem um estilo diferente. Se quer dano bruto: <strong>Orc + Guerreiro</strong>. Se quer magia pura: <strong>Elfo + Mago</strong>. Se quer sobreviver: <strong>Anão + Guerreiro</strong>.
      </div>
    </div>
  );
}

function SecaoComandos() {
  return (
    <div className="tut-secao">
      <h2>⌨ Comandos Básicos</h2>

      <h3>Exploração</h3>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>ajuda</code></td><td>Lista todos os comandos</td></tr>
          <tr><td><code>olhar</code></td><td>Descreve o local onde você está</td></tr>
          <tr><td><code>mapa</code></td><td>Mostra o mundo agrupado por regiões</td></tr>
          <tr><td><code>ir norte/sul/leste/oeste</code></td><td>Viaja para o local na direção</td></tr>
          <tr><td><code>pegar</code></td><td>Pega item do chão</td></tr>
          <tr><td><code>descansar</code></td><td>Recupera HP e MP (só em local seguro)</td></tr>
        </tbody>
      </table>

      <h3>Itens e equipamento</h3>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>inventario</code></td><td>Lista seus itens</td></tr>
          <tr><td><code>examinar &lt;item&gt;</code></td><td>Detalhes completos de um item</td></tr>
          <tr><td><code>equipar &lt;item&gt;</code></td><td>Equipa arma/armadura (8 slots)</td></tr>
          <tr><td><code>desequipar &lt;slot&gt;</code></td><td>Remove item equipado</td></tr>
          <tr><td><code>usar &lt;item&gt;</code></td><td>Usa consumível (poção, comida, pergaminho)</td></tr>
          <tr><td><code>status</code></td><td>Mostra atributos completos</td></tr>
        </tbody>
      </table>

      <h3>Social e economia</h3>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>falar</code></td><td>Conversa com o NPC do local</td></tr>
          <tr><td><code>loja</code></td><td>Abre a loja do local</td></tr>
          <tr><td><code>comprar &lt;item|número&gt;</code></td><td>Compra item (preço cheio)</td></tr>
          <tr><td><code>vender &lt;item|número&gt;</code></td><td>Vende item (metade do preço)</td></tr>
        </tbody>
      </table>

      <h3>Quests e progresso</h3>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>quests</code></td><td>Lista quests ativas, disponíveis e completas</td></tr>
          <tr><td><code>aceitar &lt;título&gt;</code></td><td>Aceita uma quest</td></tr>
          <tr><td><code>talentos</code></td><td>Mostra a árvore de talentos da sua classe</td></tr>
          <tr><td><code>escolher &lt;nível&gt; &lt;1|2&gt;</code></td><td>Escolhe um talento</td></tr>
          <tr><td><code>conquistas</code></td><td>Catálogo de conquistas e títulos</td></tr>
          <tr><td><code>titulo &lt;nome&gt;</code></td><td>Equipa um título</td></tr>
          <tr><td><code>bestiario</code></td><td>Catálogo de inimigos que você já matou</td></tr>
          <tr><td><code>diario</code></td><td>Estatísticas completas da sua jornada</td></tr>
        </tbody>
      </table>

      <h3>Sistema</h3>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>salvar</code></td><td>Salva no slot atual (local + nuvem)</td></tr>
          <tr><td><code>carregar</code></td><td>Carrega o slot atual</td></tr>
          <tr><td><code>limpar</code></td><td>Limpa o log</td></tr>
          <tr><td><code>sair</code></td><td>Despedida</td></tr>
          <tr><td><code>tutorial</code></td><td>Abre esta tela de ajuda</td></tr>
        </tbody>
      </table>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> aperte <strong>↑</strong> e <strong>↓</strong> no campo de input para navegar pelo histórico de comandos.
      </div>
    </div>
  );
}

function SecaoCombate() {
  return (
    <div className="tut-secao">
      <h2>⚔ Combate Tático</h2>
      <p>Quando um inimigo aparece, você entra em combate por turnos. A cada turno você <strong>escolhe uma ação</strong> — e cada ação tem prós e contras.</p>

      <h3>Como o dano é calculado</h3>
      <p>O combate usa <strong>dado de 20 faces</strong> (d20), como em RPGs de mesa:</p>
      <p style={{ color: '#ffd166', fontWeight: 'bold' }}>
        dano = d20 + modificador − (DEF do alvo ÷ 2)
      </p>
      <p>Seu <strong>modificador</strong> é calculado assim: <code>(ATK − 10) ÷ 2</code>. Ou seja, cada 2 pontos de ATK vale +1 no dado.</p>

      <h3>Regras especiais do d20</h3>
      <ul>
        <li><strong style={{ color: '#ff6b6b' }}>Tirou 1:</strong> Falha crítica. Você erra o ataque, mesmo se tiver bônus altíssimo.</li>
        <li><strong style={{ color: '#7ee787' }}>Tirou 20:</strong> Crítico natural! O dano dobra automaticamente.</li>
      </ul>

      <h3>Ações do combate</h3>
      <table className="tut-tabela">
        <thead>
          <tr><th>Ação</th><th>Efeito</th><th>Risco</th></tr>
        </thead>
        <tbody>
          <tr><td><code>atacar</code></td><td>Rola d20 + modificador normalmente</td><td>Nenhum</td></tr>
          <tr><td><code>forte</code></td><td>Dano ×1.5</td><td>30% de errar</td></tr>
          <tr><td><code>rapido</code></td><td>Dano −2</td><td>Nenhum (ataque leve)</td></tr>
          <tr><td><code>defender</code></td><td>Não ataca; reduz 60% do dano recebido</td><td>Perde o ataque</td></tr>
          <tr><td><code>esquivar</code></td><td>Não ataca; 50% de evitar ataque</td><td>Perde o ataque</td></tr>
          <tr><td><code>focar</code></td><td>Não ataca; próximo ataque é CRÍTICO (dobra)</td><td>Perde o ataque</td></tr>
          <tr><td><code>magia &lt;nome&gt;</code></td><td>Lance uma magia (gasta MP)</td><td>Gasta mana</td></tr>
          <tr><td><code>usar &lt;item&gt;</code></td><td>Usa poção/pergaminho</td><td>Gasta item</td></tr>
          <tr><td><code>fugir</code></td><td>50% de escapar</td><td>Chefes não fogem</td></tr>
        </tbody>
      </table>

      <h3>Combo tático sugerido</h3>
      <ol>
        <li><strong>Turno 1:</strong> <code>defender</code> — aguenta a investida do inimigo</li>
        <li><strong>Turno 2:</strong> <code>focar</code> — prepara o crítico</li>
        <li><strong>Turno 3:</strong> <code>forte</code> — dano ×1.5 com crítico = devastador</li>
      </ol>

      <h3>IA Reativa</h3>
      <p>Os inimigos <strong>veem o que você fez</strong> e respondem:</p>
      <ul>
        <li>Se você <code>focar</code>, ele tem <strong>65% de chance de defender</strong> (a jogada certa)</li>
        <li>Se você <code>defender</code>, ele pode <strong>focar</strong> para quebrar sua defesa</li>
        <li>Se você <code>esquivar</code>, ele tenta <strong>atacar</strong> mais vezes</li>
        <li>Se você <code>usar</code> item, ele <strong>aproveita a brecha</strong> e ataca</li>
      </ul>

      <h3>Arquétipos de inimigo</h3>
      <ul>
        <li><strong>Agressivo</strong> (lobo, bandido, pirata): ataca sempre, raramente defende</li>
        <li><strong>Defensivo</strong> (golem, guarda): defende e esquiva muito</li>
        <li><strong>Tático</strong> (goblin, esqueleto): equilibrado, usa focar</li>
        <li><strong>Bestial</strong> (rato, aranha): imprevisível</li>
        <li><strong>Mágico</strong> (cultista, mago negro): foca e usa ataques mágicos</li>
      </ul>

      <h3>Chefes com padrões únicos</h3>
      <ul>
        <li><strong>Troll:</strong> <code>atacar → atacar → GOLPE TERRA</code> (dano ×2 a cada 3 turnos)</li>
        <li><strong>Bruxa:</strong> conjura <em>Magia Sombria</em> e se cura com <em>Cura Sombria</em></li>
        <li><strong>Dragão Ancião:</strong> exala <em>Sopro de Fogo</em> (aplica queimadura)</li>
        <li><strong>Múmia:</strong> lança <em>Maldição</em> (fraqueza + sangramento)</li>
        <li><strong>Rei Antigo:</strong> rotação complexa de 5 ações diferentes</li>
      </ul>

      <p>Chefes <strong>ENFURECEM</strong> abaixo de 50% de HP (+2 ATK em todos os golpes).</p>

      <h3>Inimigos fogem</h3>
      <p>Inimigos não-chefes têm <strong>35% de chance de fugir</strong> com HP abaixo de 20%. Você ganha 30% do XP pela escaramuça.</p>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> economize poções para emergências. Se HP cair muito, use <code>usar pocao</code> em vez de atacar — ainda vale a pena.
      </div>
    </div>
  );
}

function SecaoMagias() {
  return (
    <div className="tut-secao">
      <h2>🔮 Magias e Mana</h2>
      <p>Algumas classes têm acesso a <strong>magias</strong>. Cada magia custa uma quantidade de <strong>Mana (MP)</strong> — e MP só é restaurado ao descansar, ao usar Elixir de Mana ou ao subir de nível.</p>

      <h3>Magias disponíveis</h3>
      <table className="tut-tabela">
        <thead>
          <tr><th>Magia</th><th>Custo</th><th>Efeito</th></tr>
        </thead>
        <tbody>
          <tr><td>🔥 Bola de Fogo</td><td>12 MP</td><td>Dano alto, ignora DEF</td></tr>
          <tr><td>⚡ Raio</td><td>10 MP</td><td>Dano médio, 35% de atordoar</td></tr>
          <tr><td>❄ Toque Gélido</td><td>8 MP</td><td>Dano baixo, 50% de congelar</td></tr>
          <tr><td>⚔ Investida</td><td>8 MP</td><td>Ataque ×1.8 que nunca erra</td></tr>
          <tr><td>🗡 Ataque Furtivo</td><td>10 MP</td><td>Dano ×2 que ignora DEF</td></tr>
          <tr><td>🏹 Tiro Certeiro</td><td>8 MP</td><td>Dano ×1.5 que ignora DEF</td></tr>
          <tr><td>✚ Cura</td><td>10 MP</td><td>Restaura 20 HP</td></tr>
          <tr><td>🛡 Escudo Mágico</td><td>10 MP</td><td>+5 DEF por 3 turnos</td></tr>
          <tr><td>✨ Bênção</td><td>15 MP</td><td>+3 ATK e +3 DEF por 3 turnos</td></tr>
        </tbody>
      </table>

      <h3>Como usar</h3>
      <ol>
        <li>Em combate, clique em <strong>✦ magia</strong> na barra de atalhos</li>
        <li>Escolha uma magia no painel que abre</li>
        <li>Ou digite <code>magia bola_fogo</code></li>
      </ol>

      <p>Para ver suas magias fora de combate, digite <code>magias</code>.</p>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> magias que ignoram DEF são ótimas contra inimigos com DEF alta (golems, cavaleiros). Magias com chance de atordoar/congelar fazem o inimigo <em>perder o turno</em> — combinado com <code>focar</code> + <code>forte</code>, é devastador.
      </div>
    </div>
  );
}

function SecaoTalentos() {
  return (
    <div className="tut-secao">
      <h2>🌟 Talentos</h2>
      <p>A partir do nível <strong>5</strong>, você ganha <strong>1 ponto de talento a cada 5 níveis</strong> (Nv 5, 10, 15, 20). Cada ponto permite escolher 1 de 2 talentos exclusivos da sua classe.</p>

      <h3>Comandos</h3>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>talentos</code></td><td>Mostra a árvore de talentos da sua classe</td></tr>
          <tr><td><code>escolher &lt;nível&gt; &lt;1|2&gt;</code></td><td>Escolhe um talento. Ex: <code>escolher 5 1</code></td></tr>
          <tr><td><code>escolher &lt;id do talento&gt;</code></td><td>Alternativa. Ex: <code>escolher furia</code></td></tr>
        </tbody>
      </table>

      <h3>Exemplos por classe</h3>
      <table className="tut-tabela">
        <thead>
          <tr><th>Classe</th><th>Talentos de Nv 5</th></tr>
        </thead>
        <tbody>
          <tr><td>⚔ Guerreiro</td><td>🔥 Fúria (+50% dano com HP baixo) <em>ou</em> 🛡 Resistência (+4 DEF)</td></tr>
          <tr><td>🔮 Mago</td><td>🌀 Metamagia (magias -20% MP) <em>ou</em> 🎯 Foco Arcano (+3 dano mágico)</td></tr>
          <tr><td>🗡 Ladino</td><td>👤 Furtividade (+4 DEF) <em>ou</em> 🗡 Assassino (crítico 3×)</td></tr>
          <tr><td>✨ Clérigo</td><td>🙏 Fé (curas +30%) <em>ou</em> ⚖ Julgamento (+50% vs mortos-vivos)</td></tr>
          <tr><td>🏹 Arqueiro</td><td>🏹 Tiro Rápido (20% de 2 ataques) <em>ou</em> 🎯 Mira Letal (+5 ATK)</td></tr>
        </tbody>
      </table>

      <h3>Tipos de talento</h3>
      <ul>
        <li><strong>Bônus diretos:</strong> +ATK, +DEF, +HP, +MP (permanentes)</li>
        <li><strong>Comportamentos:</strong> chances de atacar duas vezes, esquivar mais, regenerar, etc.</li>
        <li><strong>Efeitos únicos:</strong> Fúria (dano maior com HP baixo), Assassino (crítico 3×), Segunda Chance (revive uma vez)</li>
      </ul>

      <h3>Como saber quando há ponto disponível</h3>
      <ul>
        <li>No header, aparece um badge <strong>★ 1</strong> (pulsando)</li>
        <li>Na barra de atalhos, aparece o chip <strong>★ talentos</strong></li>
        <li>No log, aparece <em>"★ Você ganhou 1 ponto de talento!"</em></li>
      </ul>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> não existe talento "errado". Eles mudam o <strong>estilo de jogo</strong>. Fúria faz você arriscar mais com HP baixo. Resistência te torna um tanque. A escolha depende do que você gosta.
      </div>
    </div>
  );
}

function SecaoConquistas() {
  return (
    <div className="tut-secao">
      <h2>🏆 Conquistas e Títulos</h2>
      <p>Você desbloqueia <strong>45 conquistas</strong> ao cumprir marcos do jogo. Cada uma dá um <strong>bônus permanente</strong> (ATK, DEF, HP ou MP) — então quanto mais você joga, mais forte fica.</p>

      <h3>Comandos</h3>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>conquistas</code></td><td>Lista todas as conquistas e progresso</td></tr>
          <tr><td><code>titulo &lt;nome&gt;</code></td><td>Equipa um título (ex: <code>titulo Lenda</code>)</td></tr>
          <tr><td><code>titulo nenhum</code></td><td>Remove o título atual</td></tr>
        </tbody>
      </table>

      <h3>Categorias</h3>
      <table className="tut-tabela">
        <thead>
          <tr><th>Categoria</th><th>Exemplos</th></tr>
        </thead>
        <tbody>
          <tr><td>📈 Progressão</td><td>Aprendiz, Veterano, Lenda, Imortal (por nível)</td></tr>
          <tr><td>⚔ Combate</td><td>Primeiro Sangue, Caçador, Exterminador (por kills)</td></tr>
          <tr><td>👑 Chefes</td><td>Matador de Trolls, Matador de Dragões, Lenda de Pedraverde</td></tr>
          <tr><td>🗺 Exploração</td><td>Andarilho, Explorador, Conquistador (locais visitados)</td></tr>
          <tr><td>🎒 Itens</td><td>Colecionador, Bem Equipado, Forjador</td></tr>
          <tr><td>💰 Economia</td><td>Bolso Cheio, Rico, Magnata, Tesoureiro</td></tr>
          <tr><td>🎲 Eventos</td><td>Aventureiro, Fênix, Árvore Completa</td></tr>
        </tbody>
      </table>

      <h3>Títulos</h3>
      <p>Algumas conquistas desbloqueiam <strong>títulos</strong> que você pode equipar. O título aparece ao lado do seu nome no header e dá status. Exemplos:</p>
      <ul>
        <li>⚔ <em>Veterano</em> — nível 10</li>
        <li>🏆 <em>Herói</em> — nível 15</li>
        <li>👑 <em>Lenda</em> — nível 20</li>
        <li>🐉 <em>Matador de Dragões</em> — derrote o Dragão Ancião</li>
        <li>🏰 <em>Lenda de Pedraverde</em> — derrote o Rei Antigo</li>
        <li>🌟 <em>Imortal</em> — nível 50</li>
      </ul>

      <h3>Notificação</h3>
      <p>Ao desbloquear uma conquista, aparece no log:</p>
      <p><span style={{ color: '#ffd166' }}>🏆 Conquista desbloqueada: 🐉 Matador de Dragões</span></p>
      <p><span style={{ color: '#8fa4b8' }}>   Derrote o Dragão Ancião.</span></p>
      <p><span style={{ color: '#7ee787' }}>   Bônus: +10 ATK · +6 DEF</span></p>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> veja as conquistas "🔒 bloqueadas" para ter objetivos. Cada uma é um desafio — matar 500 inimigos, visitar todos os 30+ locais, acumular 10.000 moedas. Elas te dão algo pra fazer depois do jogo principal.
      </div>
    </div>
  );
}

function SecaoCrafting() {
  return (
    <div className="tut-secao">
      <h2>⚒ Crafting e Encantamento</h2>

      <h3>Crafting</h3>
      <p>Você pode <strong>forjar itens</strong> usando materiais coletados em inimigos e no chão. Cada receita pede uma quantidade de materiais e moedas.</p>

      <h4>Comandos</h4>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>receitas</code></td><td>Lista todas as receitas</td></tr>
          <tr><td><code>receitas ferraria</code></td><td>Filtra só as de ferraria</td></tr>
          <tr><td><code>receitas alquimia</code></td><td>Filtra só as de alquimia</td></tr>
          <tr><td><code>craftar &lt;item&gt;</code></td><td>Forja o item se você tiver os materiais</td></tr>
        </tbody>
      </table>

      <h4>Onde conseguir materiais</h4>
      <ul>
        <li><strong>Pele de lobo, presa:</strong> matar Lobos</li>
        <li><strong>Ferro:</strong> matar Goblins, Bandidos, Guardas</li>
        <li><strong>Osso:</strong> matar Esqueletos</li>
        <li><strong>Teia:</strong> matar Aranhas</li>
        <li><strong>Cristal:</strong> matar Magos, Golems</li>
        <li><strong>Gemas (rubi, safira):</strong> chefes</li>
      </ul>

      <h3>Encantamento</h3>
      <p>Você pode <strong>imbuir armas e armaduras</strong> com efeitos elementais usando uma <strong>gema</strong> + moedas. Cada peça só pode ter 1 encantamento por vez.</p>

      <table className="tut-tabela">
        <thead>
          <tr><th>Encantamento</th><th>Gema</th><th>Custo</th><th>Efeito</th></tr>
        </thead>
        <tbody>
          <tr><td>🔥 Chama</td><td>Rubi</td><td>100 ◈</td><td>+3 ATK, 35% de queimar</td></tr>
          <tr><td>❄ Gelo</td><td>Safira</td><td>120 ◈</td><td>+2 ATK, +1 DEF, 25% de congelar</td></tr>
          <tr><td>☠ Veneno</td><td>Rubi</td><td>90 ◈</td><td>+2 ATK, 45% de envenenar</td></tr>
          <tr><td>⚡ Raio</td><td>Cristal</td><td>80 ◈</td><td>+4 ATK, 20% de atordoar</td></tr>
          <tr><td>✨ Sagrado</td><td>Safira</td><td>150 ◈</td><td>+3 ATK, +3 DEF</td></tr>
        </tbody>
      </table>

      <h4>Comandos</h4>
      <table className="tut-tabela">
        <tbody>
          <tr><td><code>encantamentos</code></td><td>Lista todos os encantamentos disponíveis</td></tr>
          <tr><td><code>encantar &lt;slot&gt; &lt;tipo&gt;</code></td><td>Aplica encantamento (ex: <code>encantar arma fogo</code>)</td></tr>
          <tr><td><code>desencantar &lt;slot&gt;</code></td><td>Remove encantamento (não devolve a gema)</td></tr>
        </tbody>
      </table>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> encante <strong>apenas itens que você vai manter</strong>. Se vender o item, o encantamento vai junto. A gema não é devolvida.
      </div>
    </div>
  );
}

function SecaoMapa() {
  return (
    <div className="tut-secao">
      <h2>🗺 Mapa e Regiões</h2>
      <p>O comando <code>mapa</code> mostra o mundo agrupado em <strong>9 regiões</strong>. Cada região tem um <strong>nível mínimo</strong> para entrar.</p>

      <table className="tut-tabela">
        <thead>
          <tr><th>Região</th><th>Nível</th><th>Chefes</th></tr>
        </thead>
        <tbody>
          <tr><td>🏘 Coração de Pedraverde</td><td>1+</td><td>(nenhum)</td></tr>
          <tr><td>🌲 Floresta Sombria</td><td>3+</td><td>Troll, Ogro</td></tr>
          <tr><td>⛰ Colinas Bandidas</td><td>3+</td><td>Rei Bandido</td></tr>
          <tr><td>🐸 Pântano Sombrio</td><td>5+</td><td>Bruxa, Hidra</td></tr>
          <tr><td>☀ Vale do Sol</td><td>10+</td><td>Bispo Sombrio</td></tr>
          <tr><td>🏜 Deserto Escaldante</td><td>12+</td><td>Rei Mumificado, Esfinge</td></tr>
          <tr><td>⚓ Costa dos Naufrágios</td><td>15+</td><td>Capitão Pirata</td></tr>
          <tr><td>❄ Pico Nevada</td><td>15+</td><td>Gigante, Rei Gigante, Dragão</td></tr>
          <tr><td>🏰 Castelo do Rei Antigo</td><td>25+</td><td>Rei Antigo (final)</td></tr>
        </tbody>
      </table>

      <h3>Legenda do mapa</h3>
      <ul>
        <li><strong>▸ ← VOCÊ</strong> — local onde você está</li>
        <li><strong>✓</strong> — região já visitada</li>
        <li><strong>?</strong> — região ainda não visitada</li>
        <li><strong>🔒 Nv X</strong> — bloqueado até você ter o nível</li>
        <li><strong>☠CHEFE</strong> — local com chefe ainda vivo</li>
        <li><strong>☠✓</strong> — chefe já derrotado</li>
      </ul>

      <h3>Save export / import</h3>
      <p>Na tela de <strong>Slots</strong>, cada save tem:</p>
      <ul>
        <li><strong>↓ exportar</strong> — baixa um arquivo <code>.json</code> com o save completo</li>
        <li><strong>↑ importar</strong> — sobe um arquivo <code>.json</code> para o slot</li>
      </ul>
      <p>Útil para fazer backup, migrar entre dispositivos sem Firebase, ou compartilhar seu personagem.</p>

      <div className="tut-dica">
        <strong>💡 Dica:</strong> chefes <strong>não respawnam</strong> depois de derrotados. Se você quer XP, mate inimigos comuns. Se quer loot único, mate chefes.
      </div>
    </div>
  );
}

function SecaoProgressao() {
  return (
    <div className="tut-secao">
      <h2>📈 Progressão</h2>

      <h3>XP e níveis</h3>
      <p>Você ganha <strong>XP</strong> ao matar inimigos, completar quests e vencer na arena. Ao atingir o limite, sobe de nível:</p>
      <ul>
        <li><strong>+5 HP máximo</strong></li>
        <li><strong>+1 ATK</strong></li>
        <li><strong>+1 DEF</strong></li>
        <li><strong>+3 Mana máxima</strong></li>
        <li><strong>Cura total</strong></li>
        <li><strong>+1 ponto de talento</strong> nos níveis 5, 10, 15 e 20</li>
      </ul>

      <h3>Quests</h3>
      <p>Quests dão <strong>XP extra</strong> e <strong>moedas</strong>. Você aceita com <code>aceitar &lt;título&gt;</code>. O progresso é rastreado automaticamente.</p>
      <ul>
        <li>As quests completas <strong>dão recompensa na hora</strong></li>
        <li>Algumas quests dão itens exclusivos</li>
      </ul>

      <h3>Morte</h3>
      <p>Se você morrer:</p>
      <ul>
        <li>Perde <strong>20% das moedas</strong></li>
        <li>Ressuscita em Pedraverde com <strong>HP e MP cheios</strong></li>
        <li><strong>Não perde itens</strong> nem XP</li>
        <li>Na <strong>Arena de Treino</strong>, não morre — só é nocauteado (recupera com 1 HP)</li>
      </ul>

      <h3>Arena</h3>
      <p>Na <strong>Arena de Treino</strong> (nordeste de Pedraverde), você pode:</p>
      <ul>
        <li>Escolher qualquer inimigo fraco</li>
        <li>Treinar combos sem risco de morte</li>
        <li>Ganhar <strong>50% do XP normal</strong></li>
        <li>Não ganhar loot</li>
      </ul>

      <h3>Progresso de longo prazo</h3>
      <ul>
        <li><strong>45 conquistas</strong> em 7 categorias</li>
        <li><strong>20 títulos</strong> para equipar</li>
        <li><strong>40 talentos</strong> em 5 classes</li>
        <li><strong>12 chefes</strong> para derrotar</li>
        <li><strong>~167 itens</strong> para colecionar</li>
      </ul>
    </div>
  );
}

function SecaoDicas() {
  return (
    <div className="tut-secao">
      <h2>💡 Dicas por Classe</h2>

      <h3>⚔ Guerreiro</h3>
      <p>Você tem HP e DEF altos. Use <code>defender</code> quando o inimigo focar, e <code>forte</code> quando ele estiver com HP baixo. A <strong>Investida</strong> é ótima contra inimigos com DEF alta — ela nunca erra e faz dano ×1.8.</p>
      <p><strong>Talentos recomendados:</strong> Fúria (dano maior com HP baixo) ou Resistência (tanque puro).</p>

      <h3>🔮 Mago</h3>
      <p>Você tem HP baixo mas <strong>magias devastadoras</strong>. Comece com <code>bola_fogo</code> (ignora DEF), depois use <code>toque_gelido</code> para congelar e ganhar turno. Guarde MP para emergências — <code>descansar</code> recupera tudo.</p>
      <p><strong>Talentos recomendados:</strong> Metamagia (economiza MP) ou Foco Arcano (dano mágico).</p>

      <h3>🗡 Ladino</h3>
      <p>Sua <strong>Adaga Venenosa</strong> combinada com <code>ataque_furtivo</code> mata inimigos fracos em um golpe. Use <code>rapido</code> para dano consistente, e <code>esquivar</code> quando o inimigo for forte.</p>
      <p><strong>Talentos recomendados:</strong> Assassino (crítico 3×) ou Veneno Aprimorado.</p>

      <h3>✨ Clérigo</h3>
      <p>Você é o melhor em <strong>sustentação</strong>. Use <code>bencao</code> antes de combates difíceis (+3 ATK, +3 DEF), <code>escudo_magico</code> quando HP baixo, e <code>cura</code> para recuperar.</p>
      <p><strong>Talentos recomendados:</strong> Fé (cura +30%) ou Julgamento (+50% vs mortos-vivos).</p>

      <h3>🏹 Arqueiro</h3>
      <p>Seu <code>tiro_certeiro</code> ignora DEF — perfeito contra Golems, Cavaleiros e chefes blindados. Combine com <code>focar</code> + <code>tiro_certeiro</code> para dano massivo.</p>
      <p><strong>Talentos recomendados:</strong> Tiro Rápido (atacar 2x) ou Mira Letal (+5 ATK).</p>

      <h2>🎯 Dicas gerais</h2>
      <ul>
        <li><strong>Antes de chefe:</strong> enche HP/MP, leva 3+ poções, e usa <code>bencao</code> ou <code>escudo_magico</code> no primeiro turno</li>
        <li><strong>Contra chefe:</strong> o combo <code>defender</code> → <code>focar</code> → <code>forte</code> funciona sempre</li>
        <li><strong>Salve antes de explorar:</strong> sempre clique em <strong>Salvar</strong> antes de entrar em região nova</li>
        <li><strong>Faça backup com exportar:</strong> baixa o <code>.json</code> antes de arriscar</li>
        <li><strong>Venda itens fracos:</strong> ganha metade do preço, junta moedas para poções</li>
        <li><strong>Encante a arma:</strong> +3~4 ATK faz diferença enorme do nível 5 ao 15</li>
        <li><strong>Crafting compensa:</strong> forjar é mais barato que comprar, se você coletar material</li>
        <li><strong>Complete conquistas:</strong> cada uma dá bônus permanente — colecionar te torna mais forte</li>
        <li><strong>Escolha talentos com calma:</strong> eles definem seu estilo de jogo no longo prazo</li>
      </ul>

      <div className="tut-dica">
        <strong>💡 Dica final:</strong> o jogo é <em>seu</em>. Explore, teste builds, morra — não tem pressa. Quando você derrotar o <strong>Rei Antigo</strong>, você termina a campanha. Mas as conquistas e os talentos continuam esperando por você.
      </div>
    </div>
  );
}
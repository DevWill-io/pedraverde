Perfeito. Aqui está o **documento de handoff completo** — salva como `PROJETO.md` na raiz. Contém tudo do projeto atual + roadmap de melhorias. Se você trocar de chat, é só colar esse arquivo inteiro no começo e qualquer assistente vai entender o estado exato do projeto.

---

```markdown
# ⚔ PEDRAVERDE — Documento de Handoff Completo

> **Propósito deste arquivo:** documentação viva do projeto. Se você trocar de
> chat/assistente/ferramenta, cole este arquivo inteiro no começo da nova sessão
> para dar contexto completo do que já foi feito, como está organizado, e o que
> ainda falta implementar.

---

## 📌 1. Resumo do Projeto

**Nome:** Pedraverde
**Tipo:** RPG de texto medieval jogável no navegador
**Estilo:** Terminal retrô com tema escuro, fonte monoespaçada, cores por tipo de
mensagem
**URL:** https://pedraverde.vercel.app
**Status:** Publicado e funcional. Base sólida, com várias features implementadas
e outras planejadas.

### Ideia central
O jogador digita comandos em um input e recebe respostas em um log rolável. Toda
a interação é por texto — combate, navegação, crafting, magias, etc. O tom é de
fantasia medieval, começando na vila de Pedraverde.

---

## 🛠 2. Stack Técnica

| Camada | Tecnologia |
|---|---|
| **Frontend** | React 18 |
| **Build** | Vite 5 |
| **Estilo** | CSS puro, tema terminal retrô |
| **Autenticação** | Firebase Authentication (e-mail/senha + anônimo) |
| **Banco de dados** | Firebase Firestore (saves, ranking, chat) |
| **Sons** | Web Audio API (sem arquivos MP3, tudo sintetizado) |
| **PWA** | Service Worker + Manifest (instalável) |
| **Deploy** | Vercel (auto deploy via GitHub) |
| **Persistência local** | localStorage (fallback offline) |

### Dependências (package.json)
```json
{
  "dependencies": {
    "firebase": "^10.12.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.1"
  }
}
```

### Variáveis de ambiente (`.env.local`)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 📁 3. Estrutura de Arquivos

```
/
├── public/
│   ├── manifest.webmanifest       # PWA manifest
│   ├── robots.txt                 # SEO — permite indexação
│   ├── sitemap.xml                # SEO — mapa pro Google
│   ├── sw.js                      # Service Worker (cache offline)
│   └── preview.png                # (opcional) imagem Open Graph
│
├── src/
│   ├── content/                   # Conteúdo do jogo (dados puros)
│   │   ├── mundo.js               # 9 regiões, 35+ locais
│   │   ├── itens.js               # ~167 itens em 11 categorias
│   │   ├── inimigos.js            # 23 inimigos + 12 chefes
│   │   ├── quests.js              # Quests rastreáveis
│   │   ├── magias.js              # 9 magias (ataque + suporte)
│   │   ├── racas.js               # 5 raças (bonus aplicados)
│   │   ├── classes.js             # 5 classes (com magias próprias)
│   │   ├── efeitos.js             # 7 status effects
│   │   ├── eventos.js             # 12 eventos aleatórios
│   │   ├── arena.js               # Arena de treino
│   │   ├── receitas.js            # 28 receitas de crafting
│   │   ├── encantamentos.js       # 5 encantamentos elementais
│   │   └── i18n.js                # Traduções PT/EN + aliases de comandos
│   │
│   ├── engine/
│   │   └── jogo.js                # Motor do jogo (processa comandos, combate, etc.)
│   │
│   ├── components/
│   │   ├── Login.jsx              # Tela de login/cadastro
│   │   ├── Slots.jsx              # Escolha de save (3 slots)
│   │   ├── Tutorial.jsx           # Tutorial completo (9 seções)
│   │   ├── Config.jsx             # Painel de configurações (modal)
│   │   ├── Chat.jsx               # Chat global (modal)
│   │   └── Ranking.jsx            # Ranking global (modal)
│   │
│   ├── App.jsx                    # Componente principal + TelaCriacao + TelaJogo
│   ├── main.jsx                   # Entrada do React
│   ├── firebase.js                # Inicialização do Firebase
│   ├── saves.js                   # Sistema de save (local + nuvem)
│   ├── audio.js                   # Sons + música (Web Audio API)
│   ├── chat.js                    # Chat e ranking no Firestore
│   ├── pwa.js                     # Registro do Service Worker + prompt de instalação
│   └── styles.css                 # Estilos globais
│
├── index.html                     # HTML base com meta tags SEO
├── vite.config.js
├── package.json
├── .env.local                     # Credenciais (não commitado)
├── .gitignore
├── README.md
└── PROJETO.md                     # Este arquivo
```

---

## 🎮 4. Funcionalidades Implementadas

### 4.1 Autenticação
- ✅ Login com e-mail/senha
- ✅ Cadastro de conta nova
- ✅ Login anônimo (via Firebase)
- ✅ **Modo offline** (sem Firebase, save só local)
- ✅ Sessão persistente (recarregar mantém logado)

### 4.2 Save Multi-slot
- ✅ **3 slots** por usuário
- ✅ **Mesclagem inteligente** (pega o mais recente entre local e nuvem)
- ✅ Apagar slot individual
- ✅ Save automático ao clicar em "Salvar" + ao trocar de local
- ✅ Cada slot mostra: emoji raça/classe, nome, nível, local, HP, data

### 4.3 Interface
- ✅ Barra de status: nome, classe, nível, ATK, DEF, moedas, local
- ✅ Barras de HP, Mana, XP com cores dinâmicas (verde/amarelo/vermelho)
- ✅ Log rolável com limite de 25 linhas visíveis (`MAX_LOG = 25`)
- ✅ Cores e prefixos por tipo de mensagem (› ◆ ✓ ✗ ⚔ ✦ 💥 ☠ etc.)
- ✅ Divisórias tracejadas entre itens/quests (`separador` e `espaco`)
- ✅ Input na parte inferior com histórico (`↑`/`↓`)
- ✅ Chips de atalho abaixo do log (variam por contexto: normal / combate / arena)
- ✅ Botões: Salvar, Carregar, Chat, Ranking, Tutorial, Config, Slots, Sair
- ✅ Comando `limpar` / `clear` apaga o log
- ✅ Nenhuma seleção de texto indesejada (sem barra `|` no desktop, sem fundo azul no mobile)
- ✅ Feedback visual de clique (scale + mudança de fundo)

### 4.4 Comandos do Jogo
**Exploração:**
- `ajuda` / `help` / `?`
- `olhar` / `look` / `l`
- `mapa` / `map` / `m`
- `ir <direção>` / `go <direction>`
- `pegar` / `take` / `get`
- `descansar` / `rest` / `sleep`

**Itens e equipamento:**
- `inventario` / `inventory` / `inv` / `i` (com descrição)
- `examinar <item>` / `inspecionar` / `ver` / `verificar`
- `equipar <item>` / `equip`
- `desequipar <slot>` / `remover`
- `usar <item>` / `use`
- `status` / `stats`

**Magias e efeitos:**
- `magias` / `grimorio` / `spells`
- `magia <nome>` / `spell`
- `efeitos` / `buffs`

**Progresso:**
- `bestiario` / `bestiary`
- `diario` / `jornada` / `diary`
- `treinar <inimigo>` / `train` (só na arena)

**Crafting / Encantamento:**
- `receitas` / `recipes` (filtra por `ferraria`, `alquimia`, `cozinha`)
- `craftar <item>` / `forjar` / `criar` / `craft`
- `encantamentos` / `lista-encantamentos`
- `encantar <slot> <tipo>` / `enchant`
- `desencantar <slot>` / `disenchant`

**Social / Economia:**
- `falar` / `talk`
- `loja` / `shop` (lista numerada com descrição)
- `comprar <número|nome>` / `buy`
- `vender <número|nome>` / `sell`
- `quests` / `quest`
- `aceitar <título>` / `accept`

**Sistema:**
- `salvar` / `save`
- `carregar` / `load`
- `limpar` / `clear` / `cls`
- `tutorial` / `guide`
- `sair` / `quit` / `exit`

**Combate (7 ações):**
- `atacar` / `attack`
- `forte` / `strong`
- `rapido` / `quick` / `fast`
- `defender` / `defend` / `block`
- `esquivar` / `dodge`
- `focar` / `focus`
- `fugir` / `flee` / `run`
- `magia <nome>` / `spell`
- `usar <item>` / `use`

### 4.5 Combate Tático
- ✅ **7 ações por turno** com prós e contras
- ✅ Dano aleatório: `max(1, ATK + d6 − DEF)`
- ✅ **Fugir** tem 50% de chance (chefes não permitem)
- ✅ **Combo tático:** defender → focar → forte = dano crítico devastador
- ✅ **Inimigos inteligentes:**
  - Defendem quando HP < 30%
  - Ficam agressivos quando você está com HP baixo
  - Chefes ficam **ENFURECIDOS** abaixo de 50% HP (+2 ATK)
  - Troll faz **Golpe Terra** (dano dobrado) a cada 3 turnos
- ✅ **Status effects em combate** (veneno, sangramento, queimadura, atordoar, congelar)
- ✅ **Encantamentos elementais** disparam ao acertar golpe

### 4.6 Magias e Mana
- ✅ Sistema de **Mana (MP)** com barra visual
- ✅ **9 magias** divididas em ataque/suporte
- ✅ Magias ignoram DEF (Bola de Fogo, Ataque Furtivo, Tiro Certeiro)
- ✅ Chance de atordoar (Raio) e congelar (Toque Gélido)
- ✅ Cura (Cura), Buff (Escudo Mágico, Bênção)
- ✅ Recurso via `descansar`, `elixir_mana` ou level up

### 4.7 Criação de Personagem
- ✅ **5 raças:** Humano, Elfo, Anão, Orc, Halfling
- ✅ **5 classes:** Guerreiro, Mago, Ladino, Clérigo, Arqueiro
- ✅ Cada combinação dá stats diferentes
- ✅ Preview em tempo real
- ✅ Magias iniciais por classe

### 4.8 Mundo (9 regiões, 35+ locais)
- 🏘 **Coração de Pedraverde** (Nv 1+) — vila, ferraria, alquimista, mercado, arena
- 🌲 **Floresta Sombria** (Nv 3+) — floresta, caverna (Troll), ruínas antigas (Ogro)
- ⛰ **Colinas Bandidas** (Nv 3+) — colina, fortaleza (Rei Bandido)
- 🐸 **Pântano Sombrio** (Nv 5+) — pântano, covil da bruxa, ruínas afundadas, covil da hidra
- ☀ **Vale do Sol** (Nv 10+) — cidade, templo, guilda de magos, esgoto, catedral (Bispo Sombrio)
- 🏜 **Deserto Escaldante** (Nv 12+) — deserto, oásis, ruínas perdidas (Rei Mumificado), pirâmide (Esfinge)
- ⚓ **Costa dos Naufrágios** (Nv 15+) — porto, ilha pirata, caverna do tesouro (Capitão Pirata)
- ❄ **Pico Nevada** (Nv 15+) — base, passagem gelo, caverna gelo (Gigante), vale gigantes (Rei Gigante), pico (Dragão)
- 🏰 **Castelo do Rei Antigo** (Nv 25+) — castelo, jardins, masmorras, salão do trono (Rei Antigo — FINAL)

**Bloqueio por nível:** todas as regiões avançadas exigem nível mínimo.

### 4.9 Inimigos (23 + 12 chefes)
- **Nível baixo:** Rato, Lobo, Goblin
- **Nível médio:** Aranha, Esqueleto, Bandido
- **Nível alto:** Cultista, Escorpião, Abutre, Saqueador, Serpente, Pirata, Lobo Glacial, Golem de Gelo, Guarda Real, Cavaleiro Negro, Mago Negro
- **Chefes:** Troll, Ogro, Bruxa, Rei Bandido, Hidra, Bispo Sombrio, Rei Mumificado, Esfinge, Capitão Pirata, Gigante de Gelo, Rei dos Gigantes, Dragão Ancião, Rei Antigo

**Balanceamento recente:** todos os inimigos foram reforçados em ~75-100% de HP e ~35-50% de ATK.

### 4.10 Itens (~167 em 11 categorias)
- **Consumíveis:** comidas, poções, pergaminhos
- **Armas:** adagas, espadas, machados, martelos, lanças, cajados, arcos, diversas
- **Escudos, elmos, armaduras, botas, anéis, colares, capas**
- **Materiais:** ferro, madeira, couro, cristal, gemas
- **Relíquias:** chaves, mapas, fragmentos

**Raridades:** comum, incomum, raro, épico, lendário, **mítico** (novo)

### 4.11 Crafting e Encantamento
- ✅ **28 receitas** (ferraria, alquimia, cozinha)
- ✅ Precisa de materiais + moedas + nível mínimo
- ✅ **5 encantamentos elementais:** fogo, gelo, veneno, raio, sagrado
- ✅ Cada encantamento consome uma gema + moedas
- ✅ Efeito dispara ao atacar (chance variável)
- ✅ Só 1 encantamento por peça de equipamento

### 4.12 Quests
- ✅ **9 quests** distribuídas pelo mundo
- ✅ Progresso rastreado automaticamente
- ✅ Recompensa dada na hora ao completar
- ✅ Comando `quests` mostra descrição + recompensa + "para aceitar: aceitar X" **antes de aceitar**

### 4.13 Sistema de Eventos
- ✅ **12 eventos aleatórios** ao viajar (15% de chance)
- ✅ Bons (moedas, poções, fontes), ruins (armadilhas, ladrões, veneno) e neutros

### 4.14 Efeitos (Status)
- ✅ 7 efeitos: veneno, queimadura, sangramento, regeneração, força, fraqueza, lentidão
- ✅ Inimigos aplicam efeitos (aranha envenena, esqueleto sangra)
- ✅ Antídoto limpa efeitos de dano contínuo

### 4.15 Arena de Treino
- ✅ Local em Pedraverde (nordeste)
- ✅ Luta contra inimigos fracos sem risco
- ✅ XP reduzido (50%), sem loot
- ✅ Nocaute em vez de morte

### 4.16 Bestiário
- ✅ Comando `bestiario` mostra todos inimigos derrotados
- ✅ Ordenado por quantidade
- ✅ Mostra HP, ATK, DEF, XP

### 4.17 Diário
- ✅ Comando `diario` com estatísticas completas
- ✅ Locais visitados, inimigos mortos, mortes, arena, dano, magias, itens criados, itens encantados

### 4.18 Tutorial
- ✅ Tela completa com **9 seções**
- ✅ Boas-vindas, Criação, Comandos, Combate, Magias, Crafting, Mapa, Progressão, Dicas
- ✅ Acessível do Login e do jogo (comando `tutorial` ou botão 📖)

### 4.19 Multi-idioma
- ✅ **Português** e **English**
- ✅ Tradução da UI completa
- ✅ **Aliases de comandos:** 60+ comandos em inglês funcionam
- ✅ Configurável em Config → Idioma

### 4.20 Sons e Música
- ✅ **16 efeitos sonoros** sintetizados (sem MP3)
- ✅ **Música ambiente procedural** (progressão Am → F → G → C, pad + baixo + reverb)
- ✅ Volume controlável em tempo real
- ✅ Toggle de som e música separados
- ✅ Sons reagem ao tipo de mensagem no log (dano, cura, level up, morte, etc.)

### 4.21 PWA
- ✅ Manifest com ícone SVG próprio
- ✅ Service Worker com cache
- ✅ Instalável como app (Chrome/Edge Android + iOS Safari)
- ✅ Funciona offline depois do primeiro acesso
- ✅ Prompt "Instalar como app" no painel de Config

### 4.22 Multiplayer (via Firebase)
- ✅ **Chat global** em tempo real (modal 💬)
- ✅ **Ranking global** (top 20 por nível, modal 🏆)
- ✅ Ambos usam Firestore com regras de segurança

### 4.23 Configurações
- ✅ Modal com: idioma, tema (claro/escuro), som, música, volume, instalação PWA
- ✅ Persistente em localStorage
- ✅ Tema claro implementado via `[data-tema="claro"]`

### 4.24 SEO e Indexação
- ✅ Meta tags completas (title, description, keywords)
- ✅ Open Graph (Facebook, WhatsApp, LinkedIn)
- ✅ Twitter Card
- ✅ JSON-LD Schema.org (VideoGame)
- ✅ `robots.txt` e `sitemap.xml`
- ✅ Canonical URL
- ⏳ **Pendente:** registro no Google Search Console (você já fez, precisa só confirmar indexação)

### 4.25 Deploy
- ✅ Repositório no GitHub
- ✅ Auto deploy na Vercel
- ✅ URL: https://pedraverde.vercel.app
- ✅ Firebase configurado e ativo

---

## 🧭 5. Como Chegamos Aqui — Linha do Tempo

### Fase 1 — Base (primeiros blocos)
1. Setup do projeto React + Vite + Firebase
2. Autenticação (e-mail/senha, anônimo, offline)
3. Sistema de save multi-slot (local + nuvem)
4. Motor de comandos básicos (`ajuda`, `olhar`, `ir`, `pegar`, etc.)
5. Vila de Pedraverde com 5 locais iniciais
6. Sistema de combate básico

### Fase 2 — Expansão (blocos 1-6)
1. **Bloco 1:** Combate tático (7 ações + combo crítico)
2. **Bloco 2:** Conteúdo expandido (mais itens, inimigos, quests)
3. **Bloco 3:** Polimento visual (emojis, cores, animações, raridades)
4. **Bloco 4:** Mana + magias + criação de personagem (raças/classes)
5. **Bloco 5:** Eventos aleatórios + status effects
6. **Bloco 6:** Arena + bestiário + diário

### Fase 3 — Conteúdo avançado
1. **Mapa expandido:** 9 regiões, 35+ locais, 12 chefes, bloqueio por nível
2. **Crafting + Encantamento:** 28 receitas + 5 encantamentos
3. **Catálogo expandido:** 167 itens em 11 categorias com raridade mítico
4. **Tutorial:** 9 seções completas

### Fase 4 — Qualidade (blocos finais)
1. **i18n:** PT/EN com aliases de comandos
2. **PWA:** instalável + offline
3. **Sons:** efeitos + música procedural
4. **Multiplayer:** chat global + ranking no Firestore
5. **Config:** painel com preferências persistentes
6. **SEO:** meta tags, robots.txt, sitemap.xml, schema.org
7. **Deploy:** publicado na Vercel com Firebase ativo

### Fase 5 — Correções (recentes)
1. **XP:** curva rebalanceada (era exponencial, agora polinomial suave)
2. **Descrições:** adicionadas em itens, quests e lojas
3. **Lojas:** lista numerada + descrição (dá pra comprar com número)
4. **Quests:** descrição + recompensa visíveis antes de aceitar
5. **Divisórias visuais:** separadores entre itens/quests, cores por hierarquia
6. **Inimigos reforçados:** +75-100% HP, +35-50% ATK
7. **UX de clique:** sem cursor `|` no desktop, sem fundo azul no mobile, feedback visual próprio

---

## 🎯 6. Melhorias Futuras (Roadmap)

### 🥇 Prioridade alta (mais impacto, menos esforço)

#### 6.1 Save Export / Import
- Botão "Exportar" baixa `.json` com o save
- Botão "Importar" sobe o arquivo
- **Impacto:** backup, migração entre dispositivos sem Firebase
- **Esforço:** ~1h
- **Onde:** modal de Config

#### 6.2 Árvore de Talentos por Classe
- A cada 5 níveis (5, 10, 15, 20), escolhe 1 de 2 talentos
- **Guerreiro:** Fúria (dano +50% com HP < 30%) ou Resistência (+30% DEF)
- **Mago:** Metamagia (magias -20% MP) ou Foco (+2 dano mágico)
- **Ladino:** Furtividade (+esquiva) ou Assassino (+crítico)
- **Clérigo:** Fé (cura +30%) ou Julgamento (+dano contra mortos-vivos)
- **Arqueiro:** Tiro Duplo (ataque 2x) ou Mira Letal (+crítico)
- **Impacto:** builds únicos, profundidade
- **Esforço:** ~3-4h

#### 6.3 Conquistas e Títulos
- 30-50 achievements ("Matador de Dragões", "Explorador", "Colecionador")
- Título aparece ao lado do nome no ranking
- Cada conquista dá bônus pequeno permanente (+5 HP, +1 moeda/drop)
- **Impacto:** recompensa de longo prazo
- **Esforço:** ~3-4h

#### 6.4 Eventos Diários / Login Streak
- Login do dia dá recompensa (poção, moeda, item raro no 7º dia)
- 3 missões diárias sorteadas
- Missões semanais mais difíceis
- **Impacto:** retenção
- **Esforço:** ~2-3h

#### 6.5 Filtros e Ordenação no Inventário
- `inventario arma` — só armas
- `inventario raro` — só raros
- `inventario pocao` — só consumíveis
- Agrupar por tipo, ordenar por preço
- **Impacto:** QoL grande
- **Esforço:** ~1h

### 🥈 Alto impacto, esforço médio-alto

#### 6.6 Campanha Principal com Narrativa
- Prólogo ao criar personagem
- 8-10 quests principais guiando pelos biomas
- Antagonista desenvolvido (Rei Antigo com história)
- 3 finais alternativos baseados em escolhas
- **Impacto:** enorme — transforma em algo memorável
- **Esforço:** alto (muito conteúdo)

#### 6.7 Companheiros Recrutáveis
- Cada região tem 1 NPC que pode te seguir
- Ex: Lira (ladina), Borin (anão), Elyra (elfa)
- Sistema de afinidade que sobe com o uso
- Eles evoluem com você
- **Impacto:** enorme
- **Esforço:** alto

#### 6.8 Escolhas com Consequência
- Quests com 2 caminhos (matar vs poupar)
- Sistema de karma (bom/neutro/mau)
- Facções te tratam diferente
- Itens exclusivos por alinhamento
- **Impacto:** enorme
- **Esforço:** médio-alto

#### 6.9 Sistema de Clima e Horário
- Chuva: -1 dano de fogo, +1 de gelo
- Neve: movimento lento, inimigos mais fortes
- Noite: 30% mais encontros, inimigos raros
- Cada região tem clima e hora própria
- **Impacto:** imersão
- **Esforço:** ~2h

#### 6.10 Dungeon Procedural
- Porta mágica em alguma região
- Gera 5-10 andares aleatórios
- Inimigos escalonam com profundidade
- Chefe no final
- Recompensa aumenta a cada andar
- **Impacto:** rejogabilidade infinita
- **Esforço:** ~4h

### 🥉 Enriquecimento (esforço baixo-médio)

- **6.11** Diálogos com escolha (NPC pergunta, você escolhe 1/2/3)
- **6.12** Loja entre jogadores (mercado global)
- **6.13** Guildas (criar, entrar, chat interno)
- **6.14** PvP amistoso (enfrentar outros jogadores)
- **6.15** Karma / reputação com facções
- **6.16** Sons ambientais por bioma (pássaros, ondas, vento)
- **6.17** Toast notifications (aparece quando sobe nível, ganha conquista)
- **6.18** Modo leitura (esconde botões, só texto)
- **6.19** Auto-explorar (anda automaticamente até encontrar combate)
- **6.20** Sistema de prestígio / reencarnação

### 🚀 Longo prazo

- **6.21** Multiplayer em tempo real (party de até 4, chefe mundial, PvP ranked)
- **6.22** Prestígio (reset de nível por bônus permanente)
- **6.23** Modos hardcore / ironman / speedrun
- **6.24** Battle pass sazonal
- **6.25** Mais idiomas (ES/FR/DE)
- **6.26** Sistema de romance com NPCs
- **6.27** Facções em guerra (Sol, Sombra, Selvagem)
- **6.28** Livros e pergaminhos de lore (colecionáveis)
- **6.29** Codex interno (enciclopédia do jogo)
- **6.30** Chefes mundiais (todos jogadores atacam juntos)

---

## 🔑 7. Convenções e Detalhes Importantes

### 7.1 Mensagens de Commit
**Formato:** [Conventional Commits](https://www.conventionalcommits.org/)

```
tipo(escopo): descrição curta
```

**Tipos:**
- `feat` — nova funcionalidade
- `fix` — correção de bug
- `style` — CSS/mudança visual
- `refactor` — reorganização
- `perf` — performance
- `docs` — documentação
- `chore` — config, dependências
- `balance` — ajuste de números do jogo (HP, XP, ATK)

**Exemplos:**
```
feat(combate): adiciona sistema de combate tático
balance(inimigos): aumenta HP e ATK em ~80%
fix(loja): adiciona lista numerada com descrição
style(ui): remove cursor de texto no desktop
```

### 7.2 Padrões de Código

**Motor do jogo (`jogo.js`):**
- A função `processar(estado, entradaBruta)` recebe o estado e um comando
- Retorna `{ estado, linhas }` onde `linhas` é array de `{ texto, tipo }`
- Cada comando é um `case` no `switch` gigante
- Helpers: `addItem`, `remItem`, `qtdItem`, `barra`, `tipoRaridade`, `raridadeTag`

**Tipos de linha (cores):**
- `jogador` — azul (›)
- `local` / `titulo` — amarelo (◆)
- `sucesso` — verde (✓)
- `erro` — vermelho (✗)
- `combate` / `dano-*` — vermelho/amarelo/laranja (⚔ ✦ 💥)
- `cura` — verde (✚)
- `level-up` — amarelo brilhante (✦)
- `quest*` — azul/verde/amarelo
- `raridade-*` — cor da raridade
- `separador` / `espaco` — divisórias invisíveis
- `item-desc` — itálico cinza
- `item-bonus` — verde

**Estado do jogador:**
```js
{
  versao, nome, raca, classe, nivel, xp, xpProx,
  hpMax, hp, manaMax, mana, atk, def, moedas,
  magias: [], efeitos: [], local,
  inventario: [{ id, qtd }],
  equipado: { arma, escudo, elmo, armadura, botas, anel, colar, capa },
  encantamentos: { slot: tipo },
  questsAtivas: [], questsCompletas: [], progresso: {}, flags: {},
  emCombate: null,
  estatisticas: { locaisVisitados, inimigosMortos, mortes, danoTotal, danoRecebido, magiasLancadas, eventosVividos, turnosDeCombate, vitoriasArena, nocauteArena, itensCriados, itensEncantados, criadoEm },
  atualizadoEm
}
```

### 7.3 Arquivo `.env.local`
**Nunca commitar.** Está no `.gitignore`. Precisa existir pra Firebase funcionar.

### 7.4 Regras do Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /saves/{userId}/slots/{slotId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /ranking/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /chat_global/{msgId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.texto is string
                    && request.resource.data.texto.size() <= 200;
      allow update, delete: if false;
    }
  }
}
```

### 7.5 Limites Conhecidos
- `MAX_LOG = 25` (linhas visíveis no log)
- Histórico de comandos: 50 (navegável com ↑/↓)
- Chat: 200 caracteres por mensagem
- Ranking: top 20
- Slots de save: 3
- Nível máximo: sem limite (cresce com fórmula polinomial)

### 7.6 Como Rodar Localmente
```bash
npm install
npm run dev
```
Abre em `http://localhost:5173`.

**Sem `.env.local`:** funciona em modo offline (save local apenas).

### 7.7 Como Publicar
1. Commit + push pro GitHub
2. Vercel faz deploy automático
3. Variáveis de ambiente configuradas no painel da Vercel

---

## 🎓 8. Notas para o Próximo Assistente

Se você é uma IA lendo isso para continuar o projeto, saiba que:

1. **O motor está separado do conteúdo.** Adicionar item, inimigo, local ou
   quest nova **não exige mexer em `jogo.js`** — só no arquivo de conteúdo
   correspondente em `src/content/`.

2. **Nada é "hardcoded" que não deveria.** Se você adicionar um item novo em
   `itens.js`, ele automaticamente funciona em lojas, drops, crafting, etc.

3. **A convenção de mensagens do log** é `{ texto, tipo }`. Se você quer uma
   cor nova, precisa:
   - Adicionar o tipo no `PREFIXOS` em `App.jsx`
   - Adicionar a regra CSS em `styles.css`

4. **Toda alteração significativa** precisa terminar com mensagem de commit
   sugerida no formato `tipo(escopo): descrição`.

5. **O usuário prefere respostas completas.** Quando ele pede uma alteração,
   ele quer o arquivo inteiro pronto pra colar (não snippets parciais).

6. **Testar sempre no celular.** Muitos problemas só aparecem em telas
   pequenas.

7. **PT-BR é o idioma padrão.** Comentários, mensagens de erro, descrições.

8. **A estética do jogo é séria e imersiva.** Nada de emojis excessivos nas
   respostas do motor (só nos prefixos e nas mensagens que pedem).
   O terminal deve parecer profissional.

---

## 📊 9. Métricas do Projeto

| Item | Quantidade |
|---|---|
| Regiões | 9 |
| Locais | 35+ |
| Inimigos únicos | 23 |
| Chefes | 12 |
| Itens | ~167 |
| Categorias de item | 11 |
| Raridades | 6 |
| Raças | 5 |
| Classes | 5 |
| Magias | 9 |
| Encantamentos | 5 |
| Receitas de crafting | 28 |
| Status effects | 7 |
| Eventos aleatórios | 12 |
| Seções do tutorial | 9 |
| Comandos | ~50 |
| Idiomas | 2 (PT/EN) |
| Efeitos sonoros | 16 |

---

## 📌 10. TL;DR para o próximo chat

> Pedraverde é um RPG de texto em React + Vite + Firebase, publicado em
> https://pedraverde.vercel.app. Tem ~167 itens, 9 regiões, 12 chefes, combate
> tático de 7 ações, magias, crafting, encantamentos, PWA, sons procedurais,
> chat global e ranking. Tudo documentado em `PROJETO.md`. As melhorias
> futuras prioritárias são: save export/import, árvore de talentos, conquistas,
> eventos diários, filtros no inventário, campanha com narrativa, companheiros
> e escolhas com consequência. Convenção de commit: `tipo(escopo): descrição`.

---

*Última atualização: 2026-10-12*
```

---

Salva isso como **`PROJETO.md`** na raiz do projeto (junto do `README.md`). Ele serve como:

1. **Documentação viva** pra você consultar
2. **Handoff** pra outro chat/assistente (só colar no começo)
3. **Referência** pra quando voltar ao projeto depois de um tempo

Se quiser, comito também no GitHub junto dos outros arquivos — assim fica salvo na nuvem e você não perde.

> 📝 **Commit sugerido:**
> ```
> docs(handoff): adiciona PROJETO.md com documentação completa e roadmap
> ```

Agora bora implementar as melhorias! Qual você quer atacar primeiro? Minha aposta continua sendo o **Save Export/Import** (rápido e essencial). ⚔
```markdown
# ⚔ Pedraverde — RPG de Texto

Um RPG de texto medieval jogável no navegador, com interface estilo terminal retrô.

Construído com **React + Vite**, autenticação e save na nuvem via **Firebase**, e publicado na **Vercel**.

---

## 🎮 Sobre o jogo

Você cria um personagem (nome, raça e classe), explora um mundo de **9 regiões** e **35+ locais**, enfrenta **23 tipos de inimigos** (incluindo **12 chefes**), coleta itens, forja equipamentos, aprende magias, escolhe talentos, desbloqueia conquistas e tenta derrotar o **Rei Antigo** no castelo amaldiçoado.

Toda a interação acontece por **comandos de texto** digitados em um terminal colorido — como um RPG de mesa.

---

## ✨ Funcionalidades

### 🧙 Personagem
- **5 raças:** Humano, Elfo, Anão, Orc, Halfling
- **5 classes:** Guerreiro, Mago, Ladino, Clérigo, Arqueiro
- Sistema de **níveis e XP** com curva suave
- **HP, Mana, ATK, DEF, Moedas**
- **8 slots de equipamento:** arma, escudo, elmo, armadura, botas, anel, colar, capa
- **Árvore de talentos** — 4 escolhas por classe nos níveis 5, 10, 15 e 20

### ⚔ Combate tático
- **7 ações por turno:** atacar, forte, rápido, defender, esquivar, focar, fugir
- **Dano aleatório** com dado de 6 faces (d6)
- **IA reativa** — os inimigos veem o que você fez e respondem
- **5 arquétipos de inimigo:** agressivo, defensivo, tático, bestial, mágico
- **Chefes com padrões únicos** (Troll faz Golpe Terra a cada 3 turnos; Dragão exala Sopro de Fogo; Bruxa cura a si mesma)
- **Inimigos fogem** com HP baixo — você ganha XP parcial
- **Combo tático:** defender → focar → forte = dano crítico devastador

### 🌟 Talentos (por classe)
- **Guerreiro:** Fúria, Resistência, Golpe Duplo, Segunda Chance, Berserker, Guardião, Campeão, Imortal
- **Mago:** Metamagia, Foco Arcano, Mestre Arcano, Regeneração Mágica, Piromante, Criomante, Arquimago, Sábio
- **Ladino:** Furtividade, Assassino, Veneno Aprimorado, Velocidade, Mestre das Sombras, Evasão, Sombra Mortal, Fantasma
- **Clérigo:** Fé, Julgamento, Bênção Duradoura, Aura Sagrada, Sacerdote, Curandeiro, Santo, Inquisidor
- **Arqueiro:** Tiro Rápido, Mira Letal, Flecha Perfurante, Tiro Certeiro, Caçador, Atirador de Elite, Mestre Arqueiro, Olho de Águia

### 🏆 Conquistas e Títulos
- **45 conquistas** em 7 categorias (progressão, combate, chefes, exploração, itens, economia, eventos)
- **Bônus permanentes** ao desbloquear (ATK, DEF, HP, MP)
- **20 títulos** para equipar (ex: "Matador de Dragões", "Lenda", "Imortal")
- Título aparece ao lado do nome no header

### 🔮 Magias
- 9 magias divididas em **ataque** e **suporte**
- Custo em **Mana (MP)**
- Efeitos: dano mágico, atordoar, congelar, cura, buffs
- 4 pergaminhos para usar magias sem gastar mana

### 📜 Sistema de status
- **7 efeitos:** veneno, queimadura, sangramento, regeneração, força, fraqueza, lentidão
- Inimigos aplicam efeitos em você (aranha envenena, esqueleto sangra)
- Antídoto limpa efeitos

### 🎒 Itens e economia
- **~167 itens** em 11 categorias
- **6 raridades:** comum, incomum, raro, épico, lendário, mítico
- 4 lojas espalhadas pelo mundo
- Compra por preço cheio, venda por metade
- **Filtros no inventário:** `inventario arma`, `inventario raro`, `inventario equipado`
- **Ordenação:** `inventario preco`, `inventario nome`, `inventario raridade`
- **Combinação livre:** `inventario arma raro preco`

### ⚒ Crafting e Encantamento
- **28 receitas** para forjar armas, armaduras, poções e joias
- **5 encantamentos elementais** (fogo, gelo, veneno, raio, sagrado) com chance de aplicar efeito
- Consome **gemas** + moedas

### 🗺 Mundo
- **9 regiões** com nível mínimo: Vila, Floresta, Colinas, Pântano, Vale do Sol, Deserto, Porto, Montanha, Castelo
- **35+ locais** interconectados
- **Bloqueio por nível** em regiões avançadas
- **Comando `mapa`** com mini-mapa agrupado
- **12 chefes** — um por região ou sub-região

### 🌦 Clima e horário ⭐ NOVO
- **5 climas:** limpo, chuva, tempestade, neve, nevoeiro
- **5 períodos:** amanhecer, dia, anoitecer, noite, madrugada
- **Tempo avança** a cada 5 comandos (06:00 do dia seguinte direto)
- **Efeitos reais em combate:**
  - Chuva: -2 dano de fogo, +1 de gelo
  - Tempestade: +10% chance de crítico
  - Nevoeiro: 10% de chance de errar ataque
  - Neve: +1 ATK dos inimigos
  - Noite: +30% encontros, +1 ATK e +10% HP dos inimigos
- **Comandos `clima` e `hora`**
- **Header** mostra clima + período + hora + dia

### 🛌 Descansar (melhorado) ⭐ NOVO
- **Custo de 5◈** em locais com loja
- **Cooldown de 1 hora** entre descansos
- **Cura 100%** à noite (6h de descanso)
- **Cura 50%** de dia (3h)
- **50% de risco** de ser atacado em local semi-selvagem
- **Bloqueado** em local selvagem puro

### 📖 Narrativa
- **Quests** com progresso automático
- **Eventos aleatórios** ao viajar (bons e ruins)
- **NPCs** com diálogos
- **Bestiário** — catálogo de inimigos derrotados
- **Diário** — estatísticas completas da jornada

### 🏟 Extras
- **Arena de Treino** em Pedraverde (sem risco de morte)
- **Tutorial completo** com 11 seções
- **Ranking global** (Firebase)
- **Chat global** em tempo real (Firebase)
- **Save export/import** em JSON (backup e migração entre dispositivos)

### 🔔 Toast Notifications ⭐ NOVO
- Notificações flutuantes no canto superior direito
- 16 tipos: level up, conquista, talento, morte, vitória, item épico, quest, craft, encantar, clima, etc.
- Auto-dismiss após 4.2 segundos
- Máximo de 4 simultâneos
- Cores e emojis por tipo

### 🌐 Multi-idioma
- **Português** e **English**
- Comandos funcionam em ambos (`atacar` = `attack`, `olhar` = `look`)

### 🔊 Sons
- **Efeitos sonoros** sintetizados via Web Audio API (sem arquivos MP3)
- **Música ambiente** procedural (progressão Am → F → G → C)
- Volume controlável em tempo real

### 📱 PWA
- Instalável como app no celular
- Funciona offline após o primeiro acesso
- Ícone próprio

---

## 🚀 Rodando localmente

### Pré-requisitos
- **Node.js 18+** (recomendado 20+)
- **npm** ou **yarn**

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/DevWill-io/pedraverde.git
cd pedraverde

# 2. Instale as dependências
npm install

# 3. (Opcional) Configure o Firebase
cp .env.example .env.local
# Edite .env.local com suas credenciais

# 4. Rode o servidor de desenvolvimento
npm run dev
```

O jogo abre em `http://localhost:5173`.

**Sem Firebase configurado**, o jogo funciona 100% em **modo offline** (save no navegador) — só não tem chat, ranking e save na nuvem.

---

## 🔥 Configuração do Firebase (opcional)

Para habilitar login com e-mail, save na nuvem, chat e ranking:

### 1. Criar o projeto
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **Adicionar projeto**
3. Dê um nome (ex: `pedraverde-rpg`)

### 2. Ativar os serviços
- **Authentication** → ative **E-mail/senha** e **Anônimo**
- **Firestore Database** → crie em **modo produção**

### 3. Registrar app Web
- Configurações do projeto → **Seus apps** → clique em **`</>`**
- Copie o objeto `firebaseConfig`

### 4. Criar `.env.local`
Na raiz do projeto, crie o arquivo `.env.local`:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

### 5. Publicar regras do Firestore

No console do Firebase → **Firestore → Regras**, cole e publique:

```
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
                    && request.resource.data.texto.size() >= 1
                    && request.resource.data.texto.size() <= 200
                    && request.resource.data.nome is string
                    && request.resource.data.nome.size() <= 20;
      allow update, delete: if false;
    }
  }
}
```

---

## ☁️ Deploy na Vercel

### 1. Subir para o GitHub
```bash
git init
git add .
git commit -m "Primeiro commit"
git remote add origin https://github.com/DevWill-io/pedraverde.git
git push -u origin main
```

### 2. Importar na Vercel
1. Acesse [vercel.com](https://vercel.com) → **Add New → Project**
2. Conecte sua conta do GitHub e importe o repositório
3. A Vercel detecta automaticamente como projeto **Vite**

### 3. Adicionar as variáveis de ambiente
Antes de fazer deploy, em **Environment Variables**, adicione as mesmas 6 variáveis do `.env.local`:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### 4. Deploy
Clique em **Deploy** e aguarde 1-2 minutos. Você receberá uma URL pública tipo `pedraverde.vercel.app`.

---

## 🕹 Comandos do jogo

| Comando | Descrição |
|---|---|
| `ajuda` / `help` | Lista comandos |
| `olhar` / `look` | Descreve o local atual |
| `mapa` / `map` | Mostra o mundo por regiões |
| `clima` / `tempo` | Mostra clima, período, hora, dia |
| `hora` / `time` | Só hora e resumo |
| `ir <direção>` / `go <direction>` | Viaja |
| `pegar` / `take` | Pega item do chão |
| `inventario [filtros]` / `inventory` | Lista itens (com filtros opcionais) |
| `examinar <item>` | Detalhes completos de um item |
| `equipar <item>` / `equip` | Equipa arma/armadura |
| `desequipar <slot>` | Remove item equipado |
| `usar <item>` / `use` | Usa consumível |
| `descansar` / `rest` | Recupera HP/MP (custo/cooldown) |
| `status` / `stats` | Atributos completos |
| `falar` / `talk` | Conversa com NPC |
| `loja` / `shop` | Abre loja do local |
| `comprar <item\|número>` / `buy` | Compra item |
| `vender <item\|número>` / `sell` | Vende item |
| `quests` | Lista quests |
| `aceitar <título>` / `accept` | Aceita uma quest |
| `magias` / `spells` | Lista suas magias |
| `magia <nome>` / `spell` | Lança uma magia |
| `efeitos` / `buffs` | Status effects ativos |
| `talentos` / `talent` | Árvore de talentos da classe |
| `escolher <nível> <1\|2>` | Escolhe talento do nível |
| `conquistas` / `achievements` | Lista conquistas |
| `titulo <nome>` / `title` | Equipa um título |
| `receitas` / `recipes` | Lista receitas de crafting |
| `craftar <item>` / `craft` | Forja um item |
| `encantamentos` | Lista encantamentos disponíveis |
| `encantar <slot> <tipo>` / `enchant` | Aplica encantamento |
| `bestiario` / `bestiary` | Catálogo de inimigos |
| `diario` / `diary` | Estatísticas da jornada |
| `treinar <inimigo>` / `train` | Treina na arena |
| `limpar` / `clear` | Limpa o log |
| `salvar` / `save` | Salva o jogo |
| `carregar` / `load` | Carrega o save |
| `tutorial` / `guide` | Abre o tutorial |
| `sair` / `quit` | Despedida |

**Em combate:**
`atacar` / `attack` · `forte` / `strong` · `rapido` / `quick` · `defender` / `defend` · `esquivar` / `dodge` · `focar` / `focus` · `fugir` / `flee`

---

## 🎒 Filtros de Inventário

Combine livremente para filtrar e ordenar:

### Por tipo
```
inventario arma          → só armas
inventario armadura      → só armaduras
inventario consumivel    → só consumíveis
inventario material      → só materiais
inventario gema          → só gemas
inventario equipado      → só equipados
```

### Por raridade
```
inventario raro          → raro + épico + lendário + mítico
inventario epico         → épico + lendário + mítico
inventario lendario      → lendário + mítico
inventario mitico        → só míticos
```

### Ordenação
```
inventario preco         → mais caro primeiro
inventario nome          → A-Z
inventario raridade      → mítico no topo
inventario qtd           → maior quantidade
```

### Combinando
```
inventario arma raro preco          → armas raras, mais caras
inventario consumivel nome          → consumíveis A-Z
inventario equipado raridade        → equipados, do mítico pro comum
```

---

## 💾 Save export / import

Em cada slot na tela de **Slots**, você tem:
- **↓ exportar** — baixa um arquivo `.json` do save
- **↑ importar** — sobe um arquivo `.json` para o slot

Útil para:
- Backup manual
- Migrar entre dispositivos sem Firebase
- Restaurar se o save corromper
- Compartilhar seu personagem

---

## 🧱 Estrutura do projeto

```
src/
├── content/                   # Conteúdo do jogo (JSON puro)
│   ├── mundo.js               # 9 regiões, 35+ locais
│   ├── itens.js               # ~167 itens
│   ├── inimigos.js            # 23 inimigos + 12 chefes
│   ├── quests.js              # Quests
│   ├── magias.js              # Magias
│   ├── racas.js               # Raças
│   ├── classes.js             # Classes
│   ├── efeitos.js             # Status effects
│   ├── eventos.js             # Eventos aleatórios
│   ├── arena.js               # Arena de treino
│   ├── receitas.js            # 28 receitas de crafting
│   ├── encantamentos.js       # 5 encantamentos
│   ├── talentos.js            # 40 talentos em 5 classes
│   ├── conquistas.js          # 45 conquistas + 20 títulos
│   ├── clima.js               # Climas e períodos do dia
│   └── i18n.js                # Traduções PT/EN
├── engine/
│   └── jogo.js                # Motor do jogo (comandos, combate, IA, tempo)
├── constants/
│   ├── prefixos.js            # Prefixos visuais do log
│   └── toasts.js              # Config de toasts
├── utils/
│   └── config.js              # Persistência de config
├── components/
│   ├── Login.jsx              # Tela de login
│   ├── Slots.jsx              # Escolha de save + export/import
│   ├── TelaCriacao.jsx        # Criação de personagem
│   ├── TelaJogo.jsx           # Tela de jogo (log, status, combate)
│   ├── Tutorial.jsx           # Tutorial (11 seções)
│   ├── Config.jsx             # Painel de configurações
│   ├── Chat.jsx               # Chat global
│   └── Ranking.jsx            # Ranking global
├── App.jsx                    # Componente raiz (orquestração)
├── main.jsx                   # Entrada do React
├── firebase.js                # Inicialização do Firebase
├── saves.js                   # Sistema de save + export/import
├── audio.js                   # Sons + música (Web Audio API)
├── chat.js                    # Chat e ranking (Firestore)
├── pwa.js                     # Registro do Service Worker
└── styles.css                 # Estilos
```

---

## ⚙ Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite |
| Estilo | CSS puro, tema terminal retrô |
| Autenticação | Firebase Authentication |
| Save na nuvem | Firebase Firestore |
| Sons | Web Audio API (sem arquivos) |
| PWA | Service Worker + Manifest |
| Deploy | Vercel |
```

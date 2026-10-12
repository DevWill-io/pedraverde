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
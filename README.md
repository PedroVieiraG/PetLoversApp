# PetLovers — App de Adoção de Pets

> Conectando animais que precisam de um lar com famílias amorosas!

---

# Sobre o Projeto
O **PetLovers** é um aplicativo mobile desenvolvido com **React Native + Expo** que tem como missão facilitar o processo de adoção responsável de animais. 

O app permite procurar pets disponíveis para adoção, salvar favoritos localmente e solicitar a adoção diretamente pelo aplicativo. Projeto criado exclusivamente para fins acadêmicos.

---
# Como Rodar o Projeto
Pré-requisitos:
Node.js 18+
npm ou yarn
Expo CLI (`npm install -g expo-cli`)
Expo Go no celular (iOS ou Android) ou emulador configurado
Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pet-adopt.git
cd pet-adopt

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```
# Rodando no dispositivo:

Instale o app Expo Go na App Store ou Google Play
Escaneie o QR Code exibido no terminal
O app abrirá automaticamente
---
## Descrição das telas:

Home:	Apresentação, destaque de pets, dicas de cuidados
Explorar:	Listagem completa com busca e filtros
Detalhes:	Perfil completo do pet + galeria + formulário de adoção
Favoritos:	Pets salvos localmente com AsyncStorage
Perfil:	Configurações e informações do app
---
## Tecnologias Utilizadas:

Tecnologia	Versão	Uso
React Native	0.73	Framework mobile
Expo	~50.0	Toolchain e build
React Navigation	^6.x	Navegação entre telas
AsyncStorage	1.21	Favoritos persistidos localmente
@expo/vector-icons	^14	Ícones Ionicons
---
🗂️ Estrutura do Projeto
```
PetLovers/
├── App.js                          # Entry point, navegação principal
├── package.json
├── src/
│   ├── data/
│   │   └── pets.js                 # Dataset com 12 pets + dicas
│   ├── context/
│   │   └── FavoritesContext.js     # Context API + AsyncStorage
│   ├── components/
│   │   └── PetCard.js              # Card reutilizável da FlatList
│   └── screens/
│       ├── HomeScreen.js           # Tela inicial
│       ├── PetListScreen.js        # Listagem com FlatList
│       ├── PetDetailScreen.js      # Detalhes + Galeria + Adoção
│       ├── FavoritesScreen.js      # Favoritos salvos
│       └── ProfileScreen.js        # Perfil e configurações
```
---
# Funcionalidades
1. Busca em tempo real por nome, raça e cidade
2. Filtro por espécie (Todos / Cachorro / Gato)
3. Favoritar pets com persistência local (AsyncStorage)
4. Galeria de fotos com modal de visualização em tela cheia
5. Formulário de adoção com Alert de confirmação
6. Status de saúde (vacinado, castrado, microchipado)
7. Configurações com switches de notificações
8. Badge de favoritos na tab bar
---
# Design:

Cor primária: `#FF8C42` (laranja)
Cor secundária: `#1A1A2E` (azul escuro)
Tipografia: System font com pesos variados (500–900)
Border radius: 14–20px para cards modernos
Sombras: elevation para Android, shadowColor para iOS
---

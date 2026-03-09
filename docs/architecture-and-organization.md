<h1 align="center">Arquitetura e Organização</h1>

<p align="center">
  <a href="../README.md">⬅ Voltar ao Início</a>
</p>

---

## 📁 Visão Geral

Este documento descreve a arquitetura do projeto **Passe Adiante**, explicando a organização das pastas, responsabilidades de cada camada e os padrões adotados para garantir escalabilidade, manutenibilidade e clareza.

---

## 🏗 Arquitetura de Pastas

```text
PASSA-ADIANTE-NEST-JS/
├── docs/                   # Documentação do projeto
├── prisma/                 # Configurações e schema do Prisma ORM
├── public/                 # Arquivos públicos (estáticos)
├── src/                    # Código-fonte da aplicação
│   ├── generated/          # Arquivos gerados automaticamente
│   ├── item/               # Módulo Item (domínio)
│   ├── users/              # Módulo Users (domínio)
│   ├── prisma/             # Serviço Prisma (conexão com DB)
│   ├── app.module.ts       # Módulo raiz da aplicação
│   ├── app.controller.ts   # Controller principal
│   ├── app.service.ts      # Service principal
│   └── main.ts             # Bootstrap da aplicação
├── test/                   # Testes automatizados
├── .env                    # Variáveis de ambiente
├── package.json            # Dependências e scripts
├── tsconfig*.json          # Configurações do TypeScript
└── README.md               # Documentação principal
```

---

## 📚 Banco de Dados

### O que é o projeto físico de banco de dados?

O **Modelo Físico do Banco de Dados** é quando o modelo sai do papel e passa a existir de forma concreta em um SGBD 
(Sistema Gerenciador de Banco de Dados). É nessa etapa que tabelas, colunas, e todos os tipos de dados são criados,
juntamente com suas restrições e regras, que conhecemos como **Constraints**.

Ou seja, se os modelos conceitual e lógico mostram como os dados se relacionam, o modelo físico define como esses dados serão armazenados de verdade no sistema.

##### ❓ Mas afinal, qual é a real importância para quem está aprendendo?

- Ajuda a entender como as informações são guardadas e recuperadas.
- Evita problemas de desempenho e duplicação de dados.
- Facilita a manutenção e evolução do sistema (Escalabilidade).
- Ensina a pensar na estrutura antes de sair *codando*.

Mesmo em projetos simples, um bom modelo físico faz com que a aplicação fique mais organizada e confiável.
Por isso é tão importante aprender e não pular esta etapa de aprendizagem, afinal, esse processo é
fundamental para quem quer trabalhar com desenvolvimento de software.

---

## 🧠 Organização por Camadas

A aplicação segue o padrão **Controller → Service → Repository**, promovendo separação de responsabilidades e baixo acoplamento.

### 🎯 Controller

Responsável por receber requisições HTTP, validar entradas e delegar o processamento para a camada de serviço.

### 🛠 Service

Contém as regras de negócio da aplicação. Não conhece detalhes de infraestrutura ou persistência.

### 🗄 Repository

Responsável pelo acesso a dados, utilizando o Prisma ORM para comunicação com o banco de dados.

---

## 🧩 Módulos de Domínio

### 📦 Item

Gerencia operações relacionadas aos materiais escolares disponíveis para doação.

Responsabilidades:

* Cadastro de itens
* Listagem e filtros
* Atualização de status

### 👤 Users

Gerencia usuários do sistema.

Responsabilidades:

* Cadastro e gerenciamento de usuários
* Autenticação e autorização (quando aplicável)

### 🧾 Orders

Representa as **solicitações de materiais** realizadas por usuários cadastrados.

Responsabilidades:

* Criação de solicitações de itens doados
* Controle do status da solicitação (pendente, aprovada, recusada, concluída)
* Associação entre **usuário solicitante** e **item solicitado**
* Garantia das regras de negócio (ex: item disponível, usuário elegível)

---

## 🔌 Camada de Persistência

O **Prisma ORM** é utilizado como camada de abstração para o banco de dados PostgreSQL, garantindo:

* Segurança nas queries
* Tipagem forte
* Facilidade de manutenção

---

## 🧪 Testes

Os testes são organizados para garantir a confiabilidade das regras de negócio e das rotas expostas pela API.

Boa prática recomendada:

```text
test/
├── unit/
└── integration/
```

---

## 🗺️ SiteMap

```text

Landing Page
│
├── Cadastro
├── Login
│   └── Recuperar Senha
│
├── Dashboard
│   ├── Perfil
│   │   └── Endereço
│   ├── Catálogo
│   │   └── Detalhes do Item
│   ├── Cadastrar Item
│   ├── Minhas Solicitações
│   │   └── Detalhes do Pedido
│   └── Minhas Doações
│       └── Página do Item
│
├── Dashboard Admin
│   ├── Itens
│   ├── Pedidos
│   └── Usuários
│
└── Suporte
    ├── Quem Somos
    ├── Nossa Missão
    └── Fale Conosco

```

---

---

## 🎨 Como prototipar uma WireFrame

#### 1. Definir o objetivo da tela
  
Antes de desenhar qualquer interface, é importante entender:
- Qual problema a tela resolve
- Qual ação o usuário precisa realizar

Por exemplo, no sistema PassaAdiante, uma tela pode ter como objetivo:
- Cadastrar um item para doação
- Visualizar itens disponíveis
- Solicitar um item

#### 2. Criar a estrutura básica da página

A maioria das interfaces segue uma estrutura padrão:

    ---------------------------------
    Header (logo / navegação)
    ---------------------------------
    Menu lateral (opcional)
    ---------------------------------
    Conteúdo principal
    ---------------------------------
    Rodapé
    ---------------------------------

Essa estrutura ajuda o usuário a **entender rapidamente onde está cada tipo de informação**.


#### 3. Posicionar os elementos principais

Depois da estrutura geral, devem ser inseridos os componentes da tela:

Exemplo de wireframe simples de catálogo:

    ------------------------------------------------
    Logo           Barra de busca        Perfil
    ------------------------------------------------
    Menu

    Categorias

    ------------------------------------------------
    Item 1        Item 2        Item 3
    Imagem        Imagem        Imagem
    Título        Título        Título
    Botão ver     Botão ver     Botão ver
    ------------------------------------------------

Nesse momento **não se pensa em cores ou estilo**, apenas na organização.

#### 4. Definir os fluxos de interação

Um wireframe também ajuda a representar **como o usuário navega entre as páginas**.

    Exemplo de fluxo:

    Catálogo
      ↓
    Detalhes do Item
      ↓
    Solicitar Item
      ↓
    Confirmação

Esse fluxo ajuda a identificar:
- Etapas desnecessárias
- Problemas de navegação
- Possíveis melhorias na experiência.

#### 5. Testar o wireframe

Uma prática muito comum é pedir para alguém tentar realizar uma tarefa usando o protótipo.

Por exemplo:

    “Você consegue descobrir como solicitar um item?”

Se a pessoa **não consegue entender a interface**, isso indica que o design precisa ser melhorado.

---

---

## 🎯👤 Como o design centrado no usuário melhora a qualidade dos sistemas?

#### 1. Facilidade de uso

Interfaces intuitivas permitem que o usuário:
- Aprenda rapidamente
- Cometa menos erros
- Realize tarefas com mais eficiência
- Reduza a carga cognitiva

Isso reduz frustração e melhora a experiência geral.

#### 2. Acessibilidade 

O design centrado no usuário também considera **diferentes perfis de usuários**, incluindo:
- Idosos
- Pessoas com deficiência visual
- Pessoas com pouca experiência digital

Isso torna os sistemas mais inclusivos.

#### 3. Redução de erros

Interfaces mal projetadas podem levar a:

- Erros de preenchimento
- Perda de dados
- Ações feitas por engano

Ao estudar o comportamento do usuário, é possível **prevenir esses problemas no design**.

#### 4. Maior satisfação do usuário

Quando uma interface é clara e eficiente, o usuário sente que o sistema **funciona a seu favor**, e não contra ele.

Isso aumenta:
- Confiança no sistema
- Engajamento
- Adoção da tecnologia.
  
#### 5. Impacto da Interface Humano-Computador (IHC) na sociedade

A interface entre humanos e computadores está presente em praticamente todas as atividades do cotidiano, como:
- Aplicativos bancários
- Redes sociais
- Sistemas de saúde
- Plataformas educacionais
- Serviços públicos digitais

Se essas interfaces forem mal projetadas, milhões de pessoas podem ter dificuldades para acessar serviços essenciais.

Por outro lado, quando os princípios de **IHC e design centrado no usuário são aplicados corretamente**, a tecnologia se torna:
- Mais acessível
- Mais eficiente
- Mais humana

Isso contribui para uma sociedade mais conectada e com melhor acesso à informação e aos serviços digitais.

---

## 📌 Considerações Finais

A arquitetura adotada permite evolução contínua do projeto, facilitando a adição de novos módulos, testes e integrações externas, sem comprometer a estabilidade do sistema.

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

## 📌 Considerações Finais

A arquitetura adotada permite evolução contínua do projeto, facilitando a adição de novos módulos, testes e integrações externas, sem comprometer a estabilidade do sistema.

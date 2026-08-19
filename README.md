<p align="center"><img src="./public/logo.png" width="180" alt="Logo Passe Adiante" /></p>
<h1 align="center">Passe Adiante - API</h1>
<p align="center"><strong>NestJS, Prisma e PostgreSQL para uma rede solidária de materiais escolares.</strong></p>

## Sobre o projeto

Esta API sustenta o MVP Passe Adiante, plataforma que conecta doadores a estudantes e instituições que necessitam de materiais escolares. Ela implementa autenticação, autorização por perfil, usuários, catálogo de itens e acompanhamento de solicitações.

## Tecnologias

- **TypeScript e NestJS 11:** arquitetura modular, injeção de dependências e contratos HTTP claros.
- **Prisma 7:** modelo tipado e acesso seguro ao PostgreSQL.
- **PostgreSQL 16:** integridade relacional entre usuários, itens e pedidos.
- **JWT e bcrypt:** sessão stateless e senhas armazenadas por hash.
- **class-validator:** validação e limpeza automática das entradas.
- **Jest:** testes unitários das regras centrais.

## Arquitetura

```text
src/
├── auth/       # Login, JWT, usuário atual e autorização por perfil
├── users/      # Cadastro e gestão de usuários
├── item/       # Catálogo e doações
├── orders/     # Solicitações e transições de status
├── prisma/     # Conexão e ciclo de vida do banco
└── main.ts     # ValidationPipe, CORS e bootstrap
prisma/
├── migrations/ # Estrutura versionada do banco
├── schema.prisma
└── seed.ts     # Dados locais demonstrativos
```

Cada domínio segue `Controller → Service → Repository`. Controllers tratam HTTP, services aplicam regras de negócio e repositories isolam o Prisma.

## Instalação e execução

Requisitos: Node.js 20+, Docker Desktop (recomendado), npm ou pnpm.

```bash
git clone https://github.com/Matheus-Rodrigues-EC/PassaAdiante-NestJS.git
cd PassaAdiante-NestJS
cp .env.example .env
npm install
docker compose up -d
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
```

A API estará em `http://localhost:3000` e o PostgreSQL em `localhost:5432`. Para usar uma instalação própria do PostgreSQL, ajuste `DATABASE_URL` no `.env`.

### Testes e qualidade

```bash
npm run test
npm run build
npm run lint
```

## Endpoints principais

| Método | Rota | Acesso | Finalidade |
|---|---|---|---|
| POST | `/users` | Público | Criar conta |
| POST | `/auth/login` | Público | Obter JWT e usuário sanitizado |
| GET | `/users/me` | Autenticado | Consultar perfil |
| GET | `/users` | Admin | Listar usuários |
| GET | `/items` | Público | Catálogo com filtros |
| POST | `/items` | Autenticado | Cadastrar doação |
| PATCH/DELETE | `/items/:id` | Doador/Admin | Gerenciar item |
| POST | `/orders` | Autenticado | Solicitar item |
| GET | `/orders/mine` | Autenticado | Solicitações feitas |
| GET | `/orders/received` | Autenticado | Pedidos recebidos |
| PATCH | `/orders/:id` | Envolvido/Admin | Atualizar status |
| GET | `/orders` | Admin | Listar todos os pedidos |

Filtros de `/items`: `search`, `category`, `condition`, `availability` e `userId`.

## Regras e segurança

- Senhas nunca são retornadas pela API.
- E-mails duplicados recebem conflito HTTP 409.
- Somente o proprietário ou administrador altera uma doação.
- Um usuário não pode solicitar a própria doação nem repetir uma solicitação.
- Somente itens disponíveis podem ser solicitados.
- Ao concluir o pedido, o item passa a `DONATED`; cancelamentos o tornam disponível.
- Rotas administrativas exigem JWT e perfil `ADMIN`.

## Como utilizar a aplicação

O acesso cotidiano ocorre pelo frontend. Uma pessoa cria a conta, cadastra um material ou consulta o catálogo. Ao solicitar um item, o pedido fica pendente até o doador avaliar. Depois da combinação de entrega, o pedido é concluído e o item deixa de aparecer como disponível.

Famílias, estudantes, escolas, ONGs e projetos sociais podem se beneficiar. Em uma campanha de volta às aulas, por exemplo, uma instituição cadastra kits recebidos e acompanha solicitações sem planilhas dispersas. O resultado é maior rastreabilidade, menos desperdício e acesso mais justo a recursos educacionais.

## Dados de demonstração

O seed cria `admin@passaadiante.local`, `doador@passaadiante.local` e `estudante@passaadiante.local`, todos com a senha local `PasseAdiante123!`, além de itens de exemplo. Troque `JWT_SECRET` e remova credenciais demonstrativas antes de qualquer ambiente público.

## Processo da Sprint 3

O trabalho foi dividido entre segurança e contratos, domínio, interface, integração e documentação. Foram adotados commits convencionais, módulos coesos e validação automatizada. Entre as dificuldades estavam inconsistências entre DTOs e Prisma, ausência de autenticação e regras incompletas de pedidos. As soluções foram centralizar os enums no Prisma, sanitizar respostas, aplicar guards e realizar mudanças de pedido/item em transação.

## Frontend

https://github.com/Matheus-Rodrigues-EC/Passa-Adiante-ReactJS

Projeto acadêmico da disciplina Projeto Integrado III do curso de ADS da UFCA.

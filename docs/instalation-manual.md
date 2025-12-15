<h1 align="center">🛠 Manual de Instalação</h1>

<p align="center">
  <a href="../README.md">⬅ Voltar ao Início</a>
</p>

---

## 📌 Visão Geral

Este documento descreve o processo de instalação e execução do projeto **Passe Adiante** em ambiente local, utilizando **Node.js**, **NestJS**, **Prisma ORM** e **PostgreSQL**.

---

## 🧰 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* **Node.js** >= 18
* **npm** >= 9
* **Git**
* **PostgreSQL**

> 💡 Recomenda-se o uso de Node.js LTS.

---

## 📥 Clonando o Repositório

```bash
git clone URL_DO_REPOSITORIO
cd PassaAdiante-NestJS
```

---

## 📦 Instalando Dependências

```bash
npm install
```

---

## 🔐 Configuração de Variáveis de Ambiente

Crie um arquivo **`.env`** na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL=postgres://usuario:senha@host:porta/nome_do_banco
```

### Campos:

* `usuario` → Usuário do PostgreSQL
* `senha` → Senha do banco
* `host` → Endereço do banco (ex: localhost)
* `porta` → Porta do PostgreSQL (padrão: 5432)
* `nome_do_banco` → Nome do banco de dados

---

## 🧬 Prisma ORM

### Gerar o client do Prisma

```bash
npx prisma generate
```

### Executar migrations

```bash
npx prisma migrate dev
```

---

## ▶️ Executando a Aplicação

```bash
npm run start:dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🧪 Executando Testes

```bash
npm run test
```

---

## 🐞 Problemas Comuns

* ❌ Erro de conexão com o banco
  ✔ Verifique as credenciais do `DATABASE_URL`

* ❌ Porta em uso
  ✔ Altere a porta no arquivo `.env` ou finalize o processo conflitante

---

## 📌 Considerações Finais

Após a instalação, o ambiente estará pronto para desenvolvimento, testes e evolução contínua do projeto. Recomenda-se a leitura da documentação de arquitetura para melhor compreensão da organização interna da aplicação.

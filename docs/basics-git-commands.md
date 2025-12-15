<h1 align="center">📘 Comandos Básicos do Git</h1>

<p align="center">
  <a href="../README.md">⬅ Voltar ao Início</a>
</p>

---

## 🔁 Fluxo de Trabalho Mais Comum

```bash
git status
git add .
git commit -m "feat: nova funcionalidade"
git pull
git push
```

Esse é o fluxo básico utilizado no dia a dia para versionar e enviar alterações ao repositório remoto.

---

## ⚙️ Configuração Inicial

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
git config --list
```

* Define o nome e o e-mail associados aos commits
* Lista todas as configurações ativas do Git

---

## 📦 Criar ou Obter um Repositório

```bash
git init
git clone URL_DO_REPOSITORIO
```

* `git init` → Inicializa um novo repositório local
* `git clone` → Clona um repositório remoto existente

---

## 📊 Status e Histórico

```bash
git status
git log
```

**Legenda do `git status`:**

* 🔴 Vermelho → Arquivos modificados não adicionados ao stage
* 🟢 Verde → Arquivos prontos para commit

---

## 📝 Trabalhando com Arquivos

```bash
git add .
git commit -m "mensagem do commit"
```

* Adiciona arquivos ao stage
* Cria um commit com mensagem descritiva

---

## 🌿 Branches (Ramificações)

```bash
git branch
git branch nome-da-branch
git checkout nome-da-branch
git checkout -b nome-da-branch
git merge nome-da-branch
```

---

## 🌐 Repositórios Remotos

```bash
git remote -v
git pull
git push
git push -u origin main
git push origin nome-da-branch
```

---

## ♻️ Desfazendo Alterações (Atenção ⚠️)

```bash
git restore arquivo.txt
git restore --staged arquivo.txt
git reset --soft HEAD~1
git reset --hard HEAD~1
```

> ⚠️ O comando `--hard` remove alterações de forma permanente.

---

## 🔍 Inspeção e Comparação

```bash
git diff
git diff --staged
```

---

## 🧰 Comandos Úteis Extras

```bash
git stash
git stash pop
git tag
```

* `git stash` → Guarda alterações temporariamente
* `git stash pop` → Restaura alterações guardadas
* `git tag` → Lista versões do projeto

---

## 📌 Boas Práticas

* Utilize mensagens de commit claras e padronizadas
* Faça commits pequenos e frequentes
* Sempre execute `git pull` antes de iniciar novas alterações

---

<p align="center">
  📘 Versionar bem é escrever a história do projeto com clareza
</p>

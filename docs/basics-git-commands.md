<h1 align='center'>Comandos básicos do Git</h1>

#### [Início](../README.md)

## Comandos Git.


#### Resumo prático do fluxo mais comum

1. **git status**
2. **git add .**
3. **git commit -m "feat: nova funcionalidade"**
4. **git pull**
5. **git push**

#### Configuração inicial
- **git config --global user.name "Seu Nome"** - Define o nome que aparecerá nos commits.
- **git config --global user.email "seu@email.com"** - Define o e-mail associado aos commits.
- **git config --list** - Mostra todas as configurações do Git.

#### Criar ou obter um repositório

- **git init** - Inicializa um repositório Git na pasta atual.
- **git clone URL_DO_REPOSITORIO** - Clona um repositório remoto para sua máquina.

#### Status e histórico

- **git status** - Mostra o estado atual do repositório (arquivos modificados, staged, etc).
  - <span style="color: red;">Vermelhos</span><span> - Arquivos não monitorados/adicionados para commit.</span> 
  - <span style="color: green;">Verdes</span><span> - Arquivos já prontos já preparados para o próximo commit.</span>
- **git log** - Exibe o histórico de commits.

#### Trabalhando com arquivos

- **git add .** - Adiciona todos os arquivos modificados.
- **git commit -m "mensagem do commit"** - Cria um commit com a mensagem informada.

#### Branches (ramificações)

- **git branch** - Lista todas as branches.
- **git branch _nome-da-branch_** - Cria uma nova branch.
- **git checkout _nome-da-branch_** - Muda para outra branch.
- **git checkout -b _nome-da-branch_** - Cria e já muda para a nova branch.
- **git merge _nome-da-branch_** - Mescla outra branch na branch atual.

#### Repositório remoto

- **git remote -v** - Mostra os repositórios remotos configurados.
- **git pull** - Baixa e mescla alterações do repositório remoto.
- **git push** - Envia commits locais para o repositório remoto.
- **git push -u origin main** - Define a branch main como padrão no remoto.
- **git push origin _branch_** - Envio para o repositório remoto todas as alteração preparadas com commits.

#### Desfazendo coisas (muito importante)

- **git restore arquivo.txt** - Descarta alterações locais de um arquivo.
- **git restore --staged arquivo.txt** - Remove o arquivo da área de stage.
- **git reset --soft HEAD~1** - Desfaz o último commit, mantendo as alterações.
- **git reset --hard HEAD~1** - Desfaz o commit e apaga as alterações. ⚠️

#### Inspeção e comparação

- **git diff** - Mostra diferenças entre arquivos modificados e o último commit.
- **git diff --staged** - Mostra diferenças do que já está no stage.

#### Comandos úteis extras

- **git stash** - Guarda alterações temporariamente.
- **git stash pop** - Restaura as alterações guardadas.
- **Restaura as alterações guardadas.** - Lista as tags (versões).
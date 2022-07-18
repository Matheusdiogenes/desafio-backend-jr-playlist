# Desafio Backend JR

Essa API Rest é uma implementação para o usuário criar playlist de músicas. O sistema vem com um usuário padrão (ADMIN), ele será responsável por fazer o controle de usuários.

O Sistema vem com dois tipos de usuário: USER e ADMIN

ADMIN: Responsável por fazer o controle de usuários. Ele não poderá acessar as funcionalidades destinadas ao usuário do tipo USER.
USER: Responsável por criar suas playlist. Ele não poderá acessar as funcionalidades destinadas ao usuário do tipo ADMIN.


## Setup

```
# Faça o clone ou download do projeto
git clone git@github.com:Matheusdiogenes/desafio-backend-jr-playlist.git
cd todo-list-clean-architecture
# Instale as dependências do projeto
npm install
```

Para facilitar a execução da API, inclui o arquivo `.env` para o repositório. Caso queira mudar as credenciais do usuário padrão, basta modificar as variáveis `EMAIL_ADMIN` e `PASSWORD_ADMIN`.

```
# Esse comando irá subir um container com imagem do Postgresql e configurar o database
npm run start 
# Para usar a API, execute o comando abaixo
npm run dev
# Teste de integração
npm test
```
> Observação: Ao executar o comando para fazer os testes, a base de dados será resetada.

### Tecnologias Utilizadas

- Typescript
- Express
- JWT
- Bcrypt (Para fazer o hash da senha)
- Prisma (Comunicação com o database)
- JEST (Testes)

A camada de comunicação com o database está na camada de serviços (`src/services`).

### Documentação

Para fazer a documentação, foi utilizado o Swagger. Com a API em execução, acesse a rota `/docs`

#### Acesso aos recursos

Para acessar as funcionalidades destinadas ao ADMIN, é necessário fazer o LOGIN como ADMIN.
Para acessar as funcionalidades destinadas ao USER, é necessário fazer o LOGIN como USER.

Ao fazer o cadastro no sistema, o usuário é classificado como usuário do tipo USER por padrão.

#### Funcionalidades do PUBLICAS

- Login
- Registrar-se

#### Funcionalidades do ADMIN

- Editar um usuário
- Deletar um usuário
- Listar todos os usuários

#### Funcionalidades do USER

- Criar uma playlist
- Editar uma playlist
- Deletar uma playlist
- Listar todas as playlists

#### Contato

Email: matheusdiogenes98gmail.com
Linkedin: linkedin.com/in/matheusdiogenes/

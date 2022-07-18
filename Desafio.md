# Desafio Backend Jr.

## Passos para realizar o desafio

- Você deve criar um repositório para esse desafio. 
- Desenvolver as aplicações conforme descrito abaixo.
- Após finalizar, faça o push para seu repositório, revise seu código e envie por e-mail o endereço do repositório para que possamos analisar o código.

# Descritivo do desafio

## Backend
> Importante: O backend deve ser desenvolvido utilizando typescript
O desafio é implementar um backend REST para uma aplicação de músicas.

Terão as seguintes funcionalidades:
  
  - Criar uma playlist
  - Editar uma playlist
  - Deletar uma playlist
  - Listar todas as playlists
  - Criar um usuário
  - Editar um usuário
  - Deletar um usuário
  - Listar todos os usuários
  - Login
  - Registrar-se

  > Obs.: Todos os usuário que se cadastram possuem a role USER.
  
 * As rotas de login e registro devem ser as únicas de acesso público. Todas as outras rotas devem ser restritas a usuários autenticados.
 * As funcionalidades referente a usuários devem ser acessíveis apenas para usuários com a role "ADMIN" e retornando 403 para os demais usuários.
 * Se o usuário autenticado tiver a role "USER", então apenas as playlists criadas pelo mesmo devem ser acessíveis.


> Importante: O usuário inicial deve se chamar "admin" e a senha "admin" e utilizando a role "ADMIN".

## Banco de dados

Utilize o banco de dados que tiver maior facilidade e que atenda as necessidades do desafio.

### Estrutura de dados
  ```
  user:
    id: number
    name: string
    email: string
    password: string
    role: ADMIN | USER
  ```

  ```
  playlist:
    id: number
    name: string
    genre: string;
    musics: string[];
    user_id: number
  ```

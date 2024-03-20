# Sistema-PDV
## Descrição
Este projeto é uma API para um sistema PDV  que oferece as seguintes funcionalidades:

Listar Categorias: Retorna a lista de categorias disponíveis.
Cadastrar Usuário: Cria um novo usuário no sistema.
Efetuar login do usuário: Permite que um usuário faça login no sistema.
Detalhar perfil do usuário logado: Retorna os detalhes do perfil do usuário logado.
Editar perfil do usuário logado: Permite editar as informações do perfil do usuário logado.
Cadastrar Produto: Adiciona um novo produto ao sistema.
Editar dados do produto: Atualiza as informações de um produto existente.
Listar Produtos: Retorna a lista de produtos disponíveis.
Detalhar Produto: Retorna detalhes específicos de um produto.
Excluir Produto por ID: Remove um produto do sistema com base no seu ID.
Cadastrar Cliente: Cria um novo cliente no sistema.
Editar dados do cliente: Permite editar as informações de um cliente existente.
Listar Clientes: Retorna a lista de clientes cadastrados.
Detalhar Cliente: Retorna detalhes específicos de um cliente.
Cadastrar Pedido: Adiciona um novo pedido ao sistema.
Listar Pedidos: Retorna a lista de pedidos realizados.


## IMAGEM
Rotas<br/>
![image](https://github.com/eliaszlsp/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t08/assets/116045632/2f3585e9-4277-43db-aa7d-65ca7b5774af)

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Joi](https://joi.dev/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Knex](http://knexjs.org/)
- [Multer](https://www.npmjs.com/package/multer)
- [Nodemailer](https://nodemailer.com/)
- [Nodemon](https://nodemon.io/)
- [pg](https://www.npmjs.com/package/pg)
## Instalação
1. Clone o repositório:
    ```bash
    git clone https://github.com/eliaszlsp/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t08.git
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```dotenv
URL_DB_Prod='postgres://suas_credenciais_do_bd_prod'
URL_DB_Local='postgres://suas_credenciais_do_bd_local'
PORT=3001
SECREDJWT=sua_chave_secreta_jwt
NODE_ENV=""
EMAIL_USER="seu_email@example.com"
EMAIL_PASSWORD="sua_senha_de_email"
EMAIL_SECURE="true"
EMAIL_HOST="smtp.seu_provedor_de_email.com"
EMAIL_PORT="465"
```

**Substitua suas_credenciais_do_bd_prod, suas_credenciais_do_bd_local, sua_chave_secreta_jwt, seu_email@example.com, sua_senha_de_email e outros valores pelas suas credenciais reais.** 



## Rotas e Funcionalidades

- `/categoria` : Listar Categorias,
- `/usuario `: Cadastrar Usuário,
  Detalhar perfil do usuário logado,
  Editar perfil do usuário logado,
- `/login`: Efetuar login do usuário,
- `/produto`: Cadastrar Produto,
  Editar dados do produto,
  Listar Produtos,
  Detalhar Produto,
  Excluir Produto por ID,
- `/cliente `: Cadastrar Cliente,
  Editar dados do cliente,
  Listar Clientes,
  Detalhar Cliente,
-  `/pedido` :  Cadastrar Pedido,
  Listar Pedidos





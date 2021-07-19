## Pré-requisitos
 - Node.js - Download and Install [Node.js](https://nodejs.org/en/)
 - MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/)

## Instalação
### Clone
```
$ git clone https://github.com/shakesac/1240Armazem.git
$ cd 1240Armazem
```
## Backend
### Criar variáveis de ambiente
```
$ cd backend
$ nano .env
```
```
SRV_PORT=5000
API_URL=/api/v1

DB_HOST=ENDERECO_BD
DB_PORT=PORTA_DB          // Porta padrão MySQL: 3306
DB_USER=UTILIZADOR_BD
DB_PASS=PALAVRA_PASSE_BD
DB_DATA=NOME_BD
DB_TYPE=mysql             //Possivel compatibilidade com PostgreSQL.

BCRYPT_SALT=10

JWT_SECRET=GrUp0$3sCuT4s  //Segredo do token JWT
JWT_EXPIRATION=14 days
JWT_ALGORITHM=HS256

LEASE_STATUS=pending,accepted,in progress,returned,refused,canceled
UNMUTABLE_STATUS=returned,canceled
```
** Nota **: LEASE_STATUS: É um array de todos os estados possíveis de um pedido de emprestimo. Podem ser adicionados mais separando-os com uma virgula.
            UNMUTABLE_STATUS: É um array de estados que "terminam" um emprestimo não permitindo que após a sua atribuição se possa adicionar mais estados ao emprestimo.

### Instalar modulos Node.js
```
$ npm install
```

### Correr servidor de desenvolvimento
```
$ npm start
```

## Frontend
### Instalar modulos Node.js
```
$ cd frontend
npm install
```

### Correr em modo desenvolvimento
```
npm run serve
```

### Compilação e minificação para produção
```
npm run build
```

### Personalizar configuração
See [Guia de configuração oficial](https://cli.vuejs.org/config/).

## Outros
### Ligação para a colecção Postman
[Postman](#)
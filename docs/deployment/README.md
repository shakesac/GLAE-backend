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
$ nano .env
```
```
SRV_PORT=5000
API_URL=/api/v1

DB_HOST=80.209.226.90
DB_PORT=3310
DB_USER=1240Armazem
DB_PASS=U4lL3i18%124O4rM
DB_DATA=1240Armazem
DB_TYPE=mysql

BCRYPT_SALT=10

JWT_SECRET=GrUp0$3sCuT4s
JWT_EXPIRATION=14 days
JWT_ALGORITHM=HS256

LEASE_STATUS=pending,accepted,in progress,returned,refused,canceled
UNMUTABLE_STATUS=returned,canceled
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

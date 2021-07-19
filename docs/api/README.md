# Documentação RESTAPI

## Endpoints abertos
Open endpoints não requerem autenticação.

### Autenticação
* [Login](auth/login.md) : `POST /api/v1/login/`
* [Registo](auth/register.md) : `POST /api/v1/register` 

### Relacionados com Secções e Grupos
* [Mostrar Secções](section.getAll.md) : `GET /api/v1/section/all`
* [Mostrar Grupos](subsection.getAll.md) : `GET /api/v1/section/sub/all`

## Endpoints que requerem autenticação
Endpoints fechados requerem um token válido incluído no header do pedido. Pode obter-se um token através do pedido de Login mencionado acima.

### Ralcionados com o Utilizador Actual
Cada endpoint manipula ou mostra informação relacionada com o utilizador do token fornecido com o pedido:

* [Mostrar utilizador actual](user/get.md) : `GET /user/me`

### Account related
Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

* [Show Accessible Accounts](accounts/get.md) : `GET /api/accounts/`
* [Create Account](accounts/post.md) : `POST /api/accounts/`
* [Show An Account](accounts/pk/get.md) : `GET /api/accounts/:pk/`
* [Update An Account](accounts/pk/put.md) : `PUT /api/accounts/:pk/`
* [Delete An Account](accounts/pk/delete.md) : `DELETE /api/accounts/:pk/`
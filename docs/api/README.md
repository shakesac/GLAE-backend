# RESTAPIDocs 

## Endpoints abertos

Open endpoints não requerem autenticação.

* [Login](auth/login.md) : `POST /api/v1/login/`
* [Registo](auth/register.md) : `POST /api/v1/register` 

* [Mostrar Secções](section.getAll.md) : `GET /api/v1/section/all`
* [Mostrar Grupos](subsection.getAll.md) : `GET /api/v1/section/sub/all`

## Endpoints que requerem autenticação

Endpoints fechados requerem um token válido incluído no header do pedido. Pode obter-se um token através do pedido de Login mencionado acima.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show info](user/get.md) : `GET /api/user/`
* [Update info](user/put.md) : `PUT /api/user/`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

* [Show Accessible Accounts](accounts/get.md) : `GET /api/accounts/`
* [Create Account](accounts/post.md) : `POST /api/accounts/`
* [Show An Account](accounts/pk/get.md) : `GET /api/accounts/:pk/`
* [Update An Account](accounts/pk/put.md) : `PUT /api/accounts/:pk/`
* [Delete An Account](accounts/pk/delete.md) : `DELETE /api/accounts/:pk/`
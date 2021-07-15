# Login

Utilizado para obter um Token para um utilizador registado.

**URL** : `/api/v1/login/`

**Método** : `POST`

**Requer Autenticação** : NÃO

**Data constraints**

```json
{
    "email": "[endereço de email válido]",
    "password": "[palavra-passe em texto]"
}
```

**Exemplo de dados**

```json
{
    "email": "1240@escuteiros.pt",
    "password": "abcd1234"
}
```

## Resposta de Sucesso

**Código** : `200 OK`

**Exemplo de conteúdo**

```json
{
    "status": "success",
    "message": "Sessão iniciada",
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Resposta de Erro

**Condição** : Se o utilizador não existir ou a combinação do 'email' e 'palavra-passe' esteja incorrecta.

**Código** : `400 BAD REQUEST`

**Conteúdo** :

```json
{
    "status": "failed",
    "message": "Utilizador ou senha inválidos!"
}
```
**Nota** : Não é informada a diferença entre palavra-passe errada e utilizador inexistente por uma questão de segurança.


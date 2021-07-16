# Registo

Utilizado para obter um Token para um utilizador registado.

**URL** : `/api/v1/register/`

**Método** : `POST`

**Requer Autenticação** : NÃO

**Data constraints**

```json
{
    "firstName": "[nome]",
    "lastName": "[apelido]",
    "email": "[endereço de email válido]",
    "address": "[morada]",
    "phoneNumber": "[número de telemóvel]",
    "subsectionId": "[id da subsecção a que pertence]",
    "password": "[palavra-passe em texto]",
    "confirmPassword": "[confirmar palavra-passe]"
}
```

**Exemplo de dados**

```json
{
    "firstName": "José",
    "lastName": "Silva",
    "email": "josesilva@mail.com",
    "address": "Rua Laura Alves 39, 2775-232 Parede",
    "phoneNumber": "+351910000000",
    "subsectionId": "21",
    "password": "senha",
    "confirmPassword": "senha"
}
```

## Resposta de Sucesso

**Código** : `200 OK`

**Exemplo de conteúdo**

```json
{
    "status": "success",
    "message": "O utilizador foi registado com sucesso."
}
```

## Resposta de Erro

**Condição** : Se a palavra-passe e a confirmação não coincidem.

**Código** : `400 BAD REQUEST`

**Conteúdo** :

```json
{
    "status": "failed",
    "message": "A palavra-passe e a confirmação não coincidem."
}
```

**Condição** : Se existir um utilizador registado com o endereço de email indicado.

**Código** : `400 BAD REQUEST`

**Conteúdo** :

```json
{
    "status": "failed",
    "message": "Já existe um utilizador com o email indicado."
}
```
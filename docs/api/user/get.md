# Mostrar Utilizador Actual

Recebe detalhes do utilizador actualmente autenticado.

**URL** : `/api/user/`

**Método** : `GET`

**Requer Autenticação** : SIM

**Permissões** : Nenhuma

## Resposta de Sucesso

**Código** : `200 OK`

**Exemplo de conteúdo**

Para um utilizador com o ID 1234 na base de dados local onde registou um endereço de email, nome e outras informações.

```json
{
    "status": "success",
    "data": {
        "id": 2,
        "firstName": "Tiago",
        "lastName": "Alves",
        "email": "Tiago@mail.com",
        "subsectionId": 13
    }
}
```

## Notes

* Para realizar este pedido é necessário o envio do token gerado durante o inicio de sessão nos headers. Exemplo: `{ x-access-token: YWlsLmNvbSIsImlhdCI6MTYyNjYzNTU2NCwiZX }`
# Mostrar Secções

Mostra todas as secções existentes.

**URL** : `/api/v1/section/all`

**Método** : `GET`

**Requer Autenticação** : NÃO

## Resposta de Sucesso

**Código** : `200 OK`

**Exemplo de conteúdo**

```json
{
    "status": "success",
    "data": [
        {
            "id": 0,
            "section": "Agrupamento",
            "createdAt": "2021-07-13T21:45:02.000Z",
            "updatedAt": "2021-07-13T21:45:02.000Z"
        }
    ]
}
```
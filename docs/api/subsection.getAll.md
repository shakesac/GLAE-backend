# Mostrar Secções

Mostra todos os grupos existentes.

**URL** : `/api/v1/section/sub/all`

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
            "id": 1,
            "subsection": "Branco",
            "sectionId": 1,
            "createdAt": "2021-07-16T21:45:02.000Z",
            "updatedAt": "2021-07-16T21:45:02.000Z",
            "section": {
                "id": 1,
                "section": "Alcateia",
                "createdAt": "2021-07-16T21:45:02.000Z",
                "updatedAt": "2021-07-16T21:45:02.000Z"
            }
        },
    ]
}
```
**Nota**: Também é recebido o objecto secção ao qual o grupo pertence.
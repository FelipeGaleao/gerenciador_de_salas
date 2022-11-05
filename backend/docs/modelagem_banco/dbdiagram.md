Utilizar em [dbdiagram](dbdiagram.io)

```
Table rooms {
  id int
  nome_sala str
  lotacao str
  observacao str
  agendavel str
  dt_criacao datetime
  dt_modificacao datetime
  criado_por int [ref: > users.id]
  atualizado_por int [ref: > users.id]
}

Table users {
  id int
  nome str
  sobrenome str
  senha str
  email str
  lotacao str
  tipo_usuario str
  dt_criacao datetime
  dt_modificacao datetime
  criado_por datetime
  modificado_por datetime
  token_senha str
}

Table teachers {
  id int
  nome str
  sobrenome str
  email str
  lotacao str
  siafi int
  user_id int [ref: > users.id]
}
```
Utilizar em [dbdiagram](dbdiagram.io)

```
Table Salas {
  id int
  nome_sala str
  lotacao str
  observacao str
  agendavel str
  dt_criacao datetime
  dt_modificacao datetime
  criado_por int
  atualizado_por int
}

Table Usuarios {
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
  senha str
  token_senha str
}
```
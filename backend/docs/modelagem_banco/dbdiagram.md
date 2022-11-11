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
  criado_por int [ref: > users.id]
  atualizado_por int [ref: > users.id]
  dt_criacao datetime
  dt_modificacao datetime
}

Table courses {
  id int
  nome str
  lotacao_faculdade str
  dt_criacao datetime
  dt_modificacao datetime
  curso str
  periodo str
  qtde_alunos_matriculados int 
  criado_por int [ref: > users.id]
  atualizado_por int [ref: > users.id]
}

Table events {
  id int
  nome str
  quantidade_de_pessoas int
  nome_curso str
  nome_faculdade str
  periodo str
  dt_inicio_evento datetime
  dt_fim_evento datetime
  hr_inicio_evento datetime
  hr_fim_evento datetime
  criado_por int [ref: > users.id]
  atualizado_por int [ref: > users.id]
  dt_criacao datetime
  dt_modificacao datetime
}

Table reservations {
  id int
  dt_inicio datetime
  dt_fim datetime
  dt_criacao datetime
  dt_modificacao datetime
  criado_por int [ref: > users.id]
  atualizado_por int [ref: > users.id]
  teacher_id int [ref: > teachers.id]
  course_id int [ref: > courses.id]
  room_id int [ref: > rooms.id]
  event_id int [ref: > events.id]
  user_id int [ref: > users.id]
}

```
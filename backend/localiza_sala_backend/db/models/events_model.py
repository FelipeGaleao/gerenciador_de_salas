from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import DateTime, Integer, String
from localiza_sala_backend.db.base import Base
from sqlalchemy import ForeignKey


# Table events {
#   id int
#   nome str
#   descricao str
#   quantidade_de_pessoas int
#   nome_curso str
#   nome_faculdade str
#   periodo str
#   dt_inicio_evento datetime
#   dt_fim_evento datetime
#   hr_inicio_evento datetime
#   hr_fim_evento datetime
#   criado_por int [ref: > users.id]
#   atualizado_por int [ref: > users.id]
#   dt_criacao datetime
#   dt_modificacao datetime
# }

class EventsModel(Base):
    """Model para Eventos. """

    __tablename__ = "events"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    nome = Column(String(length=200))  # noqa: WPS432
    descricao = Column(String(length=200))  # noqa: WPS432
    quantidade_de_pessoas = Column(Integer())
    nome_curso = Column(String(length=200))  # noqa: WPS432
    nome_faculdade = Column(String(length=200))  # noqa: WPS432
    dt_inicio_evento = Column(DateTime())
    dt_fim_evento = Column(DateTime())
    hr_inicio_evento = Column(DateTime())
    hr_fim_evento = Column(DateTime())
    criado_por = Column(Integer(), ForeignKey("users.id"))
    atualizado_por = Column(Integer(), ForeignKey("users.id"))
    dt_criacao = Column(DateTime())
    dt_modificacao = Column(DateTime())

from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import DateTime, Integer, String, Boolean
from sqlalchemy.orm import relationship
from localiza_sala_backend.db.base import Base
from sqlalchemy import ForeignKey


class RoomsModel(Base):
    """Model para Salas/Laboratórios."""

    __tablename__ = "rooms"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    nome_sala = Column(String(length=200))
    lotacao = Column(Integer())
    observacao = Column(String(length=2000))
    agendavel = Column(Boolean())
    dt_criacao = Column(DateTime())
    dt_atualizacao = Column(DateTime())
    criado_por = Column(Integer(), ForeignKey("users.id"))
    atualizado_por = Column(Integer(), ForeignKey("users.id"))

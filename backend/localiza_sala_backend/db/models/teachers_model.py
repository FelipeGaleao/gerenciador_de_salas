from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import DateTime, Integer, String, Boolean
from sqlalchemy.orm import relationship
from localiza_sala_backend.db.base import Base
from sqlalchemy import ForeignKey


class TeachersModel(Base):
    """Model para Professores"""

    __tablename__ = "teachers"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    nome = Column(String(length=200))
    sobrenome = Column(String(length=200))
    lotacao = Column(String(length=200))
    siafi = Column(Integer())
    user_id = Column(Integer(), ForeignKey("users.id"))
    dt_criacao = Column(DateTime())
    dt_atualizacao = Column(DateTime())
    criado_por = Column(Integer(), ForeignKey("users.id"))
    atualizado_por = Column(Integer(), ForeignKey("users.id"))
    
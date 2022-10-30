from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import DateTime, Integer, String

from localiza_sala_backend.db.base import Base


class UsersModel(Base):
    """Model para usuários."""

    __tablename__ = "users"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    nome = Column(String(length=200))  # noqa: WPS432
    sobrenome = Column(String(length=200))  # noqa: WPS432
    senha = Column(String(length=2000))  # noqa: WPS432
    email = Column(String(length=200))  # noqa: WPS432
    lotacao = Column(String(length=200))  # noqa: WPS432
    tipo_usuario = Column(Integer())  # noqa: WPS432
    dt_criacao = Column(DateTime())  # noqa: WPS432
    dt_atualizacao = Column(DateTime())  # noqa: WPS432
    criado_por = Column(Integer())  # noqa: WPS432
    atualizado_por = Column(Integer())  # noqa: WPS432
    token_senha = Column(String(length=2000))  # noqa: WPS432

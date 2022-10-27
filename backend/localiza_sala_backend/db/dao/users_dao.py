from typing import List, Optional

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from localiza_sala_backend.db.dependencies import get_db_session
from localiza_sala_backend.db.models.dummy_model import DummyModel
from localiza_sala_backend.db.models.users_model import UsersModel

class UsersDAO:
    """Class para acessar usuários no banco de dados."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session

    async def create_user(self, nome: str, sobrenome: str, senha: str, email: str, lotacao: str, tipo_usuario: int, dt_criacao: str, dt_modificacao: str, criado_por: int, atualizado_por: int, token_senha: str) -> None:
        """
        Adicionar um novo usuário ao banco de dados.

        :param name: name of a dummy.
        """
        self.session.add(UsersModel(nome=nome, sobrenome=sobrenome, senha=senha, email=email, lotacao=lotacao, tipo_usuario=tipo_usuario, dt_criacao=dt_criacao, dt_atualizacao=dt_modificacao, criado_por=criado_por, atualizado_por=atualizado_por, token_senha=token_senha))

    async def get_all_dummies(self, limit: int, offset: int) -> List[DummyModel]:
        """
        Get all dummy models with limit/offset pagination.

        :param limit: limit of dummies.
        :param offset: offset of dummies.
        :return: stream of dummies.
        """
        raw_dummies = await self.session.execute(
            select(DummyModel).limit(limit).offset(offset),
        )

        return raw_dummies.scalars().fetchall()

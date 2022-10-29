from typing import List, Optional

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from localiza_sala_backend.db.dependencies import get_db_session
from localiza_sala_backend.db.models.dummy_model import DummyModel
from localiza_sala_backend.db.models.users_model import UsersModel

from datetime import datetime
class UsersDAO:
    """Class para acessar usuários no banco de dados."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session

    async def create_user(self, nome: str, sobrenome: str, senha: str, email: str, lotacao: str, tipo_usuario: int, dt_criacao: str, dt_atualizacao: datetime, criado_por: int, atualizado_por: int, token_senha: str) -> None:
        """
        Adicionar um novo usuário ao banco de dados.

        :param name: name of a dummy.
        """
        try:
            self.session.add(UsersModel(nome=nome, sobrenome=sobrenome, senha=senha, email=email, lotacao=lotacao, tipo_usuario=tipo_usuario, dt_criacao=dt_criacao, dt_atualizacao=dt_atualizacao, criado_por=criado_por, atualizado_por=atualizado_por, token_senha=token_senha))
            await self.session.commit()
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e

    async def get_all_users(self, limit: int, offset: int) -> List[UsersModel]:
        """
        Get all dummy models with limit/offset pagination.

        :param limit: limit of dummies.
        :param offset: offset of dummies.
        :return: stream of dummies.
        """
        raw_users = await self.session.execute(
            select(UsersModel).limit(limit).offset(offset),
        )

        return raw_users.scalars().fetchall()

    async def update_user(self, user: UsersModel) -> None:
        """
        Update user by id.

        :param id: id of user.
        """
        check_user = await self.session.execute(
            select(UsersModel).where(UsersModel.id == user.id),
        )
        
        check_user = check_user.scalars().first()

        print(check_user)
        
        if not check_user:
            raise Exception("Usuário não foi encontrado.")

        user_data = user.dict(exclude_unset=True)
        for key, value in user_data.items():
            setattr(check_user, key, value)
        try:
            await self.session.commit()
            return user_data
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e
    

    async def get_user_by_email(self, email: str) -> Optional[UsersModel]:
        """
        Get user by email.

        :param email: email of user.
        :return: user.
        """
        raw_user = await self.session.execute(
            select(UsersModel).where(UsersModel.email == email),
        )

        return raw_user.scalars().first()
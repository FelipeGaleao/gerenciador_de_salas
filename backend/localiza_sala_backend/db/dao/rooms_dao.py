from typing import List, Optional, Union

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from localiza_sala_backend.db.dependencies import get_db_session
from localiza_sala_backend.db.models.rooms_model import RoomsModel

from datetime import datetime
class RoomsDAO:
    """Class para acessar usuários no banco de dados."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session

    async def create_room(self, nome_sala: str, lotacao: int, observacao: str, agendavel: bool, dt_criacao: datetime, dt_atualizacao: datetime, criado_por: int) -> None:
        """
        Adiciona uma sala no banco de dados.

        :param nome_sala: nome da sala.
        :param lotacao: lotação da sala.
        :param observacao: observação da sala.
        :param agendavel: se a sala é agendável.
        :param dt_criacao: data de criação da sala.
        :param dt_atualizacao: data de atualização da sala.
        :param criado_por: usuário que criou a sala.
        :param atualizado_por: usuário que atualizou a sala.
        """
        try:
            self.session.add(RoomsModel(nome_sala=nome_sala, lotacao=lotacao, observacao=observacao, agendavel=agendavel, dt_criacao=dt_criacao, dt_atualizacao=dt_atualizacao, criado_por=criado_por))
            await self.session.commit()
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e

    async def get_all_rooms(self, limit: int = 25, offset: int = 0) -> List[RoomsModel]:
        """
        Retorna todas as salas.

        :param limit: limite de salas a serem retornadas.
        :param offset: offset de salas a serem retornadas.
        :return: lista de salas.
        """
        raw_users = await self.session.execute(
            select(RoomsModel).limit(limit).offset(offset),
        )
        return raw_users.scalars().fetchall()
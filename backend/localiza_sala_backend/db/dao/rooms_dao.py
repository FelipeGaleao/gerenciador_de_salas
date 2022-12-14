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

    async def get_room_by_id(self, id: int) -> Optional[RoomsModel]:
        """
        Retorna uma sala pelo id.

        :param id: id da sala.
        :return: sala.
        """
        raw_user = await self.session.execute(
            select(RoomsModel).where(RoomsModel.id == id),
        )
        try: 
            return raw_user.scalars().one()
        except:
            return None

    async def update_room(self, room: RoomsModel) -> None:
        """
        Atualiza uma sala.
        """
        
        check_room = await self.session.execute(
                    select(RoomsModel).where(RoomsModel.id == room.room_id),
                )

        check_room = check_room.scalars().first()
        
        if not check_room:
            raise Exception("Sala não foi encontrada.")

        room_data = room.dict(exclude_unset=True)
        for key, value in room_data.items():
            setattr(check_room, key, value)
        try:
            await self.session.commit()
            return room_data
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e

    async def delete_room_by_id(self, id: int) -> None:
        """
        Deleta uma sala pelo id.

        :param id: id da sala.
        """
        raw_user = await self.session.execute(
            select(RoomsModel).where(RoomsModel.id == id),
        )
        try: 
            room = raw_user.scalars().one()
            await self.session.delete(room)
            await self.session.commit()
        except:
            raise Exception("Sala não foi encontrada.")
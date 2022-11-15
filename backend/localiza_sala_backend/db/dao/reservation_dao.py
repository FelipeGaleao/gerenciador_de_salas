from typing import List, Optional, Union
from localiza_sala_backend.db.models.rooms_model import RoomsModel

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from localiza_sala_backend.db.dependencies import get_db_session
from localiza_sala_backend.db.models.reservations_model import ReservationsModel

from datetime import datetime


# class ReservationsModel(Base):
#     """Model para Reservas"""

#     __tablename__ = "reservations"

#     id = Column(Integer(), primary_key=True, autoincrement=True)
#     dt_inicio = Column(DateTime())
#     dt_fim = Column(DateTime())
#     dt_criacao = Column(DateTime())
#     hr_inicio_evento = Column(Time(timezone=False))
#     hr_fim_evento =  Column(Time(timezone=False))
#     dt_modificacao = Column(DateTime())
#     criado_por = Column(Integer(), ForeignKey("users.id"))
#     atualizado_por = Column(Integer(), ForeignKey("users.id"))
#     teacher_id = Column(Integer(), ForeignKey("teachers.id"))
#     room_id = Column(Integer(), ForeignKey("rooms.id"))
#     event_id = Column(Integer(), ForeignKey("events.id"))
#     course_id = Column(Integer(), ForeignKey("courses.id"))
#     user_id = Column(Integer(), ForeignKey("users.id"))



class ReservationsDAO:
    """Class para acessar reservas no banco de dados."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session

    async def create_new_reservation(self, dt_inicio: datetime, dt_fim: datetime, dt_criacao: datetime, hr_inicio_evento: datetime, hr_fim_evento: datetime, dt_modificacao: datetime, criado_por: int, atualizado_por: int, teacher_id: int, room_id: int, event_id: int, course_id: int, user_id: int) -> None:
        """
        Adiciona uma reserva no banco de dados.

        :param nome_sala: nome da sala.
        """
        try:
            self.session.add(ReservationsModel(dt_inicio=dt_inicio, dt_fim=dt_fim, dt_criacao=dt_criacao, hr_inicio_evento=hr_inicio_evento, hr_fim_evento=hr_fim_evento, dt_modificacao=dt_modificacao, criado_por=criado_por, atualizado_por=atualizado_por, teacher_id=teacher_id, room_id=room_id, event_id=event_id, course_id=course_id, user_id=user_id))
            await self.session.commit()
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e

    async def get_all_reservations(self, limit: int = 25, offset: int = 0) -> List[ReservationsModel]:
        """
        Retorna todas as reservas.

        :param limit: limite de reservas a serem retornadas.
        :param offset: offset de reservas a serem retornadas.
        :return: lista de reservas.
        """
        raw_reservations = await self.session.execute(
            select(ReservationsModel).limit(limit).offset(offset),
        )
        return raw_reservations.scalars().fetchall()
    async def get_reservation_by_id(self, id: int) -> Optional[ReservationsModel]:
        """
        Retorna uma reserva pelo id.

        :param id: id da reserva.
        :return: reserva.
        """
        raw_user = await self.session.execute(
            select(ReservationsModel).where(ReservationsModel.id == id),
        )
        try: 
            return raw_user.scalars().one()
        except:
            raise Exception("Reserva não encontrada")

    # async def update_room(self, room: RoomsModel) -> None:
    #     """
    #     Atualiza uma sala.
    #     """
        
    #     check_room = await self.session.execute(
    #                 select(RoomsModel).where(RoomsModel.id == room.room_id),
    #             )

    #     check_room = check_room.scalars().first()
        
    #     if not check_room:
    #         raise Exception("Sala não foi encontrada.")

    #     room_data = room.dict(exclude_unset=True)
    #     for key, value in room_data.items():
    #         setattr(check_room, key, value)
    #     try:
    #         await self.session.commit()
    #         return room_data
    #     except Exception as e:
    #         print(e)
    #         await self.session.rollback()
    #         raise e

    # async def delete_room_by_id(self, id: int) -> None:
    #     """
    #     Deleta uma sala pelo id.

    #     :param id: id da sala.
    #     """
    #     raw_user = await self.session.execute(
    #         select(RoomsModel).where(RoomsModel.id == id),
    #     )
    #     try: 
    #         room = raw_user.scalars().one()
    #         await self.session.delete(room)
    #         await self.session.commit()
    #     except:
    #         raise Exception("Sala não foi encontrada.")
from typing import List, Optional, Union
from localiza_sala_backend.db.models.events_model import EventsModel

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from localiza_sala_backend.db.dependencies import get_db_session

from datetime import datetime

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


class EventsDAO:
    """Class para acessar eventos no banco de dados."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session
    
    async def create_event(self, nome: str, descricao: str, quantidade_de_pessoas: int, nome_curso: str, nome_faculdade: str, dt_inicio_evento: datetime, dt_fim_evento: datetime, hr_inicio_evento: datetime, hr_fim_evento: datetime, criado_por: int, atualizado_por: int, dt_criacao: datetime, dt_modificacao: datetime) -> None:
        """
        Cria um evento.
        """
        try:
            self.session.add(EventsModel(nome=nome, descricao=descricao, quantidade_de_pessoas=quantidade_de_pessoas, nome_curso=nome_curso, nome_faculdade=nome_faculdade, dt_inicio_evento=dt_inicio_evento, dt_fim_evento=dt_fim_evento, hr_inicio_evento=hr_inicio_evento, hr_fim_evento=hr_fim_evento, criado_por=criado_por, dt_criacao=dt_criacao, dt_modificacao=dt_modificacao, atualizado_por=atualizado_por))
            await self.session.commit()
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e


    async def get_all_events(self, limit: int = 25, offset: int = 0) -> List[EventsModel]:
        """
        Retorna todas os eventos do banco de dados.

        :param limit: limite de eventos a serem retornadas.
        :param offset: offset de eventos a serem retornadas.
        :return: lista de professores.
        """
        raw_courses = await self.session.execute(
            select(EventsModel).limit(limit).offset(offset),
        )
        return raw_courses.scalars().fetchall()

    async def get_event_by_id(self, id: int) -> Optional[EventsModel]:
        """
        Retorna um evento pelo id 

        :param id: id do evento
        :return: evento
        """
        raw_user = await self.session.execute(
            select(EventsModel).where(EventsModel.id == id),
        )
        try: 
            return raw_user.scalars().one()
        except:
            return None

    async def update_event(self, event: EventsModel) -> None:
        """
        Atualiza um evento.
        """
        
        check_event = await self.session.execute(
                    select(EventsModel).where(EventsModel.id == event.event_id),
                )

        check_event = check_event.scalars().first()
        
        if not check_event:
            raise Exception("Evento não foi encontrada.")

        event_data = event.dict(exclude_unset=True)
        for key, value in event_data.items():
            setattr(check_event, key, value)
        try:
            await self.session.commit()
            return event_data
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e

    async def delete_event_by_id(self, id: int) -> None:
        """
        Deleta um evento pelo id

        :param id: id da evento.
        """
        raw_user = await self.session.execute(
            select(EventsModel).where(EventsModel.id == id),
        )
        try: 
            event = raw_user.scalars().one()
            await self.session.delete(event)
            await self.session.commit()
        except:
            raise Exception("Evento não foi encontrado.")
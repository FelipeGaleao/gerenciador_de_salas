from typing import List, Optional, Union

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from localiza_sala_backend.db.dependencies import get_db_session
from localiza_sala_backend.db.models.teachers_model import TeachersModel

from datetime import datetime
class TeachersDAO:
    """Class para acessar usuários no banco de dados."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session

    async def create_teacher(self, nome: str, sobrenome: str, lotacao: str, siafi: int, user_id: int, dt_criacao: datetime, dt_atualizacao: datetime, criado_por: int) -> None:
        """
        Adiciona um professor no banco de dados.

        :param nome: nome do professor.
        :param sobrenome: sobrenome do professor.
        :param lotacao: lotação do professor.
        :param siafi: siafi do professor.
        :param dt_criacao: data de criação do professor.
        :param dt_atualizacao: data de atualização do professor.
        :param criado_por: usuário que criou o professor.
        :param atualizado_por: usuário que atualizou o professor.
        """
        try:
            self.session.add(TeachersModel(nome=nome, sobrenome=sobrenome, lotacao=lotacao, siafi=siafi, user_id=user_id, dt_criacao=dt_criacao, dt_atualizacao=dt_atualizacao, criado_por=criado_por,))
            await self.session.commit()
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e

    # async def create_room(self, nome_sala: str, lotacao: int, observacao: str, agendavel: bool, dt_criacao: datetime, dt_atualizacao: datetime, criado_por: int) -> None:
    #     """
    #     Adiciona uma sala no banco de dados.

    #     :param nome_sala: nome da sala.
    #     :param lotacao: lotação da sala.
    #     :param observacao: observação da sala.
    #     :param agendavel: se a sala é agendável.
    #     :param dt_criacao: data de criação da sala.
    #     :param dt_atualizacao: data de atualização da sala.
    #     :param criado_por: usuário que criou a sala.
    #     :param atualizado_por: usuário que atualizou a sala.
    #     """
    #     try:
    #         self.session.add(RoomsModel(nome_sala=nome_sala, lotacao=lotacao, observacao=observacao, agendavel=agendavel, dt_criacao=dt_criacao, dt_atualizacao=dt_atualizacao, criado_por=criado_por))
    #         await self.session.commit()
    #     except Exception as e:
    #         print(e)
    #         await self.session.rollback()
    #         raise e

    async def get_all_teachers(self, limit: int = 25, offset: int = 0) -> List[TeachersModel]:
        """
        Retorna todos os professores do banco de dados.

        :param limit: limite de professores a serem retornadas.
        :param offset: offset de professores a serem retornadas.
        :return: lista de professores.
        """
        raw_users = await self.session.execute(
            select(TeachersModel).limit(limit).offset(offset),
        )
        return raw_users.scalars().fetchall()

    async def get_teacher_by_id(self, id: int) -> Optional[TeachersModel]:
        """
        Retorna uma sala pelo id.

        :param id: id da sala.
        :return: sala.
        """
        raw_user = await self.session.execute(
            select(TeachersModel).where(TeachersModel.id == id),
        )
        try: 
            return raw_user.scalars().one()
        except:
            return None

    async def update_teacher(self, teacher: TeachersModel) -> None:
        """
        Atualiza um professor.
        """
        
        check_teacher = await self.session.execute(
                    select(TeachersModel).where(TeachersModel.id == teacher.teacher_id),
                )

        check_teacher = check_teacher.scalars().first()
        
        if not check_teacher:
            raise Exception("Sala não foi encontrada.")

        teacher_data = teacher.dict(exclude_unset=True)
        for key, value in teacher_data.items():
            setattr(check_teacher, key, value)
        try:
            await self.session.commit()
            return teacher_data
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e

    async def delete_teacher_by_id(self, id: int) -> None:
        """
        Deleta um professor pelo id

        :param id: id do professor.
        """
        raw_user = await self.session.execute(
            select(TeachersModel).where(TeachersModel.id == id),
        )
        try: 
            room = raw_user.scalars().one()
            await self.session.delete(room)
            await self.session.commit()
        except:
            raise Exception("Professor não foi encontrado.")
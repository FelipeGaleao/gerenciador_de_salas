from typing import List, Optional, Union

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from localiza_sala_backend.db.dependencies import get_db_session
from localiza_sala_backend.db.models.courses_model import CoursesModel

from datetime import datetime

class CoursesDAO:
    """Class para acessar disciplinas no banco de dados."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session
    
    async def create_course(self, nome: str, teacher_id: int, lotacao_faculdade: str, curso: str, periodo: str, qtde_alunos_matriculados: int, criado_por: int, atualizado_por: int, dt_criacao: datetime, dt_atualizacao: datetime, dt_inicio_disciplina: datetime, dt_fim_disciplina: datetime, hr_inicio_disciplina: datetime, hr_fim_disciplina: datetime, room_id: int, segunda_aula: bool, terca_aula: bool, quarta_aula: bool, quinta_aula: bool, sexta_aula: bool, sabado_aula: bool, domingo_aula: bool) -> CoursesModel:
        """
        Cria uma disciplina.

        :param course: disciplina.
        """
        course = CoursesModel(nome=nome, teacher_id=teacher_id, lotacao_faculdade=lotacao_faculdade, curso=curso, periodo=periodo, qtde_alunos_matriculados=qtde_alunos_matriculados, criado_por=criado_por, atualizado_por=atualizado_por, dt_criacao=dt_criacao, dt_atualizacao=dt_atualizacao, dt_inicio_disciplina=dt_inicio_disciplina, dt_fim_disciplina=dt_fim_disciplina, hr_inicio_disciplina=hr_inicio_disciplina, hr_fim_disciplina=hr_fim_disciplina, room_id = room_id, segunda_aula = segunda_aula, terca_aula = terca_aula, quarta_aula = quarta_aula, quinta_aula = quinta_aula, sexta_aula = sexta_aula, sabado_aula = sabado_aula, domingo_aula = domingo_aula)
        try:
            self.session.add(course)
            await self.session.commit()
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e
        return course

    async def get_all_courses(self, limit: int = 25, offset: int = 0) -> List[CoursesModel]:
        """
        Retorna todas os disciplinas do banco de dados.

        :param limit: limite de disciplinas a serem retornadas.
        :param offset: offset de disciplinas a serem retornadas.
        :return: lista de professores.
        """
        raw_courses = await self.session.execute(
            select(CoursesModel).limit(limit).offset(offset),
        )
        return raw_courses.scalars().fetchall()

    async def get_course_by_id(self, id: int) -> Optional[CoursesModel]:
        """
        Retorna uma disciplian pelo id.

        :param id: id da disciplina
        :return: disciplina
        """
        raw_user = await self.session.execute(
            select(CoursesModel).where(CoursesModel.id == id),
        )
        try: 
            return raw_user.scalars().one()
        except:
            return None

    async def update_course(self, course: CoursesModel) -> None:
        """
        Atualiza uma disciplina.
        """
        
        check_course = await self.session.execute(
                    select(CoursesModel).where(CoursesModel.id == course.course_id),
                )

        check_course = check_course.scalars().first()
        
        if not check_course:
            raise Exception("Disciplina n??o foi encontrada.")

        course_data = course.dict(exclude_unset=True)
        for key, value in course_data.items():
            setattr(check_course, key, value)
        try:
            await self.session.commit()
            return course_data
        except Exception as e:
            print(e)
            await self.session.rollback()
            raise e

    async def delete_course_by_id(self, id: int) -> None:
        """
        Deleta uma disciplina pelo id

        :param id: id da disciplina.
        """
        raw_user = await self.session.execute(
            select(CoursesModel).where(CoursesModel.id == id),
        )
        try: 
            course = raw_user.scalars().one()
            await self.session.delete(course)
            await self.session.commit()
        except:
            raise Exception("Disciplina n??o foi encontrada.")
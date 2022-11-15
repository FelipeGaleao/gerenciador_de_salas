from pydantic import BaseModel, Field
from datetime import datetime, time, timedelta
from typing import Union


class CoursesModelView(BaseModel):
    id: Union[int, None] = Field(None, example=1)
    nome: str = Field(..., example="Estrutura de Dados I")
    teacher_id: int = Field(..., example=1)
    lotacao_faculdade: str = Field(..., example="Faculdade de Computacao")
    curso: str = Field(..., example="Ciencia da Computacao")
    periodo: str = Field(..., example="2021.1 - Vespertino")
    qtde_alunos_matriculados: int = Field(..., example=10)
    criado_por: int = Field(..., example=1)
    atualizado_por: Union[int, None] = Field(..., example=1)
    dt_inicio_disciplina: Union[datetime, None] = Field(None, example=datetime.now())
    dt_fim_disciplina: Union[datetime, None] = Field(None, example=datetime.now())
    hr_inicio_disciplina: Union[time, None] = Field(None, example=time(8, 0, 0))
    hr_fim_disciplina: Union[time, None] = Field(None, example=time(9, 0, 0))
    dt_criacao: datetime = Field(..., example=datetime.now())
    dt_atualizacao: Union[datetime, None] = Field(None, example=datetime.now())
    room_id: Union[int, None] = Field(None, example=1)

    class Config:
        orm_mode = True

class CoursesModelsDTO(BaseModel):
    """
    DTO for Courses Model

    Valores retornados ao acessar usuários.
    """
    nome: str = Field(..., example="Estrutura de Dados I")
    teacher_id: int = Field(..., example=1)
    lotacao_faculdade: str = Field(..., example="Faculdade de Computacao")
    curso: str = Field(..., example="Ciencia da Computacao")
    periodo: str = Field(..., example="2021.1 - Vespertino")
    qtde_alunos_matriculados: int = Field(..., example=10)
    dt_inicio_disciplina: Union[datetime, None] = Field(None, example=datetime.now())
    dt_fim_disciplina: Union[datetime, None] = Field(None, example=datetime.now())
    hr_inicio_disciplina: Union[time, None] = Field(None, example=time(8, 0, 0))
    hr_fim_disciplina: Union[time, None] = Field(None, example=time(9, 0, 0))
    criado_por: int = Field(None, example=1)
    atualizado_por: Union[int, None] = Field(None, example=1)
    dt_criacao: Union[datetime, None] = Field(None, example=datetime.now())
    dt_atualizacao: Union[datetime, None] = Field(None, example=datetime.now())
    segunda_aula: Union[bool, None] = Field(None, example=True)
    terca_aula: Union[bool, None] = Field(None, example=True)
    quarta_aula: Union[bool, None] = Field(None, example=True)
    quinta_aula: Union[bool, None] = Field(None, example=True)
    sexta_aula: Union[bool, None] = Field(None, example=True)
    sabado_aula: Union[bool, None] = Field(None, example=True)
    domingo_aula: Union[bool, None] = Field(None, example=True)
    room_id: Union[int, None] = Field(None, example=1)

    class Config:
        orm_mode = True
    
class CoursesModelUpdate(BaseModel):
    """
    DTO for Room Model

    Valores retornados ao acessar usuários.
    """
    course_id: int = Field(..., example=1)
    nome: Union[str, None] = Field(None, example="Estrutura de Dados I")
    teacher_id: Union[int, None] = Field(None, example=1)
    lotacao_faculdade: Union[str, None] = Field(None, example="Faculdade de Computacao")
    curso: Union[str, None] = Field(None, example="Ciencia da Computacao")
    periodo: Union[str, None] = Field(None, example="2021.1 - Vespertino")
    qtde_alunos_matriculados: Union[int, None] = Field(None, example=10)
    dt_inicio_disciplina: Union[datetime, None] = Field(None, example=datetime.now())
    dt_fim_disciplina: Union[datetime, None] = Field(None, example=datetime.now())
    hr_inicio_disciplina: Union[time, None] = Field(None, example=time(8, 0, 0))
    hr_fim_disciplina: Union[time, None] = Field(None, example=time(9, 0, 0))
    criado_por: int = Field(None, example=1)
    atualizado_por: Union[int, None] = Field(None, example=1)
    dt_criacao: Union[datetime, None] = Field(None, example=datetime.now())
    dt_atualizacao: Union[datetime, None] = Field(None, example=datetime.now())
    room_id: Union[int, None] = Field(None, example=1)


    class Config:
        orm_mode = True
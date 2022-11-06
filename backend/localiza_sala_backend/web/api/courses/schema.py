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
    dt_criacao: datetime = Field(..., example=datetime.now())
    dt_atualizacao: Union[datetime, None] = Field(None, example=datetime.now())

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
    criado_por: int = Field(None, example=1)
    atualizado_por: Union[int, None] = Field(None, example=1)
    dt_criacao: datetime = Field(..., example=datetime.now())
    dt_atualizacao: Union[datetime, None] = Field(None, example=datetime.now())

    class Config:
        orm_mode = True
    
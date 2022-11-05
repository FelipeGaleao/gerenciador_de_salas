from pydantic import BaseModel, Field
from datetime import datetime, time, timedelta
from typing import Union


class TeacherModelView(BaseModel):
    id: int = Field(..., example=1)
    nome: str = Field(..., example="João da Silva")
    sobrenome: Union[str, None] = Field(None, example="Galvão")
    lotacao: str = Field(..., example="Departamento de Ciências Exatas")
    dt_criacao: datetime = Field(..., example=datetime.now())
    dt_atualizacao: datetime = Field(..., example=datetime.now())
    criado_por: int = Field(..., example=1)
    atualizado_por: Union[int, None] = Field(None, example=1)

    class Config:
        orm_mode = True

class TeacherModelDTO(BaseModel):
    """
    DTO for Teachers Model

    Valores retornados ao acessar usuários.
    """
    nome: str = Field(..., example="João da Silva")
    sobrenome: str = Field(..., example="Silva")
    lotacao: str = Field(..., example="Departamento de Matemática")
    siafi: int = Field(..., example=123456)
    user_id: Union[int, None] = Field(None, example=1)
    dt_criacao: datetime = Field(None, example=datetime.now())
    dt_atualizacao: Union[datetime, None] = Field(None, example=datetime.now())
    criado_por: Union[int, None] = Field(None, example=1)

    class Config:
        orm_mode = True
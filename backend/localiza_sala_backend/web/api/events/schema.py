from pydantic import BaseModel, Field
from datetime import datetime, time, timedelta
from typing import Union

# nome: str = Field(..., example="Estrutura de Dados I")
#     descricao: Union[str, None] = Field(None, example="Aula de Estrutura de Dados I")
#     quantidade_de_pessoas: int = Field(..., example=10)
#     nome_curso: str = Field(..., example="Ciencia da Computacao")
#     nome_faculdade: str = Field(..., example="Faculdade de Computacao")
#     dt_inicio_evento: datetime = Field(..., example=datetime.now())
#     dt_fim_evento: datetime = Field(..., example=datetime.now())
#     hr_inicio_evento: time = Field(..., example=time(hour=8, minute=0))
#     hr_fim_evento: time = Field(..., example=time(hour=10, minute=0))
#     criado_por: int = Field(None, example=1)
#     atualizado_por: Union[int, None] = Field(None, example=1)
#     dt_criacao: Union[datetime, None] = Field(None, example=datetime.now())
#     dt_modificacao: Union[datetime, None] = Field(None, example=datetime.now())

class EventsModelView(BaseModel):
    """Model para Eventos. """
    id: Union[None, int] = Field(None, example=1)
    nome: str = Field(..., example="Estrutura de Dados I")
    descricao: Union[str, None] = Field(None, example="Aula de Estrutura de Dados I")
    quantidade_de_pessoas: int = Field(..., example=10)
    nome_curso: str = Field(..., example="Ciencia da Computacao")
    nome_faculdade: str = Field(..., example="Faculdade de Computacao")
    dt_inicio_evento: datetime = Field(..., example=datetime.now())
    dt_fim_evento: datetime = Field(..., example=datetime.now())
    hr_inicio_evento: time = Field(..., example=time(hour=8, minute=0))
    hr_fim_evento: time = Field(..., example=time(hour=10, minute=0))
    criado_por: int = Field(None, example=1)
    atualizado_por: Union[int, None] = Field(None, example=1)
    dt_criacao: Union[datetime, None] = Field(None, example=datetime.now())
    dt_modificacao: Union[datetime, None] = Field(None, example=datetime.now())
    
    class Config:
        orm_mode = True

class EventsModelInput(BaseModel):
    """
    DTO para criação de eventos.
    """
    nome: str = Field(..., example="Estrutura de Dados I")
    descricao: Union[str, None] = Field(None, example="Aula de Estrutura de Dados I")
    quantidade_de_pessoas: int = Field(..., example=10)
    nome_curso: str = Field(..., example="Ciencia da Computacao")
    nome_faculdade: str = Field(..., example="Faculdade de Computacao")
    dt_inicio_evento: datetime = Field(..., example=datetime.now())
    dt_fim_evento: datetime = Field(..., example=datetime.now())
    hr_inicio_evento: time = Field(..., example=time(hour=8, minute=0))
    hr_fim_evento: time = Field(..., example=time(hour=10, minute=0))
    criado_por: int = Field(None, example=1)
    atualizado_por: Union[int, None] = Field(None, example=1)
    dt_criacao: Union[datetime, None] = Field(None, example=datetime.now())
    dt_modificacao: Union[datetime, None] = Field(None, example=datetime.now())

    class Config:
        orm_mode = True
    
class EventsModelUpdate(BaseModel):

    """
    DTO for Event Model

    Valores retornados ao acessar usuários.
    """
    event_id: int = Field(..., example=1)
    nome: str = Field(..., example="Estrutura de Dados I")
    descricao: Union[str, None] = Field(None, example="Aula de Estrutura de Dados I")
    quantidade_de_pessoas: int = Field(..., example=10)
    nome_curso: str = Field(..., example="Ciencia da Computacao")
    nome_faculdade: str = Field(..., example="Faculdade de Computacao")
    dt_inicio_evento: datetime = Field(..., example=datetime.now())
    dt_fim_evento: datetime = Field(..., example=datetime.now())
    hr_inicio_evento: time = Field(..., example=time(hour=8, minute=0))
    hr_fim_evento: time = Field(..., example=time(hour=10, minute=0))
    criado_por: int = Field(None, example=1)
    atualizado_por: Union[int, None] = Field(None, example=1)
    dt_criacao: Union[datetime, None] = Field(None, example=datetime.now())
    dt_modificacao: Union[datetime, None] = Field(None, example=datetime.now())

    class Config:
        orm_mode = True
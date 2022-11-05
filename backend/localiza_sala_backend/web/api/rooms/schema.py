from pydantic import BaseModel, Field
from datetime import datetime, time, timedelta
from typing import Union

class RoomModelView(BaseModel):
    id: int = Field(..., example=1)
    nome_sala: str = Field(..., example="Sala 1")
    lotacao: int = Field(..., example=10)
    observacao: Union[str, None] = Field(..., example="Sala 1")
    agendavel: bool = Field(..., example=True)
    dt_criacao: datetime = Field(..., example=datetime.now())
    dt_atualizacao: datetime = Field(..., example=datetime.now())
    criado_por: int = Field(..., example=1)
    atualizado_por: Union[int, None] = Field(..., example=1)


    class Config:
        orm_mode = True

    
class RoomModelsDTO(BaseModel):
    """
    DTO for Room Model

    Valores retornados ao acessar usuários.
    """

    nome_sala: str = Field(..., example="Sala 1")
    lotacao: int = Field(..., example=10)
    observacao: Union[str, None] = Field(..., example="Sala com ar condicionado")
    agendavel: Union[bool, None] = Field(..., example=True)
    dt_criacao: Union[datetime, None] = Field(None, example="2022-10-30 20:51:50.862505")
    dt_atualizacao: Union[datetime, None] = Field(None, example="2022-10-30 20:51:50.862505")
    criado_por: Union[int, None] = Field(None, example=1)
    

    class Config:
        orm_mode = True
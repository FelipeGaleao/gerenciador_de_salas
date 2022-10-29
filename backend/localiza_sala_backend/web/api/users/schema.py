from pydantic import BaseModel, Field
from datetime import datetime, time, timedelta
from typing import Union

class UsersModelDTO(BaseModel):
    """
    DTO for Users models.

    Valores retornados ao acessar usuários.
    """

    id: int
    nome: str
    sobrenome: str
    email: str
    lotacao: str
    tipo_usuario: int
    dt_criacao: Union[datetime, None]
    dt_atualizacao: Union[datetime, None]
    criado_por: int
    atualizado_por: int


    class Config:
        orm_mode = True


class UsersModelInputDTO(BaseModel):
    """DTO para criar um novo usuário."""

    nome: str = Field(
        default= None,
        title="Nome do usuário",
        description="Nome do usuário",
    )
    sobrenome: str = Field(
        default= None,
        title="Sobrenome do usuário",
        description="Sobrenome do usuário",
    )
    senha: str
    email: str
    lotacao: str
    tipo_usuario: Union[int, None]
    dt_criacao: Union[datetime, None]
    dt_atualizacao: Union[datetime, None]
    criado_por: Union[int, None]
    atualizado_por: Union[int, None]
    token_senha: Union[str, None] 

    class Config:
        schema_extra = {
            "example": {
                "nome": "John",
                "sobrenome": "Doe",
                "senha": "123456",
                "email": "john.doe@gmail.com",
                "lotacao": "FACOM - UFMS",
            }
        }


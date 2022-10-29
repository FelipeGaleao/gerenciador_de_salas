from pydantic import BaseModel
from datetime import datetime, time, timedelta

class UsersModelDTO(BaseModel):
    """
    DTO for Users models.

    Valores retornados ao acessar usuários.
    """

    id: int
    name: str

    class Config:
        orm_mode = True


class UsersModelInputDTO(BaseModel):
    """DTO para criar um novo usuário."""

    nome: str
    sobrenome: str
    senha: str
    email: str
    lotacao: str
    tipo_usuario: int
    dt_criacao: datetime = datetime.now()
    dt_atualizacao: datetime = datetime.now()
    criado_por: int
    atualizado_por: int
    token_senha: str

class UserHasRegistered(BaseModel):
    """DTO para verificar se usuário já está cadastrado."""

    email: str
    detail: dict


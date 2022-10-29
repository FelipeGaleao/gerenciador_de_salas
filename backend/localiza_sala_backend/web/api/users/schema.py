from pydantic import BaseModel


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
    dt_criacao: str
    dt_modificacao: str
    criado_por: int
    atualizado_por: int
    token_senha: str




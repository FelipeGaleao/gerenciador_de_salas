from typing import List

from fastapi import APIRouter
from fastapi.param_functions import Depends

from localiza_sala_backend.db.dao_users_dao import UsersDAO
from localiza_sala_backend.db.models.users_model import UsersModel
from localiza_sala_backend.web.api.users.schema import UsersModelDTO, UsersModelInputDTO

router = APIRouter()


@router.get("/", response_model=List[DummyModelDTO])
async def get_dummy_models(
    limit: int = 10,
    offset: int = 0,
    dummy_dao: DummyDAO = Depends(),
) -> List[DummyModel]:
    """
    Retrieve all dummy objects from the database.

    :param limit: limit of dummy objects, defaults to 10.
    :param offset: offset of dummy objects, defaults to 0.
    :param dummy_dao: DAO for dummy models.
    :return: list of dummy obbjects from database.
    """
    return await dummy_dao.get_all_dummies(limit=limit, offset=offset)


@router.post("/")
async def create_users_model(
    new_user_object: UsersModelInputDTO,
    user_dao: UsersDAO = Depends(),
) -> None:
    """
    Criar o usuário no banco de dados.

    :param new_user_object: model para o usuário.
    :param dummy_dao: DAO para o usuário
    """
    await user_dao.create_dummy_model(**new_user_object.dict())

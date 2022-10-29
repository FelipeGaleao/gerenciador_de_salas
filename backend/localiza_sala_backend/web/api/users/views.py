from typing import List
from datetime import datetime
from fastapi import APIRouter
from fastapi.param_functions import Depends
from fastapi.responses import JSONResponse
from localiza_sala_backend.db.dao.users_dao import UsersDAO
from localiza_sala_backend.db.models.users_model import UsersModel
from localiza_sala_backend.web.api.users.schema import UsersModelDTO, UsersModelInputDTO
from localiza_sala_backend.services import hash as hash_service
router = APIRouter()


# @router.get("/", response_model=List[DummyModelDTO])
# async def get_dummy_models(
#     limit: int = 10,
#     offset: int = 0,
#     dummy_dao: DummyDAO = Depends(),
# ) -> List[DummyModel]:
#     """
#     Retrieve all dummy objects from the database.

#     :param limit: limit of dummy objects, defaults to 10.
#     :param offset: offset of dummy objects, defaults to 0.
#     :param dummy_dao: DAO for dummy models.
#     :return: list of dummy obbjects from database.
#     """
#     return await dummy_dao.get_all_dummies(limit=limit, offset=offset)

@router.get('/', response_model=List[UsersModelDTO])
async def get_users(
    limit: int = 25,
    offset: int = 0,
    users_dao: UsersDAO = Depends()
) -> List[UsersModel]:
    return await users_dao.get_all_users(limit=limit, offset=offset)


@router.post("/", response_model=UsersModelDTO, status_code=200)
async def create_users_model(
    new_user_object: UsersModelInputDTO,
    user_dao: UsersDAO = Depends(),
) -> UsersModel:
    """Método para criar um novo usuário no banco de dados.

    Args: 
        new_user_object (UsersModelInputDTO): Entidade de usuário.
        user_dao (UsersDAO, optional): Método do DAO para criar um novo usuário. 
    """

    new_user_object.senha = hash_service.get_hashed_password(new_user_object.senha)
    new_user_object.dt_criacao = datetime.now()
    new_user_object.dt_atualizacao = datetime.now()
    new_user_object.tipo_usuario = 0
    new_user_object.criado_por = 0
    new_user_object.atualizado_por = 0

    userExist = await user_dao.get_user_by_email(new_user_object.email)
    
    if userExist:
      return JSONResponse(status_code=400, content={"message": "Usuário já cadastrado."})
    
    try:
        await user_dao.create_user(**new_user_object.dict())
    except Exception as e:
        print(e)
        return JSONResponse(status_code=400, content={"message": "Erro ao cadastrar usuário."})
    
    return JSONResponse(status_code=200, content={"message": "Usuário cadastrado com sucesso."})

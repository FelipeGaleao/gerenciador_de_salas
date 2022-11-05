from re import sub
import os
from typing import List, Union, Any
from datetime import datetime
from localiza_sala_backend.web.api.rooms.schema import RoomsModelUpdate
from fastapi import APIRouter, status
from fastapi.param_functions import Depends
from fastapi.responses import JSONResponse
from localiza_sala_backend.db.dao.rooms_dao import RoomsDAO
from localiza_sala_backend.db.dao.users_dao import UsersDAO
from localiza_sala_backend.web.api.rooms.schema import RoomModelsDTO, RoomModelView
from localiza_sala_backend.db.models.users_model import UsersModel
from localiza_sala_backend.web.api.users.schema import UsersModelDTO, UsersModelInputDTO, TokenPayload
from localiza_sala_backend.services import hash as hash_service
from localiza_sala_backend.services.auth import reuseable_oauth
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from pydantic import ValidationError

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



@router.get("/get_room_by_id", status_code=200)
async def get_room_by_id(rooms_dao: RoomsDAO = Depends(), token: str = Depends(reuseable_oauth), room_id: int = 0) -> RoomModelView:
    try:
        payload = jwt.decode(
            token, os.environ['JWT_SECRET_KEY'], algorithms=[os.environ['JWT_ALGORITHM']])
       
        token_data = TokenPayload(**payload)
    
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            return JSONResponse(status_code=401, content={"message": "Token expirado"})
    except (jwt.JWTError, ValidationError):
        print(jwt.JWTError)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Token inválido"})
    try:
        room = await rooms_dao.get_room_by_id(room_id)
        return RoomModelView.from_orm(room)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Sala não encontrada"})

@router.delete("/delete_room_by_id", status_code=200)
async def delete_room_by_id(rooms_dao: RoomsDAO = Depends(), token: str = Depends(reuseable_oauth), room_id: int = 0) -> RoomModelView:
    try:
        payload = jwt.decode(
            token, os.environ['JWT_SECRET_KEY'], algorithms=[os.environ['JWT_ALGORITHM']])
       
        token_data = TokenPayload(**payload)
    
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            return JSONResponse(status_code=401, content={"message": "Token expirado"})
    except (jwt.JWTError, ValidationError):
        print(jwt.JWTError)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Token inválido"})
    try:
        room = await rooms_dao.delete_room_by_id(room_id)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Sala não encontrada"})
    return JSONResponse(status_code=200, content={"message": "Sala deletada com sucesso!"})

@router.put('/', status_code=200)
async def update_room(room_to_edit: RoomsModelUpdate, users_dao: UsersDAO = Depends(), rooms_dao: RoomsDAO = Depends(), token: str = Depends(reuseable_oauth)):
    """
    Update user.

    :param user: user to update.
    :param users_dao: DAO for users.
    :return: updated user.
    """
    try:
        payload = jwt.decode(
            token, os.environ['JWT_SECRET_KEY'], algorithms=[os.environ['JWT_ALGORITHM']])
        token_data = TokenPayload(**payload)
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            return JSONResponse(status_code=401, content={"message": "Token expirado"})
    except (jwt.JWTError, ValidationError):
        print(jwt.JWTError)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Token inválido"})
    try:
        user = await users_dao.get_user_by_email(token_data.sub)
        user_detail = UsersModelDTO.from_orm(user)
    except:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Sala não encontrada"})

    room_to_edit.dt_atualizacao = datetime.now()
    room_to_edit.atualizado_por = user_detail.id
    try:
        await rooms_dao.update_room(room_to_edit)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"message": "Erro ao atualizar sala!", "error_detail": str(e)})
   
    return JSONResponse(status_code=200, content={"message": "Sala atualizada com sucesso!"})

# @router.post('/login', status_code=200)
# async def login_user(form: OAuth2PasswordRequestForm = Depends(), users_dao: UsersDAO = Depends()):
#     """
#     Login user.

#     :param user: dados para login.
#     :param users_dao: DAO for users.
#     :return: logged user.
#     """
#     user = UsersModel()
#     user.email = form.username
#     user.senha = form.password

#     check_user = await users_dao.get_user_by_email(user.email)
    
#     if check_user is None:
#         return JSONResponse(status_code=400, content={"message": "Usuário não encontrado!"})
    
#     if not hash_service.verify_password(user.senha, check_user.senha):
#         return JSONResponse(status_code=400, content={"message": "Senha incorreta!"})
    
#     access_token = hash_service.create_access_token(subject = user.email)
#     refresh_token = hash_service.create_refresh_token(subject = user.email)

#     return JSONResponse(status_code=200, 
#      content={"message": "Usuário logado com sucesso!",
#      "access_token": access_token,
#      "refresh_token": refresh_token,
#      "user_detail": UsersModelDTO.from_orm(check_user).json()})

@router.get('/', response_model=List[RoomModelView])
async def get_rooms(
    limit: int = 25,
    offset: int = 0,
    rooms_dao: RoomsDAO = Depends(),
) -> List[RoomModelView]:
    return await rooms_dao.get_all_rooms(limit=limit, offset=offset)


@router.post("/", status_code=200)
async def create_new_room(
    new_room: RoomModelsDTO,
    users_dao: UsersDAO = Depends(),
    room_dao: RoomsDAO = Depends(),
    token: str = Depends(reuseable_oauth)
) -> None:
    """Método para criar uma nova sala.

    Args: 
        new_room (UsersModelInputDTO): Entidade da sala a ser criada.
        room_dao (RoomsDAO, optional): Método do DAO para criar uma nova sala.
    """

    try:
        payload = jwt.decode(
            token, os.environ['JWT_SECRET_KEY'], algorithms=[os.environ['JWT_ALGORITHM']])
       
        token_data = TokenPayload(**payload)
    
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            return JSONResponse(status_code=401, content={"message": "Token expirado"})
    except (jwt.JWTError, ValidationError):
        print(jwt.JWTError)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Token inválido"})
    try:
        user = await users_dao.get_user_by_email(token_data.sub)
        user_detail = UsersModelDTO.from_orm(user)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Usuário não encontrado"})

    new_room.dt_criacao = datetime.now()
    new_room.dt_atualizacao = datetime.now()
    new_room.criado_por = user_detail.id
    
    try:
        await room_dao.create_room(**new_room.dict())
    except Exception as e:
        print(e)
        return JSONResponse(status_code=400, content={"message": "Erro ao cadastrar sala."})
    
    return JSONResponse(status_code=200, content={"message": "Sala cadastrada com sucesso."})

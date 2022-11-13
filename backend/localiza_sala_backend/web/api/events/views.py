from re import sub
import os
from typing import List, Union, Any
from datetime import datetime
from localiza_sala_backend.web.api.events.schema import EventsModelUpdate
from localiza_sala_backend.web.api.events.schema import EventsModelView
from localiza_sala_backend.db.dao.events_dao import EventsDAO
from localiza_sala_backend.web.api.events.schema import EventsModelInput
from fastapi import APIRouter, status
from fastapi.param_functions import Depends
from fastapi.responses import JSONResponse
from localiza_sala_backend.db.dao.users_dao import UsersDAO
from localiza_sala_backend.web.api.users.schema import UsersModelDTO, UsersModelInputDTO, TokenPayload
from localiza_sala_backend.services import hash as hash_service
from localiza_sala_backend.services.auth import reuseable_oauth
from jose import jwt
from pydantic import ValidationError

router = APIRouter()



# @router.get("/get_course_by_id", status_code=200)
# async def get_course_by_id(courses_dao: CoursesDAO = Depends(), token: str = Depends(reuseable_oauth), course_id: int = 0) -> CoursesModelView:
#     try:
#         payload = jwt.decode(
#             token, os.environ['JWT_SECRET_KEY'], algorithms=[os.environ['JWT_ALGORITHM']])
       
#         token_data = TokenPayload(**payload)
    
#         if datetime.fromtimestamp(token_data.exp) < datetime.now():
#             return JSONResponse(status_code=401, content={"message": "Token expirado"})
#     except (jwt.JWTError, ValidationError):
#         print(jwt.JWTError)
#         return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Token inválido"})
#     try:
#         room = await courses_dao.get_course_by_id(course_id)
#         return CoursesModelView.from_orm(room)
#     except Exception as e:
#         print(e)
#         return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Disciplina não encontrada"})

# @router.delete("/delete_course_by_id", status_code=200)
# async def delete_course_by_id(courses_dao: CoursesDAO = Depends(), token: str = Depends(reuseable_oauth), course_id: int = 0) -> CoursesModelView:
#     try:
#         payload = jwt.decode(
#             token, os.environ['JWT_SECRET_KEY'], algorithms=[os.environ['JWT_ALGORITHM']])
       
#         token_data = TokenPayload(**payload)
    
#         if datetime.fromtimestamp(token_data.exp) < datetime.now():
#             return JSONResponse(status_code=401, content={"message": "Token expirado"})
#     except (jwt.JWTError, ValidationError):
#         print(jwt.JWTError)
#         return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Token inválido"})
#     try:
#         await courses_dao.delete_course_by_id(course_id)
#     except Exception as e:
#         print(e)
#         return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Sala não encontrada"})
#     return JSONResponse(status_code=200, content={"message": "Disciplina deletada com sucesso!"})

@router.put('/', status_code=200)
async def update_event(event_to_edit: EventsModelUpdate, users_dao: UsersDAO = Depends(), events_dao: EventsDAO = Depends(), token: str = Depends(reuseable_oauth)):
    """Método para atualizar disciplinas cadastradas no banco de dados.

    Args:
        event_to_edit (CoursesModelUpdate): Objeto com os dados da disciplina a ser atualizada.
        users_dao (CoursesDAO, optional): DAO para salas. Defaults to Depends().
        token (str, optional): Token de autenticação. Defaults to Depends(reuseable_oauth).

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
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Evento não encontrado"})

    event_to_edit.dt_modificacao = datetime.now()
    event_to_edit.atualizado_por = user_detail.id
    try:
        await events_dao.update_event(event_to_edit)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"message": "Erro ao atualizar evento!", "error_detail": str(e)})
   
    return JSONResponse(status_code=200, content={"message": "Evento atualizada com sucesso!"})

@router.get('/', response_model=List[EventsModelView], status_code=200)
async def get_all_events(
    limit: int = 25,
    offset: int = 0,
    events_dao: EventsDAO = Depends(),
) -> List[EventsModelView]:
    """Método para retornar todos os eventos cadastrados no banco de dados.

    Args: \n
        limit (int, optional): Limite de eventos a serem retornados. Defaults to 25. \n
        offset (int, optional): Deslocamento de eventos a serem retornados. Defaults to 0. \n
        courses_dao (CoursesDAO, optional): Camada de acesso a dados de eventos. \n

    """
    return await events_dao.get_all_events(limit=limit, offset=offset)


@router.post("/", status_code=200)
async def create_new_event(
    new_event: EventsModelInput,
    users_dao: UsersDAO = Depends(),
    events_dao: EventsDAO = Depends(),
    token: str = Depends(reuseable_oauth)
) -> None:
    """Método para criar um novo evento.

    Args:  \n
        new_event (EventsModelInput): Objeto com os dados da disciplina. \n
        events_dao (EventsDAO): DAO para eventos. \n
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

    new_event.dt_criacao = datetime.now()
    new_event.dt_modificacao = datetime.now()
    new_event.criado_por = user_detail.id
    
    try:
        await events_dao.create_event(**new_event.dict())
    except Exception as e:
        print(e)
        return JSONResponse(status_code=400, content={"message": "Erro ao cadastrar um evento."})
    
    return JSONResponse(status_code=200, content={"message": "Evento cadastrado com sucesso."})

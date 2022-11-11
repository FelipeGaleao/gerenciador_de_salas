from re import sub
import os
from typing import List, Union, Any
from datetime import datetime
from localiza_sala_backend.web.api.courses.schema import CoursesModelUpdate
from localiza_sala_backend.web.api.courses.schema import CoursesModelView
from localiza_sala_backend.web.api.rooms.schema import RoomsModelUpdate
from fastapi import APIRouter, status
from fastapi.param_functions import Depends
from fastapi.responses import JSONResponse
from localiza_sala_backend.db.dao.users_dao import UsersDAO
from localiza_sala_backend.db.dao.courses_dao import CoursesDAO
from localiza_sala_backend.web.api.courses.schema import CoursesModelsDTO
from localiza_sala_backend.web.api.users.schema import UsersModelDTO, UsersModelInputDTO, TokenPayload
from localiza_sala_backend.services import hash as hash_service
from localiza_sala_backend.services.auth import reuseable_oauth
from jose import jwt
from pydantic import ValidationError

router = APIRouter()



@router.get("/get_course_by_id", status_code=200)
async def get_course_by_id(courses_dao: CoursesDAO = Depends(), token: str = Depends(reuseable_oauth), course_id: int = 0) -> CoursesModelView:
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
        room = await courses_dao.get_course_by_id(course_id)
        return CoursesModelView.from_orm(room)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Disciplina não encontrada"})

@router.delete("/delete_course_by_id", status_code=200)
async def delete_course_by_id(courses_dao: CoursesDAO = Depends(), token: str = Depends(reuseable_oauth), room_id: int = 0) -> CoursesModelView:
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
        await courses_dao.delete_course_by_id(room_id)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Sala não encontrada"})
    return JSONResponse(status_code=200, content={"message": "Disciplina deletada com sucesso!"})

@router.put('/', status_code=200)
async def update_room(course_to_edit: CoursesModelUpdate, users_dao: UsersDAO = Depends(), courses_dao: CoursesDAO = Depends(), token: str = Depends(reuseable_oauth)):
    """Método para atualizar disciplinas cadastradas no banco de dados.

    Args:
        course_to_edit (CoursesModelUpdate): Objeto com os dados da disciplina a ser atualizada.
        courses_dao (UsersDAO, optional): DAO para disciplinas. Defaults to Depends().
        rooms_dao (CoursesDAO, optional): DAO para salas. Defaults to Depends().
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
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Sala não encontrada"})

    course_to_edit.dt_atualizacao = datetime.now()
    course_to_edit.atualizado_por = user_detail.id
    try:
        await courses_dao.update_course(course_to_edit)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"message": "Erro ao atualizar disciplina!", "error_detail": str(e)})
   
    return JSONResponse(status_code=200, content={"message": "Disciplina atualizada com sucesso!"})

@router.get('/', response_model=List[CoursesModelView])

async def get_all_courses(
    limit: int = 25,
    offset: int = 0,
    courses_dao: CoursesDAO = Depends(),
) -> List[CoursesModelView]:
    """Método para retornar todos os disciplinas cadastrados no banco de dados.

    Args: \n
        limit (int, optional): Limite de disciplinas a serem retornados. Defaults to 25. \n
        offset (int, optional): Deslocamento de disciplinas a serem retornados. Defaults to 0. \n
        courses_dao (CoursesDAO, optional): Camada de acesso a dados de disciplinas. \n

    Returns: \n
        List[CoursesModelView]: _description_ \n
    """
    return await courses_dao.get_all_courses(limit=limit, offset=offset)


@router.post("/", status_code=200)
async def create_new_course(
    new_course: CoursesModelsDTO,
    users_dao: UsersDAO = Depends(),
    courses_dao: CoursesDAO = Depends(),
    token: str = Depends(reuseable_oauth)
) -> None:
    """Método para criar uma nova disciplina.

    Args:  \n
        new_course (CoursesModelsDTO): Objeto com os dados da disciplina. \n
        courses_dao (CoursesDAO): DAO para disciplinas. \n
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

    new_course.dt_criacao = datetime.now()
    new_course.dt_atualizacao = datetime.now()
    new_course.criado_por = user_detail.id
    
    try:
        await courses_dao.create_course(**new_course.dict())
    except Exception as e:
        print(e)
        return JSONResponse(status_code=400, content={"message": "Erro ao cadastrar uma disciplina."})
    
    return JSONResponse(status_code=200, content={"message": "Disciplina cadastrada com sucesso."})

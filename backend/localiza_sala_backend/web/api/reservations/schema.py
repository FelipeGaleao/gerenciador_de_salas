from localiza_sala_backend.web.api.courses.schema import CoursesModelView
from localiza_sala_backend.web.api.teachers.schema import TeacherModelView
from localiza_sala_backend.web.api.events.schema import EventsModelView
from localiza_sala_backend.web.api.users.schema import UsersModelDTO
from localiza_sala_backend.web.api.rooms.schema import RoomModelView

from pydantic import BaseModel, Field
from datetime import datetime, time, timedelta
from typing import Union, List


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

class ReservationModelView(BaseModel):
    id: Union[int, None] = Field(None, example=1)
    dt_inicio: Union[datetime, None] = Field(None, example="2021-01-01 00:00:00")
    dt_fim: Union[datetime, None] = Field(None, example="2021-01-01 00:00:00")
    dt_criacao: Union[datetime, None] = Field(None, example="2021-01-01 00:00:00")
    hr_inicio_evento: Union[time, None] = Field(None, example="00:00:00")
    hr_fim_evento: Union[time, None] = Field(None, example="00:00:00")
    dt_modificacao: Union[datetime, None] = Field(None, example="2021-01-01 00:00:00")
    criado_por: Union[int, None] = Field(None, example=1)
    atualizado_por: Union[int, None] = Field(None, example=1)
    teacher_id: Union[int, None] = Field(None, example=1)
    room_id: Union[int, List, None] = Field(None, example=1)
    event_id: Union[int, None] = Field(None, example=1)
    course_id: Union[int, None] = Field(None, example=1)
    user_id: Union[int, None] = Field(None, example=1)
    event: Union[EventsModelView, None] = Field(None, example= None)
    course: Union[CoursesModelView, None] = Field(None, example= None)
    teacher: Union[TeacherModelView, None] = Field(None, example= None)
    room: Union[RoomModelView, None] = Field(None, example= None)
    user: Union[UsersModelDTO, None] = Field(None, example= None)

    class Config:
        orm_mode = True
    
 
class ReservationModelInput(BaseModel):
    dt_inicio: datetime = Field(..., example="2021-01-01 00:00:00")
    dt_fim: datetime = Field(..., example="2021-01-01 00:00:00")
    dt_criacao: datetime = Field(..., example="2021-01-01 00:00:00")
    hr_inicio_evento: time = Field(..., example="00:00:00")
    hr_fim_evento: time = Field(..., example="00:00:00")
    dt_modificacao: datetime = Field(..., example="2021-01-01 00:00:00")
    criado_por: int = Field(..., example=1)
    atualizado_por: int = Field(..., example=1)
    teacher_id: Union[int, None] = Field(None, example=1)
    event_id: Union[int, None] = Field(None, example=1)
    room_id: Union[int, None] = Field(None, example=1)
    event_id: Union[int, None] = Field(None, example=1)
    course_id: Union[int, None] = Field(None, example=1)
    user_id: Union[int, None] = Field(None, example=1)

    class Config:
        orm_mode = True

class ReservationModelUpdate(BaseModel):
    reservation_id: int = Field(..., example=1)
    dt_inicio: datetime = Field(..., example="2021-01-01 00:00:00")
    dt_fim: datetime = Field(..., example="2021-01-01 00:00:00")
    dt_criacao: datetime = Field(..., example="2021-01-01 00:00:00")
    hr_inicio_evento: time = Field(..., example="00:00:00")
    hr_fim_evento: time = Field(..., example="00:00:00")
    dt_modificacao: datetime = Field(..., example="2021-01-01 00:00:00")
    criado_por: int = Field(..., example=1)
    atualizado_por: int = Field(..., example=1)
    teacher_id: Union[int, None] = Field(None, example=1)
    room_id: Union[int, None] = Field(None, example=1)
    event_id: Union[int, None] = Field(None, example=1)
    course_id: Union[int, None] = Field(None, example=1)
    user_id: Union[int, None] = Field(None, example=1)

    class Config:
        orm_mode = True
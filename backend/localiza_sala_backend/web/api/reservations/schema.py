from pydantic import BaseModel, Field
from datetime import datetime, time, timedelta
from typing import Union


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
    room_id: Union[int, None] = Field(None, example=1)
    event_id: Union[int, None] = Field(None, example=1)
    course_id: Union[int, None] = Field(None, example=1)
    user_id: Union[int, None] = Field(None, example=1)

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
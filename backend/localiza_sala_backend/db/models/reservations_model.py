from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import DateTime, Integer, String, Boolean, Time
from sqlalchemy.orm import relationship
from localiza_sala_backend.db.base import Base
from sqlalchemy import ForeignKey


class ReservationsModel(Base):
    """Model para Reservas"""

    __tablename__ = "reservations"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    dt_inicio = Column(DateTime())
    dt_fim = Column(DateTime())
    dt_criacao = Column(DateTime())
    hr_inicio_evento = Column(Time(timezone=False))
    hr_fim_evento =  Column(Time(timezone=False))
    dt_modificacao = Column(DateTime())
    criado_por = Column(Integer(), ForeignKey("users.id"))
    atualizado_por = Column(Integer(), ForeignKey("users.id"))
    teacher_id = Column(Integer(), ForeignKey("teachers.id"))
    room_id = Column(Integer(), ForeignKey("rooms.id"))
    event_id = Column(Integer(), ForeignKey("events.id"))
    course_id = Column(Integer(), ForeignKey("courses.id"))
    user_id = Column(Integer(), ForeignKey("users.id"))

    relationship("UsersModel", back_populates="reservations")
    relationship("EventsModel", back_populates="reservations")
    relationship("CoursesModel", back_populates="reservations")
    relationship("RoomsModel", back_populates="reservations")
    relationship("TeachersModel", back_populates="reservations")
    
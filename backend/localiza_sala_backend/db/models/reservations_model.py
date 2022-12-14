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

    # Relationships
    user = relationship("UsersModel", foreign_keys=[user_id], lazy="joined")
    teacher = relationship("TeachersModel", foreign_keys=[teacher_id], lazy="joined")
    room = relationship("RoomsModel", foreign_keys=[room_id], lazy="joined")
    event = relationship("EventsModel", foreign_keys=[event_id], lazy="joined")
    course = relationship("CoursesModel", foreign_keys=[course_id], lazy="joined")

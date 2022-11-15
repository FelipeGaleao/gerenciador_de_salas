from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import DateTime, Integer, String, Time
from localiza_sala_backend.db.base import Base
from sqlalchemy import ForeignKey

class CoursesModel(Base):
    """Model para Disciplinas (courses)."""

    __tablename__ = "courses"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    nome = Column(String(length=200))  # noqa: WPS432
    teacher_id = Column(Integer(), ForeignKey("teachers.id"))
    lotacao_faculdade = Column(String(length=200))  # noqa: WPS432
    curso = Column(String(length=200))  # noqa: WPS432
    periodo = Column(String(length=200))  # noqa: WPS432
    qtde_alunos_matriculados = Column(Integer())
    dt_inicio_disciplina = Column(DateTime())  # noqa: WPS432
    dt_fim_disciplina = Column(DateTime())  # noqa: WPS432
    hr_inicio_disciplina = Column(Time())  # noqa: WPS432
    hr_fim_disciplina = Column(Time())  # noqa: WPS432
    dt_criacao = Column(DateTime())  # noqa: WPS432
    dt_atualizacao = Column(DateTime())  # noqa: WPS432
    criado_por = Column(Integer(), ForeignKey("users.id"))
    atualizado_por = Column(Integer(), ForeignKey("users.id"))

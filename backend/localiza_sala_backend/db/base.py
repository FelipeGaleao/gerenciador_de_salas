from typing import Any, Tuple

from sqlalchemy import Table
from sqlalchemy.orm import as_declarative

from localiza_sala_backend.db.meta import meta


@as_declarative(metadata=meta)
class Base:
    """
    Base for all models.

    It has some type definitions to
    enhance autocompletion.
    """

    __tablename__: str
    __table__: Table
    __table_args__: Tuple[Any, ...]

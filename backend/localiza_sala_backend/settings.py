import enum
from pathlib import Path
from tempfile import gettempdir

from pydantic import BaseSettings
from yarl import URL
import os

TEMP_DIR = Path(gettempdir())


class LogLevel(str, enum.Enum):  # noqa: WPS600
    """Possible log levels."""

    NOTSET = "NOTSET"
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    FATAL = "FATAL"


class Settings(BaseSettings):
    """
    Application settings.

    These parameters can be configured
    with environment variables.
    """

    host: str = "127.0.0.1"
    port: int = os.getenv("LOCALIZA_SALA_BACKEND_PORT", 8000)
    # quantity of workers for uvicorn
    workers_count: int = 3
    # Enable uvicorn reloading
    reload: bool = True

    # Current environment
    environment: str = "dev"

    log_level: LogLevel = LogLevel.INFO

    # Variables for the database
    db_host: str = os.getenv("LOCALIZA_SALA_BACKEND_DB_HOST", "localhost")
    db_port: int = os.getenv("LOCALIZA_SALA_BACKEND_DB_PORT", "3306")
    db_user: str = os.getenv("LOCALIZA_SALA_BACKEND_DB_USER", "localiza_sala_backend")
    db_pass: str = os.getenv("LOCALIZA_SALA_BACKEND_DB_PASS", "localiza_sala_backend")
    db_base: str = os.getenv("LOCALIZA_SALA_BACKEND_DB_BASE", "localiza_sala")
    db_echo: bool = False

    @property
    def db_url(self) -> URL:
        """
        Assemble database URL from settings.

        :return: database URL.
        """
        return URL.build(
            scheme="mysql+aiomysql",
            host=self.db_host,
            port=self.db_port,
            user=self.db_user,
            password=self.db_pass,
            path=f"/{self.db_base}",
        )

    class Config:
        env_file = ".env"
        env_prefix = "LOCALIZA_SALA_BACKEND_"
        env_file_encoding = "utf-8"


settings = Settings()

import uvicorn

from localiza_sala_backend.settings import settings


def main() -> None:
    """Entrypoint of the application."""
    uvicorn.run(
        "localiza_sala_backend.web.application:get_app",
        workers=settings.workers_count,
        host=settings.host,
        port=settings.port,
        reload=True,
        log_level=settings.log_level.value.lower(),
        factory=True,
    )


if __name__ == "__main__":
    main()

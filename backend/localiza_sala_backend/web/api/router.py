from fastapi.routing import APIRouter

from localiza_sala_backend.web.api import docs, dummy, echo, monitoring, users, rooms, teachers, courses, events, reservations

api_router = APIRouter()
api_router.include_router(monitoring.router)
api_router.include_router(docs.router)
# api_router.include_router(echo.router, prefix="/echo", tags=["echo"])
# api_router.include_router(dummy.router, prefix="/dummy", tags=["dummy"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(rooms.router, prefix="/rooms", tags=["rooms"])
api_router.include_router(teachers.router, prefix="/teachers", tags=["teachers"])
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(reservations.router, prefix="/reservation", tags=["reservations"])
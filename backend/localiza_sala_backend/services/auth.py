import os 
from typing import Union, Any
from datetime import datetime
from localiza_sala_backend.db.models.users_model import UsersModel
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError



ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']     # should be kept secret
JWT_REFRESH_SECRET_KEY = os.environ['JWT_REFRESH_SECRET_KEY']      # should be kept secret


reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/api/users/login",
)


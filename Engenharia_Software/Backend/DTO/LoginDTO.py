from datetime import date, time
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class LoginDTO(BaseModel):
    Email:str
    Senha:str
    class Config:
        orm_mode = True

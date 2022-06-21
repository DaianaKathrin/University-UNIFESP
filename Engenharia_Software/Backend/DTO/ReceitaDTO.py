from datetime import date, time
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from Entities.Consulta import Consulta


class ReceitaDTO(BaseModel):
    Receita_ID:Optional[str]
    Data:datetime
    Nome_Arquivo:str
    Consulta_ID:Optional[str]
    class Config:
        orm_mode = True

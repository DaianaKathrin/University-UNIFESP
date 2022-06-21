from datetime import date, time
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ExameDTO(BaseModel):
    Exame_ID:Optional[str]
    Data:datetime
    Nome_Arquivo:str
    Descricao:str
    Paciente_ID:str
    class Config:
        orm_mode = True

from datetime import date, time
from typing import Optional
from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import Time

class HorarioDTO(BaseModel):
    Horario_ID : Optional[str]
    Data : date
    Horario_Inicio : time
    Horario_Fim : time
    Medico_ID : str
    class Config:
        orm_mode = True

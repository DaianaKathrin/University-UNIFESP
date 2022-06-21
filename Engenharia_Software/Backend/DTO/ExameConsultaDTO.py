from typing import Optional
from pydantic import BaseModel

class ExameConsultaDTO(BaseModel):
    ExameConsulta_ID: Optional[str]
    Consulta_ID:str
    Exame_ID:str
    class Config:
        orm_mode = True


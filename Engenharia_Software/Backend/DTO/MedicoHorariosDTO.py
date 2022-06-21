from datetime import date
from typing import List, Optional
from pydantic import BaseModel
from DTO.HorarioDTO import HorarioDTO
class MedicoHorariosDTO(BaseModel):
    Medico_ID:str
    Nome:str
    CRM:str
    Descricao:Optional[str]
    Horarios: List[HorarioDTO]
    class Config:
        orm_mode = True

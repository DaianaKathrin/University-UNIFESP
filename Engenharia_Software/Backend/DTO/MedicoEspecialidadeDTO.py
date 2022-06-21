from typing import Optional
from pydantic import BaseModel

from DTO.EspecialidadeDTO import EspecialidadeDTO

class MedicoEspecialidadeDTO(BaseModel):
    MedicoEspecialidade_ID: Optional[str]
    Medico_ID:str
    Especialidade_ID:str
    especialidades:Optional[EspecialidadeDTO]
    ModeloAnamnese:str
    class Config:
        orm_mode = True


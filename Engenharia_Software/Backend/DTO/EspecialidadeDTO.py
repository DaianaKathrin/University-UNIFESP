from typing import Optional
from pydantic import BaseModel

class EspecialidadeDTO(BaseModel):
    Especialidade_ID: Optional[str]
    Nome:str
    class Config:
        orm_mode = True


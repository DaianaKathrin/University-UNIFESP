from typing import Optional
from pydantic import BaseModel

class CategoriaExameDTO(BaseModel):
    CategoriaExame_ID:Optional[str]
    Nome:str
    class Config:
        orm_mode = True

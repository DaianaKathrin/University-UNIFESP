from typing import Optional
from pydantic import BaseModel

class ConsultaStatusDTO(BaseModel):
    Consulta_ID : Optional[str]
    Status : int
    class Config:
        orm_mode = True

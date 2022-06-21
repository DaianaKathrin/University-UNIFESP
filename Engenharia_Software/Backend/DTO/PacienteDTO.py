from datetime import date
from typing import List
from typing import Optional
from pydantic import BaseModel
class PacienteDTO(BaseModel):
    Paciente_ID:Optional[str]
    Nome :str
    Data_Nascimento:date
    CPF:str
    Cidade :str
    Estado :str
    Logradouro :str
    Logradouro_Numero:int
    CEP:str
    Telefone:Optional[str]
    Celular:Optional[str]
    Email:str
    Senha:Optional[str]
    class Config:
        orm_mode = True

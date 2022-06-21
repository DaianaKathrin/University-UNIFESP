from datetime import date
from typing import Optional
from pydantic import BaseModel
class MedicoDTO(BaseModel):
    Medico_ID:Optional[str]
    Nome:str
    CPF:str
    CRM:Optional[str]
    Cidade:str
    Estado:str
    Logradouro:str
    Logradouro_Numero:str
    CEP:str
    Telefone:Optional[str]
    Celular:Optional[str]
    Email:str
    Descricao:Optional[str]
    Sexo:Optional[str]
    Data_Nascimento: date
    Senha: Optional[str]
    class Config:
        orm_mode = True

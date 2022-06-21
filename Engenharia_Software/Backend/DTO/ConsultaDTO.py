from typing import Optional
from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import Date, Time
from DTO.EspecialidadeDTO import EspecialidadeDTO
from DTO.HorarioDTO import HorarioDTO
from DTO.MedicoDTO import MedicoDTO
from DTO.PacienteDTO import PacienteDTO

class ConsultaDTO(BaseModel):
    Consulta_ID : Optional[str]
    Status : int
    Paciente_ID :str
    pacientes:Optional[PacienteDTO]
    Medico_ID:str
    medicos:Optional[MedicoDTO]
    Horario_ID:str
    horarios:Optional[HorarioDTO]
    Especialidade_ID:str
    especialidades:Optional[EspecialidadeDTO]
    LinkMeet:Optional[str]
    class Config:
        orm_mode = True

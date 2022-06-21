from typing import List
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import session
from fastapi import APIRouter
from sqlalchemy.sql.sqltypes import Date
from datetime import date
from DTO.ConsultaDTO import ConsultaDTO
from DTO.HorarioDTO import HorarioDTO
from DTO.LoginDTO import LoginDTO
from DTO.MedicoDTO import MedicoDTO
from DTO.MedicoEspecialidadeDTO import MedicoEspecialidadeDTO
from DTO.MedicoHorariosDTO import MedicoHorariosDTO
from UseCases import MedicoUseCases


medicoRouter = APIRouter()

@medicoRouter.post("/Medico", response_model=MedicoDTO)
async def create(medico: MedicoDTO):    
    done, result = MedicoUseCases.CreateMedico(medico)
    if done:
        return result
    else:
        raise result

@medicoRouter.post("/Medico/Especialidade",response_model=MedicoEspecialidadeDTO)
async def addEspecialidade(medicoEspecialidade:MedicoEspecialidadeDTO):
    done, result = MedicoUseCases.AddEspecialidade(medicoEspecialidade)
    if done:
        return result
    else:
        raise result

@medicoRouter.delete("/Medico/Especialidade/{MedicoEspecialidade_ID}")
async def removeEspecialidade(MedicoEspecialidade_ID:str):
    done, result = MedicoUseCases.RemoveEspecialidade(MedicoEspecialidade_ID)
    if done:
        return result
    else:
        raise result

@medicoRouter.get("/Medico",response_model=List[MedicoDTO])
async def getMedicos():
    return MedicoUseCases.GetMedicos()

@medicoRouter.get("/Medico/{Medico_ID}",response_model=MedicoDTO)
async def getMedicos(Medico_ID:str):
    return MedicoUseCases.GetMedicoById(Medico_ID)

@medicoRouter.get("/Medico/{Medico_ID}/Especialidades",response_model=List[MedicoEspecialidadeDTO])
async def getMedicoEspecialidades(Medico_ID:str):
    return MedicoUseCases.GetMedicoEspecialidades(Medico_ID)

@medicoRouter.get("/Medico/Especialidade/{Especialidade_ID}", response_model=List[MedicoHorariosDTO])
async def getMedicoHorariosEspecialidade(Especialidade_ID:str,data:date):
    return MedicoUseCases.GetHorariosEspecialidade(Especialidade_ID,data)

@medicoRouter.get("/Medico/{Medico_ID}/Especialidade/{Especialidade_ID}", response_model=MedicoEspecialidadeDTO)
async def getMedicoEspecialidade(Especialidade_ID:str,Medico_ID:str):
    return MedicoUseCases.GetMedicoEspecialiade(Medico_ID,Especialidade_ID)

@medicoRouter.get("/Medico/{Medico_ID}/Consultas", response_model=List[ConsultaDTO])
async def getConsultas(Medico_ID:str):
    return MedicoUseCases.GetConsultas(Medico_ID)

@medicoRouter.get("/Medico/{Medico_ID}/Horarios", response_model=List[HorarioDTO])
async def getConsultas(Medico_ID:str):
    return MedicoUseCases.GetHorarios(Medico_ID)

@medicoRouter.put("/Medico/{Medico_ID}")
async def updateMedico(Medico_ID:str,medico:MedicoDTO):
    done, result = MedicoUseCases.UpdateMedico(medico,Medico_ID)
    if done:
        return result
    else:
        raise result

@medicoRouter.post("/Medico/Login",response_model=MedicoDTO)
async def Login(login:LoginDTO):
    done, result = MedicoUseCases.Login(login)
    if done:
        return result
    else:
        raise result
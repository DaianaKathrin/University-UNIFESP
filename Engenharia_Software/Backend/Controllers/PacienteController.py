from typing import List
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import session
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from starlette.status import HTTP_201_CREATED
from DTO.ExameDTO import ExameDTO
from DTO.LoginDTO import LoginDTO
from DTO.PacienteDTO import PacienteDTO
from DTO.ConsultaDTO import ConsultaDTO
from DTO.ReceitaDTO import ReceitaDTO
from Entities.Consulta import Consulta
from UseCases import PacienteUseCases

pacienteRouter = APIRouter()

@pacienteRouter.post("/Paciente")
async def create(paciente: PacienteDTO):    
    done, result = PacienteUseCases.CreatePaciente(paciente)
    if done:
        return result
    else:
        raise result
    
@pacienteRouter.get("/Paciente", response_model=List[PacienteDTO])
async def getPacientes():   
    return PacienteUseCases.GetPacientes()

@pacienteRouter.get("/Paciente/{Paciente_ID}", response_model=PacienteDTO)
async def getPaciente(Paciente_ID:str):   
    return PacienteUseCases.GetPacientesById(Paciente_ID)

@pacienteRouter.put("/Paciente/{Paciente_ID}")
async def updatePaciente(Paciente_ID:str,paciente:PacienteDTO):
    done, result = PacienteUseCases.UpdatePaciente(paciente,Paciente_ID)
    if done:
        return result
    else:
        raise result

@pacienteRouter.get("/Paciente/{Paciente_ID}/Consultas", response_model=List[ConsultaDTO])
async def getConsultas(Paciente_ID:str):
    return PacienteUseCases.GetConsultas(Paciente_ID)

@pacienteRouter.get("/Paciente/{Paciente_ID}/Exames", response_model=List[ExameDTO])
async def getExames(Paciente_ID:str):
    return PacienteUseCases.GetExames(Paciente_ID)

@pacienteRouter.get("/Paciente/{Paciente_ID}/Receitas", response_model=List[ReceitaDTO])
async def getExames(Paciente_ID:str):
    return PacienteUseCases.GetReceitas(Paciente_ID)

@pacienteRouter.post("/Paciente/Login",response_model=PacienteDTO)
async def Login(login:LoginDTO):
    done, result = PacienteUseCases.Login(login)
    if done:
        return result
    else:
        raise result

from typing import List
from unittest import result
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import session
from fastapi import APIRouter
from DTO.ConsultaDTO import ConsultaDTO
from DTO.ConsultaStatusDTO import ConsultaStatusDTO
from DTO.ExameDTO import ExameDTO
from DTO.ExameConsultaDTO import ExameConsultaDTO
from DTO.ReceitaDTO import ReceitaDTO
from UseCases import ConsultaUseCases


consultaRouter = APIRouter()

@consultaRouter.post("/Consulta", response_model=ConsultaDTO)
async def create(consulta: ConsultaDTO):    
    done, result = ConsultaUseCases.CreateConsulta(consulta)
    if done:
        return result
    else:
        raise result

@consultaRouter.get("/Consulta",response_model=List[ConsultaDTO])
async def getConsultas():
    return ConsultaUseCases.GetConsultas()

@consultaRouter.get("/Consulta/{Consulta_ID}",response_model=ConsultaDTO)
async def getConsultas(Consulta_ID:str):
    return ConsultaUseCases.GetConsultaById(Consulta_ID)

@consultaRouter.put("/Consulta/{Consulta_ID}")
async def updateConsulta(Consulta_ID:str,consulta:ConsultaDTO):
    done, result = ConsultaUseCases.UpdateConsulta(consulta,Consulta_ID)
    if done:
        return result
    else:
        raise result

@consultaRouter.post("/Consulta/Exame")
async def AddExameConsulta(model:ExameConsultaDTO):
    done,result = ConsultaUseCases.AddExameConsulta(model)
    if done:
        return result
    else:
        raise result

@consultaRouter.get("/Consulta/{Consulta_ID}/Exame", response_model=List[ExameDTO])
async def GetExamesConsulta(Consulta_ID:str):
    return ConsultaUseCases.GetExamesConsulta(Consulta_ID)

@consultaRouter.get("/Consulta/{Consulta_ID}/Receita", response_model=List[ReceitaDTO])
async def GetReceitasByConsulta(Consulta_ID:str):
    return ConsultaUseCases.GetConsultaReceitas(Consulta_ID)

@consultaRouter.post("/Consulta/{Consulta_ID}/LinkMeet/", response_model=ConsultaDTO)
async def AddLinkMeet(Consulta_ID:str,linkMeet:str):
    done, result=  ConsultaUseCases.AddLinkMeet(Consulta_ID,linkMeet)
    if done:
        return result
    else:
        raise result


@consultaRouter.post("/Consulta/{Consulta_ID}/Status/", response_model=ConsultaDTO)
async def AtualizaStatus(Consulta_ID:str,consulta:ConsultaStatusDTO):
    done, result=  ConsultaUseCases.UpdateStatusConsulta(Consulta_ID,consulta)
    if done:
        return result
    else:
        raise result


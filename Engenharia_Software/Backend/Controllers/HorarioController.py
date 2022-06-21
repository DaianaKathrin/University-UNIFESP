from typing import List
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import session
from fastapi import APIRouter
from DTO.HorarioDTO import HorarioDTO
from UseCases import HorarioUseCases


horarioRouter = APIRouter()
@horarioRouter.post("/Horario", response_model=HorarioDTO)
async def create(horario: HorarioDTO):    
    done, result = HorarioUseCases.CreateHorario(horario)
    if done:
        return result
    else:
        raise result

@horarioRouter.get("/Horario",response_model=List[HorarioDTO])
async def getHorarios():
    return HorarioUseCases.GetHorarios()

@horarioRouter.get("/Horario/{Horario_ID}",response_model=HorarioDTO)
async def getHorarios(Horario_ID:str):
    return HorarioUseCases.GetHorarioById(Horario_ID)

@horarioRouter.delete("/Horario/{Horario_ID}")
async def removeHorario(Horario_ID:str):
    done, result = HorarioUseCases.RemoveHorarioById(Horario_ID)
    if done:
        return result
    else:
        raise result
@horarioRouter.put("/Horario/{Horario_ID}")
async def updateHorario(Horario_ID:str,horario:HorarioDTO):
    done, result = HorarioUseCases.UpdateHorario(horario,Horario_ID)
    if done:
        return result
    else:
        raise result

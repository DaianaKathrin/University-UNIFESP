from typing import List
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import session
from fastapi import APIRouter
from DTO.EspecialidadeDTO import EspecialidadeDTO
from UseCases import EspecialidadeUseCases


especialidadeRouter = APIRouter()

@especialidadeRouter.post("/Especialidade", response_model=EspecialidadeDTO)
async def create(especialidade: EspecialidadeDTO):    
    done, result = EspecialidadeUseCases.CreateEspecialidade(especialidade)
    if done:
        return result
    else:
        raise result

@especialidadeRouter.get("/Especialidade",response_model=List[EspecialidadeDTO])
async def getEspecialidades():
    return EspecialidadeUseCases.GetEspecialidade()

@especialidadeRouter.get("/Especialidade/{Especialidade_ID}",response_model=EspecialidadeDTO)
async def getEspecialidades(Especialidade_ID:str):
    return EspecialidadeUseCases.GetEspecialidadeById(Especialidade_ID)

@especialidadeRouter.put("/Especialidade/{Especialidade_ID}")
async def updateEspecialidade(Especialidade_ID:str,especialidade:EspecialidadeDTO):
    done, result = EspecialidadeUseCases.UpdateEspecialidade(especialidade,Especialidade_ID)
    if done:
        return result
    else:
        raise result

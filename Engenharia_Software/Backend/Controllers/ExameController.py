from typing import List
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import session
from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile
from DTO.CategoriaExameDTO import CategoriaExameDTO
from UseCases import ExameUseCases
from fastapi.responses import FileResponse

from DTO.ExameDTO import ExameDTO
exameRouter = APIRouter()

@exameRouter.post("/Exame/")
async def CreateExame(Descricao:str,CategoriaExame_ID:str,Paciente_ID:str,file: UploadFile = File(...)):
    ExameUseCases.CreateExame(CategoriaExame_ID,Descricao,Paciente_ID,file )
    return {"filename": file.filename}

@exameRouter.post("/Exame/Categoria", response_model=CategoriaExameDTO)
async def AddCategoria(categoria: CategoriaExameDTO):    
    done, result = ExameUseCases.AddCategoriaExame(categoria)
    if done:
        return result
    else:
        raise result

@exameRouter.get("/Exame",response_model=List[ExameDTO])
async def GetExames():
    return ExameUseCases.GetExamesAll()

@exameRouter.get("/Exame/Categoria",response_model=List[CategoriaExameDTO])
async def GetCategorias():
    return ExameUseCases.GetCategoriasAll()

@exameRouter.get("/Exame/{Exame_ID}", response_class=FileResponse)
async def GetExames(Exame_ID:str):
    return ExameUseCases.GetExameById(Exame_ID)

@exameRouter.delete("/Exame/{Exame_ID}")
async def RemoveExame(Exame_ID:str):
    done, result = ExameUseCases.RemoveExame(Exame_ID)
    if done:
        return result
    else:
        raise result


from typing import List
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import session
from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile
from DTO.CategoriaExameDTO import CategoriaExameDTO
from UseCases import ReceitaUseCases
from fastapi.responses import FileResponse

from DTO.ReceitaDTO import ReceitaDTO
receitaRouter = APIRouter()

@receitaRouter.post("/Receita/")
async def CreateReceita(Consulta_ID:str,file: UploadFile = File(...)):
    ReceitaUseCases.AdicionaReceita(Consulta_ID,file)
    return {"filename": file.filename}

@receitaRouter.get("/Receita",response_model=List[ReceitaDTO])
async def GetReceitas():
    return ReceitaUseCases.GetReceitasAll()

@receitaRouter.get("/Receita/{Receita_ID}", response_class=FileResponse)
async def GetReceitaById(Receita_ID:str):
    return ReceitaUseCases.GetReceitaById(Receita_ID)


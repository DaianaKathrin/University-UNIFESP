import os
import uuid
from fastapi.responses import FileResponse
from fastapi import FastAPI, File, UploadFile
from sqlalchemy.sql.expression import null
from DTO.CategoriaExameDTO import CategoriaExameDTO
from DTO.ExameDTO import ExameDTO
from Entities.CategoriaExame import CategoriaExame
from Entities.Exame import Exame
from Entities.Paciente import Paciente
from database import SessionLocal
from fastapi.exceptions import HTTPException
import datetime
session = SessionLocal()

def CreateExame(CategoriaExame_ID:str,Descricao:str,Paciente_ID:str,file: UploadFile = File(...)):
    try:
        newExame = Exame(Exame_ID = str(uuid.uuid1()),
                        Data = datetime.datetime.now(),
                        Nome_Arquivo = file.filename,
                        Descricao = Descricao,
                        Paciente_ID = Paciente_ID,
                        CategoriaExame_ID = CategoriaExame_ID)

        file_location = f"{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        splitted = file.filename.split('.')
        
        os.rename(file.filename, newExame.Exame_ID+'.'+splitted[len(splitted)-1])

        session.add(newExame)
        session.commit()
        return True, newExame
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def AddCategoriaExame(model:CategoriaExameDTO):
    try:
        newCategoriaExame = CategoriaExame(CategoriaExame_ID = str(uuid.uuid1()),
                        Nome = model.Nome)

        session.add(newCategoriaExame)
        session.commit()
        return True, newCategoriaExame
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetExamesAll():
    return session.query(Exame).all()

def GetCategoriasAll():
    return session.query(CategoriaExame).all()


def GetExameById(Exame_ID:str):
    exame = session.query(Exame).filter(Exame.Exame_ID == Exame_ID).one_or_none()
    splitted = exame.Nome_Arquivo.split('.')
        
    if(exame is not None):
        return FileResponse(exame.Exame_ID+'.'+splitted[len(splitted)-1])

def RemoveExame(Exame_ID:str):
    try:
        exame = session.query(Exame).filter(Exame.Exame_ID == Exame_ID).one_or_none()
        splitted = exame.Nome_Arquivo.split('.')
        #print(exame.Exame_ID+'.'+splitted[len(splitted)-1])
        os.remove(exame.Exame_ID+'.'+splitted[len(splitted)-1])
        session.delete(exame)
        session.commit()
        return True, None
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")




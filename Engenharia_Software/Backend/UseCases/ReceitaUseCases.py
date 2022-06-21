import datetime
import os
from typing import List
from fastapi import File, UploadFile, status
import uuid
from fastapi.exceptions import HTTPException
from Entities.Receita import Receita
from database import SessionLocal
from fastapi.responses import FileResponse
session = SessionLocal()

def AdicionaReceita(Consulta_Id:str,file: UploadFile = File(...)):
    try:
        newReceita = Receita(Receita_ID = str(uuid.uuid1()),
                        Data = datetime.datetime.now(),
                        Nome_Arquivo = file.filename,
                        Consulta_ID = Consulta_Id)

        print(newReceita.Consulta_ID)

        file_location = f"{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        splitted = file.filename.split('.')
        
        os.rename(file.filename, newReceita.Receita_ID+'.'+splitted[len(splitted)-1])

        session.add(newReceita)
        session.commit()
        return True, newReceita
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetReceitasAll():
    return session.query(Receita).all()

def GetReceitaById(Receita_ID:str):
    receita = session.query(Receita).filter(Receita.Receita_ID == Receita_ID).one_or_none()
    splitted = receita.Nome_Arquivo.split('.')
    if(receita is not None):
        return FileResponse(receita.Receita_ID+'.'+splitted[len(splitted)-1])

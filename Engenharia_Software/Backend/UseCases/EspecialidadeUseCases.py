import uuid
from DTO.EspecialidadeDTO import EspecialidadeDTO
from DTO.PacienteDTO import PacienteDTO
from Entities.Especialidade import Especialidade
from database import SessionLocal
from fastapi.exceptions import HTTPException
session = SessionLocal()

def CreateEspecialidade(especialiade: EspecialidadeDTO):
    try:
        especialiade.Especialidade_ID = str(uuid.uuid1())
        newEspecialidade = Especialidade(Nome = especialiade.Nome, Especialidade_ID =especialiade.Especialidade_ID )
        session.add(newEspecialidade)
        session.commit()
        return True, especialiade
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetEspecialidade():
    return session.query(Especialidade).all()

def GetEspecialidadeById(Especialidade_ID:str):
    especialidade = session.query(Especialidade).filter(Especialidade.Especialidade_ID == Especialidade_ID).one_or_none()
    return especialidade


def UpdateEspecialidade(model:EspecialidadeDTO, Especialidade_ID:str):
    try:
        # get the existing data
        especialidade = session.query(Especialidade).filter(Especialidade.Especialidade_ID == Especialidade_ID).one_or_none()
        if especialidade is None:
            return model, False

        # Update model class variable from requested fields 
        for var, value in vars(model).items():
            setattr(especialidade, var, value) if value else None

        session.add(especialidade)
        session.commit()
        session.refresh(especialidade)
        return True, especialidade
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")


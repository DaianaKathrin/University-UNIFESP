from statistics import mode
from unittest import result
import uuid
from fastapi.exceptions import HTTPException

from sqlalchemy.sql.sqltypes import NullType
from DTO.ConsultaDTO import ConsultaDTO
from DTO.ConsultaStatusDTO import ConsultaStatusDTO
from DTO.ExameConsultaDTO import ExameConsultaDTO
from Entities.Consulta import Consulta
from Entities.ExameConsulta import ExameConsulta
from Entities.Exame import Exame
from Entities.Receita import Receita
from database import SessionLocal
session = SessionLocal()

def CreateConsulta(consulta:ConsultaDTO):
    try:
        consulta.Consulta_ID = str(uuid.uuid1())
        newConsulta = Consulta(Consulta_ID = consulta.Consulta_ID,
                               Status = consulta.Status,
                               Paciente_ID = consulta.Paciente_ID,
                               Medico_ID = consulta.Medico_ID,
                               Especialidade_ID = consulta.Especialidade_ID,
                               Horario_ID = consulta.Horario_ID)
        session.add(newConsulta)
        session.commit()
        return True, consulta
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetConsultas():
    return session.query(Consulta).all()

def GetConsultaById(Consulta_ID:str):
    consulta = session.query(Consulta).filter(Consulta.Consulta_ID == Consulta_ID).one_or_none()
    return consulta


def UpdateConsulta(model:ConsultaDTO, Consulta_ID:str):
    try:
        # get the existing data
        consulta = session.query(Consulta).filter(Consulta.Consulta_ID == Consulta_ID).one_or_none()
        if consulta is None:
            return False, HTTPException(status_code=404, detail="Register not found.")

        # Update model class variable from requested fields 
        for var, value in vars(model).items():
            setattr(consulta, var, value) if value else None

        session.add(consulta)
        session.commit()
        session.refresh(consulta)
        return True, consulta
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def UpdateStatusConsulta(Consulta_ID:str,model:ConsultaStatusDTO):
    try:
        # get the existing data
        consulta = session.query(Consulta).filter(Consulta.Consulta_ID == Consulta_ID).one_or_none()
        if consulta is None:
            return False, HTTPException(status_code=404, detail="Register not found.")

        consulta.Status = model.Status

        session.add(consulta)
        session.commit()
        session.refresh(consulta)
        return True, consulta
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def AddLinkMeet(Consulta_ID:str,linkMeet:str):
    try:
        # get the existing data
        consulta = session.query(Consulta).filter(Consulta.Consulta_ID == Consulta_ID).one_or_none()
        if consulta is None:
            return False, HTTPException(status_code=404, detail="Register not found.")

        consulta.LinkMeet = linkMeet

        session.add(consulta)
        session.commit()
        session.refresh(consulta)
        return True, consulta
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")


def AddExameConsulta(model:ExameConsultaDTO):
    try:
        model.ExameConsulta_ID = str(uuid.uuid1())
        newExameConsulta = ExameConsulta(ExameConsulta_ID = model.ExameConsulta_ID,
                                        Consulta_ID = model.Consulta_ID,
                                        Exame_ID = model.Exame_ID)
        session.add(newExameConsulta)
        session.commit()
        return True, model
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetExamesConsulta(Consulta_ID:str):
    examesConsulta = session.query(ExameConsulta.Exame_ID).filter(ExameConsulta.Consulta_ID == Consulta_ID).all()
    result = session.query(Exame).filter(Exame.Exame_ID.in_(examesConsulta)).all()
    return result

def GetConsultaReceitas(Consulta_ID:str):
    return session.query(Receita).filter(Receita.Consulta_ID == Consulta_ID).all()

import uuid
from sqlalchemy.sql.expression import null
from DTO.HorarioDTO import HorarioDTO
from Entities.Horario import Horario
from database import SessionLocal
from fastapi.exceptions import HTTPException
session = SessionLocal()

def CreateHorario(horario: HorarioDTO):
    try:
        horario.Horario_ID = str(uuid.uuid1())
        newHorario = Horario(Horario_ID = horario.Horario_ID,
                            Data = horario.Data,
                            Horario_Inicio = horario.Horario_Inicio,
                            Horario_Fim = horario.Horario_Fim,
                            Medico_ID = horario.Medico_ID)
        session.add(newHorario)
        session.commit()
        return True, horario
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetHorarios():
    horariosList = session.query(Horario).all()
    return horariosList


def GetHorarioById(Horario_ID:str):
    horario = session.query(Horario).filter(Horario.Horario_ID == Horario_ID).one_or_none()
    return horario

def UpdateHorario(model:HorarioDTO, Horario_ID:str):
    try:
        # get the existing data
        horario = session.query(Horario).filter(Horario.Horario_ID == Horario_ID).one_or_none()
        if horario is None:
            return False, HTTPException(status_code=404, detail="Register not found.")

        # Update model class variable from requested fields 
        for var, value in vars(model).items():
            setattr(horario, var, value) if value else None

        session.add(horario)
        session.commit()
        session.refresh(horario)
        return True, horario
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")


def RemoveHorarioById(Horario_ID:str):
    try:
        # get the existing data
        horario = session.query(Horario).filter(Horario.Horario_ID == Horario_ID).one_or_none()
        if horario is None:
            return False, HTTPException(status_code=404, detail="Register not found.")

        if horario.consultas is None:
            session.delete(horario)
            session.commit()
            session.refresh(horario)
        else:
            return False, HTTPException(status_code=404, detail="Esse horario já está associado a uma consulta")
        
        return True, horario
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

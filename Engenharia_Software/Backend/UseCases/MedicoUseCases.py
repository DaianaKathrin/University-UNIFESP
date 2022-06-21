import datetime
from typing import List
from fastapi import File, UploadFile, status
import uuid
from fastapi.exceptions import HTTPException
from sqlalchemy.sql.functions import mode

from sqlalchemy.sql.sqltypes import Date, NullType
from DTO.HorarioDTO import HorarioDTO
from DTO.LoginDTO import LoginDTO
from DTO.MedicoDTO import MedicoDTO
from DTO.MedicoHorariosDTO import MedicoHorariosDTO
from DTO.MedicoEspecialidadeDTO import MedicoEspecialidadeDTO
from DTO.ReceitaDTO import ReceitaDTO
from Entities.Consulta import Consulta
from Entities.Medico import Medico
from Entities.Horario import Horario
from Entities.MedicoEspecialidade import MedicoEspecialidade
from Entities.Receita import Receita
from database import SessionLocal
session = SessionLocal()


def Login(login: LoginDTO):
    try:
        medico = session.query(Medico).filter(Medico.Email == login.Email).one_or_none()
        
        if(medico is not None):
            return True, medico
        else:
            return False, HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User not found.")
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def CreateMedico(medico: MedicoDTO):
    try:
        medico.Medico_ID = str(uuid.uuid1())
        newMedico = Medico(Nome = medico.Nome, 
                               Medico_ID = medico.Medico_ID, 
                               Data_Nascimento= medico.Data_Nascimento,
                               CPF = medico.CPF,
                               CRM = medico.CRM,
                               Cidade = medico.Cidade,
                               Estado = medico.Estado,
                               Logradouro = medico.Logradouro,
                               Logradouro_Numero = medico.Logradouro_Numero,
                               CEP = medico.CEP,
                               Telefone = medico.Telefone,
                               Celular = medico.Celular,
                               Email = medico.Email,
                               Sexo = medico.Sexo,
                               Descricao = medico.Descricao,
                               Senha = medico.Senha)
        session.add(newMedico)
        session.commit()
        return True, medico
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetMedicos():
    medicosList = session.query(Medico).all()
    return medicosList

def GetMedicoById(Medico_ID:str):
    medico = session.query(Medico).filter(Medico.Medico_ID == Medico_ID).one_or_none()
    return medico

def GetMedicoEspecialiade(Medico_ID:str, Especilidade_ID):
    medicoEspecialidade = session.query(MedicoEspecialidade).filter(MedicoEspecialidade.Medico_ID == Medico_ID, MedicoEspecialidade.Especialidade_ID == Especilidade_ID).one_or_none()
    return medicoEspecialidade

def GetMedicoEspecialidades(Medico_ID:str):
    medicoEspecialidade = session.query(MedicoEspecialidade).filter(MedicoEspecialidade.Medico_ID == Medico_ID).all()

    return medicoEspecialidade

def UpdateMedico(model:MedicoDTO, Medico_ID):
    try:
        # get the existing data
        medico = session.query(Medico).filter(Medico.Medico_ID == Medico_ID).one_or_none()
        if medico is None:
            return False, HTTPException(status_code=404, detail="Register not found.")

        # Update model class variable from requested fields 
        for var, value in vars(model).items():
            setattr(medico, var, value) if value else None

        session.add(medico)
        session.commit()
        session.refresh(medico)
        return True, medico
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def AddEspecialidade(model:MedicoEspecialidadeDTO):
    try:
        model.MedicoEspecialidade_ID = str(uuid.uuid1())
        newMedicoEspecialidade = MedicoEspecialidade(MedicoEspecialidade_ID = model.MedicoEspecialidade_ID,
                                                    Medico_ID = model.Medico_ID,
                                                    Especialidade_ID = model.Especialidade_ID,
                                                    ModeloAnamnese = model.ModeloAnamnese)

        session.add(newMedicoEspecialidade)
        session.commit()
        return True, newMedicoEspecialidade
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def RemoveEspecialidade(MedicoEspecialidade_ID:str):
    try:
        medicoEspecialidade = session.query(MedicoEspecialidade).filter(MedicoEspecialidade.MedicoEspecialidade_ID == MedicoEspecialidade_ID).one_or_none()
        session.delete(medicoEspecialidade)
        session.commit()
        return True, None
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetHorariosEspecialidade(Especialidade_ID:str, Data:Date):
    medicosEspecialidade = session.query(MedicoEspecialidade.Medico_ID).filter(MedicoEspecialidade.Especialidade_ID == Especialidade_ID).all()
    medicosEspecialidade = session.query(Medico).filter(Medico.Medico_ID.in_(medicosEspecialidade)).all()
    result = list()
    for i in medicosEspecialidade:
        horarios = session.query(Horario).filter(Horario.Medico_ID == i.Medico_ID, Horario.Data == Data).filter(
            Horario.Horario_ID.notin_(session.query(Consulta.Horario_ID).filter(Consulta.Status != -1).all())
        ).all()
        if(len(horarios)>0):
            medicoHorario = MedicoHorariosDTO(Medico_ID = i.Medico_ID,
                                                Nome =  i.Nome,
                                                CRM = i.CRM,
                                                Descricao = i.Descricao,
                                                Horarios = list())
            for j in horarios:
                horario = HorarioDTO(Horario_ID =  j.Horario_ID,
                                    Data = j.Data,
                                    Horario_Inicio = j.Horario_Inicio,
                                    Horario_Fim = j.Horario_Fim,
                                    Medico_ID = j.Medico_ID)
                medicoHorario.Horarios.append(horario)
            result.append(medicoHorario)
    return result

def GetConsultas(Medico_ID:str):
    consultasList = session.query(Consulta).filter(Consulta.Medico_ID == Medico_ID).all()
    return consultasList

def GetHorarios(Medico_ID:str):
    horariosList = session.query(Horario).filter(Horario.Medico_ID == Medico_ID).all()
    return horariosList





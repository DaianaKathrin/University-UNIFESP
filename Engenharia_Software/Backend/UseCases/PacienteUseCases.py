import uuid
from sqlalchemy.sql.functions import mode
from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.sql.sqltypes import NullType
from DTO.LoginDTO import LoginDTO
from DTO.PacienteDTO import PacienteDTO
from DTO.ReceitaDTO import ReceitaDTO
from Entities.Exame import Exame
from Entities.Paciente import Paciente
from Entities.Consulta import Consulta
from Entities.Receita import Receita
from database import SessionLocal
session = SessionLocal()



def Login(login: LoginDTO):
    try:
        paciente = session.query(Paciente).filter(Paciente.Email == login.Email).one_or_none()
        
        if(paciente is not None):
            return True, paciente
        else:
            return False, HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User not found.")
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def CreatePaciente(paciente: PacienteDTO):  
    try:
        paciente.Paciente_ID = str(uuid.uuid1())
        newPaciente = Paciente(Nome = paciente.Nome, 
                               Paciente_ID = paciente.Paciente_ID, 
                               Data_Nascimento= paciente.Data_Nascimento,
                               CPF = paciente.CPF,
                               Cidade = paciente.Cidade,
                               Estado = paciente.Estado,
                               Logradouro = paciente.Logradouro,
                               Logradouro_Numero = paciente.Logradouro_Numero,
                               CEP = paciente.CEP,
                               Telefone = paciente.Telefone,
                               Celular = paciente.Celular,
                               Email = paciente.Email,
                               Senha = paciente.Senha)                    
        session.add(newPaciente)
        session.commit()
        return True, paciente
    except Exception as e:
        print(e.__class__)
        return False, HTTPException(status_code=500, detail="Internal server exception")

def GetPacientes():
    pacientesList = session.query(Paciente).all()
    return pacientesList

def GetPacientesById(Paciente_ID:str):
    pacientesList = session.query(Paciente).filter(Paciente.Paciente_ID == Paciente_ID).one_or_none()
    return pacientesList

def UpdatePaciente(model:PacienteDTO, Paciente_ID):
    try:
        # get the existing data
        paciente = session.query(Paciente).filter(Paciente.Paciente_ID == Paciente_ID).one_or_none()
        if paciente is None:
            return False, HTTPException(status_code=404, detail="Register not found.")

        # Update model class variable from requested fields 
        for var, value in vars(model).items():
            setattr(paciente, var, value) if value else None

        session.add(paciente)
        session.commit()
        session.refresh(paciente)
        return True, paciente
    except Exception as e:
        print(e.__cause__)
        return False, HTTPException(status_code=500, detail="Internal server exception.")

def GetConsultas(Paciente_ID:str):
    consultasList = session.query(Consulta).filter(Consulta.Paciente_ID == Paciente_ID).all()
    return consultasList

def GetExames(Paciente_ID:str):
    examesList = session.query(Exame).filter(Exame.Paciente_ID == Paciente_ID).all()
    return examesList

def GetReceitas(Paciente_ID:str):
    consultas = session.query(Consulta).filter(Consulta.Paciente_ID == Paciente_ID).all()
    receitas = []
    for i in consultas:
        receitas_consulta = session.query(Receita).filter(Receita.Consulta_ID == i.Consulta_ID).all()
        for j in receitas_consulta:
            receitas.append(j)
    return receitas

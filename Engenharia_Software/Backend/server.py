from fastapi import FastAPI
from database import Base
from database import engine
from database import SessionLocal
from Entities.Paciente import Paciente
from Entities.Consulta import Consulta
from Entities.Horario import Horario
from Entities.Medico import Medico
from Entities.Especialidade import Especialidade
from Entities.MedicoEspecialidade import MedicoEspecialidade
from fastapi.middleware.cors import CORSMiddleware

##Controllers Import##
from Controllers.EspecialidadeController import especialidadeRouter
from Controllers.PacienteController import pacienteRouter
from Controllers.ConsultaController import consultaRouter
from Controllers.MedicoController import medicoRouter
from Controllers.HorarioController import horarioRouter
from Controllers.ExameController import exameRouter
from Controllers.ReceitasController import receitaRouter
##End Controllers Import##

Base.metadata.create_all(bind=engine)
app = FastAPI()
origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(especialidadeRouter)
app.include_router(pacienteRouter)
app.include_router(consultaRouter)
app.include_router(medicoRouter)
app.include_router(horarioRouter)
app.include_router(exameRouter)
app.include_router(receitaRouter)

@app.get('/')
def hello_world():
    return {'message': 'Olá, Bem-vindo ao HawkMedical'}
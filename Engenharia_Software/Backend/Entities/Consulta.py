import string
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.expression import column
from sqlalchemy.sql.sqltypes import CHAR, Date, Time
from sqlalchemy.orm import relationship
from Entities.Horario import Horario
from database import Base


class Consulta(Base):
    __tablename__ = "consultas"
    Consulta_ID = Column(String, primary_key=True, index=True)
    Status = Column(Integer)
    LinkMeet = Column(String)
    Paciente_ID = Column(String, ForeignKey("pacientes.Paciente_ID"))
    pacientes = relationship("Paciente", back_populates="consultas", uselist=False)
    Medico_ID = Column(String, ForeignKey("medicos.Medico_ID"))
    medicos = relationship("Medico", back_populates="consultas", uselist=False)
    Horario_ID = Column(String, ForeignKey("horarios.Horario_ID"))
    horarios = relationship("Horario", back_populates="consultas", uselist=False)
    Especialidade_ID = Column(String, ForeignKey("especialidades.Especialidade_ID"))
    especialidades = relationship("Especialidade", back_populates="consultas", uselist=False)
    
  
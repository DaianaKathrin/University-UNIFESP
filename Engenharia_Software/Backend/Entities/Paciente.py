from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.sqltypes import CHAR, Date
from database import Base
from sqlalchemy.orm import relationship

class Paciente(Base):
    __tablename__ = "pacientes"
    Paciente_ID = Column(String, primary_key=True, index=True)
    Nome = Column(String)
    Data_Nascimento = Column(Date)
    CPF = Column(String)
    Cidade = Column(String)
    Estado = Column(String)
    Logradouro = Column(String)
    Logradouro_Numero = Column(Integer)
    CEP = Column(String)
    Telefone = Column(String)
    Celular = Column(String)
    Email = Column(String)
    Senha = Column(String)
    consultas = relationship("Consulta", back_populates="pacientes")

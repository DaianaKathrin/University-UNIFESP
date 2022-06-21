from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.sqltypes import CHAR, Date
from sqlalchemy.orm import relationship
from database import Base


class Medico(Base):
    __tablename__ = "medicos"
    Medico_ID = Column(String, primary_key=True, index=True)
    Nome = Column(String)
    CPF = Column(String)
    CRM = Column(String)
    Cidade = Column(String)
    Estado = Column(String)
    Logradouro = Column(String)
    Logradouro_Numero = Column(String)
    CEP = Column(String)
    Telefone = Column(String)
    Celular = Column(String)
    Email = Column(String)
    Descricao = Column(String)
    Sexo = Column(CHAR)
    Data_Nascimento = Column(Date)
    Senha = Column(String)
    Horarios = relationship("Horario")
    consultas = relationship("Consulta", back_populates="medicos")


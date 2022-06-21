from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base
from sqlalchemy.orm import relationship


class Especialidade(Base):
    __tablename__ = "especialidades"
    Especialidade_ID = Column(String, primary_key=True, index=True)
    Nome = Column(String, unique=True)
    consultas = relationship("Consulta", back_populates="especialidades")
    medicoEspecialidade = relationship("MedicoEspecialidade", back_populates="especialidades")
    
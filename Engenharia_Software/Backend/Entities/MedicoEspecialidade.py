from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.sqltypes import CHAR, Date
from sqlalchemy.orm import relationship
from database import Base


class MedicoEspecialidade(Base):
    __tablename__ = "medicoEspecialidade"
    MedicoEspecialidade_ID = Column(String, primary_key=True, index=True)
    Medico_ID = Column(String, ForeignKey("medicos.Medico_ID"))
    Especialidade_ID = Column(String, ForeignKey("especialidades.Especialidade_ID"))
    especialidades = relationship("Especialidade", back_populates="medicoEspecialidade", uselist=False)
    ModeloAnamnese = Column(String)
    
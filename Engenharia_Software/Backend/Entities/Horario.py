from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.expression import column
from sqlalchemy.sql.sqltypes import CHAR, Date, Time
from sqlalchemy.orm import relationship
from database import Base


class Horario(Base):
    __tablename__ = "horarios"
    Horario_ID = Column(String, primary_key=True, index=True)
    Data = Column(Date)
    Horario_Inicio = Column(Time)
    Horario_Fim = Column(Time)
    Medico_ID = Column(String, ForeignKey("medicos.Medico_ID"))
    consultas = relationship("Consulta", back_populates="horarios", uselist=False)

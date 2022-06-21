from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.sqltypes import CHAR, Date
from sqlalchemy.orm import relationship
from database import Base


class ExameConsulta(Base):
    __tablename__ = "exameConsulta"
    ExameConsulta_ID = Column(String, primary_key=True, index=True)
    Consulta_ID = Column(String, ForeignKey("consultas.Consulta_ID"))
    Exame_ID = Column(String, ForeignKey("exames.Exame_ID"))
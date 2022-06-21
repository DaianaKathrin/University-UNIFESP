from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.expression import column
from sqlalchemy.sql.sqltypes import CHAR, Date, DateTime, Time
from sqlalchemy.orm import relationship
from database import Base


class Exame(Base):
    __tablename__ = "exames"
    Exame_ID = Column(String, primary_key=True, index=True)
    Data = Column(DateTime)
    Nome_Arquivo = Column(String)
    Descricao = Column(String)
    Paciente_ID = Column(String, ForeignKey("pacientes.Paciente_ID"))
    CategoriaExame_ID = Column(String, ForeignKey("categoriasExame.CategoriaExame_ID"))

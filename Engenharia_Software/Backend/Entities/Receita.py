from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.expression import column
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import CHAR, Date, DateTime, Time
from database import Base


class Receita(Base):
    __tablename__ = "receitas"
    Receita_ID = Column(String, primary_key=True, index=True)
    Data = Column(DateTime)
    Nome_Arquivo = Column(String)
    Consulta_ID = Column(String, ForeignKey("consultas.Consulta_ID"))
    
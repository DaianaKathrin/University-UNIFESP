from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.expression import column
from sqlalchemy.sql.sqltypes import CHAR, Date, DateTime, Time
from sqlalchemy.orm import relationship
from database import Base


class CategoriaExame(Base):
    __tablename__ = "categoriasExame"
    CategoriaExame_ID = Column(String, primary_key=True, index=True)
    Nome = Column(String)

BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> 71e7411435a5

CREATE TABLE "categoriasExame" (
    "CategoriaExame_ID" VARCHAR NOT NULL, 
    "Nome" VARCHAR, 
    PRIMARY KEY ("CategoriaExame_ID")
);

CREATE INDEX "ix_categoriasExame_CategoriaExame_ID" ON "categoriasExame" ("CategoriaExame_ID");

CREATE TABLE especialidades (
    "Especialidade_ID" VARCHAR NOT NULL, 
    "Nome" VARCHAR, 
    PRIMARY KEY ("Especialidade_ID"), 
    UNIQUE ("Nome")
);

CREATE INDEX "ix_especialidades_Especialidade_ID" ON especialidades ("Especialidade_ID");

CREATE TABLE medicos (
    "Medico_ID" VARCHAR NOT NULL, 
    "Nome" VARCHAR, 
    "CPF" VARCHAR, 
    "CRM" VARCHAR, 
    "Cidade" VARCHAR, 
    "Estado" VARCHAR, 
    "Logradouro" VARCHAR, 
    "Logradouro_Numero" VARCHAR, 
    "CEP" VARCHAR, 
    "Telefone" VARCHAR, 
    "Celular" VARCHAR, 
    "Email" VARCHAR, 
    "Descricao" VARCHAR, 
    "Sexo" CHAR, 
    "Data_Nascimento" DATE, 
    "Senha" VARCHAR, 
    PRIMARY KEY ("Medico_ID")
);

CREATE INDEX "ix_medicos_Medico_ID" ON medicos ("Medico_ID");

CREATE TABLE pacientes (
    "Paciente_ID" VARCHAR NOT NULL, 
    "Nome" VARCHAR, 
    "Data_Nascimento" DATE, 
    "CPF" VARCHAR, 
    "Cidade" VARCHAR, 
    "Estado" VARCHAR, 
    "Logradouro" VARCHAR, 
    "Logradouro_Numero" INTEGER, 
    "CEP" VARCHAR, 
    "Telefone" VARCHAR, 
    "Celular" VARCHAR, 
    "Email" VARCHAR, 
    "Senha" VARCHAR, 
    PRIMARY KEY ("Paciente_ID")
);

CREATE INDEX "ix_pacientes_Paciente_ID" ON pacientes ("Paciente_ID");

CREATE TABLE exames (
    "Exame_ID" VARCHAR NOT NULL, 
    "Data" TIMESTAMP WITHOUT TIME ZONE, 
    "Nome_Arquivo" VARCHAR, 
    "CategoriaExame_ID" VARCHAR, 
    PRIMARY KEY ("Exame_ID"), 
    FOREIGN KEY("CategoriaExame_ID") REFERENCES "categoriasExame" ("CategoriaExame_ID")
);

CREATE INDEX "ix_exames_Exame_ID" ON exames ("Exame_ID");

CREATE TABLE horarios (
    "Horario_ID" VARCHAR NOT NULL, 
    "Data" DATE, 
    "Horario_Inicio" TIME WITHOUT TIME ZONE, 
    "Horario_Fim" TIME WITHOUT TIME ZONE, 
    "Medico_ID" VARCHAR, 
    PRIMARY KEY ("Horario_ID"), 
    FOREIGN KEY("Medico_ID") REFERENCES medicos ("Medico_ID")
);

CREATE INDEX "ix_horarios_Horario_ID" ON horarios ("Horario_ID");

CREATE TABLE "medicoEspecialidade" (
    "MedicoEspecialidade_ID" VARCHAR NOT NULL, 
    "Medico_ID" VARCHAR, 
    "Especialidade_ID" VARCHAR, 
    "ModeloAnamnese" VARCHAR, 
    PRIMARY KEY ("MedicoEspecialidade_ID"), 
    FOREIGN KEY("Especialidade_ID") REFERENCES especialidades ("Especialidade_ID"), 
    FOREIGN KEY("Medico_ID") REFERENCES medicos ("Medico_ID")
);

CREATE INDEX "ix_medicoEspecialidade_MedicoEspecialidade_ID" ON "medicoEspecialidade" ("MedicoEspecialidade_ID");

CREATE TABLE consultas (
    "Consulta_ID" VARCHAR NOT NULL, 
    "Anamnese" VARCHAR, 
    "Status" INTEGER, 
    "Paciente_ID" VARCHAR, 
    "Medico_ID" VARCHAR, 
    "Horario_ID" VARCHAR, 
    PRIMARY KEY ("Consulta_ID"), 
    FOREIGN KEY("Horario_ID") REFERENCES horarios ("Horario_ID"), 
    FOREIGN KEY("Medico_ID") REFERENCES medicos ("Medico_ID"), 
    FOREIGN KEY("Paciente_ID") REFERENCES pacientes ("Paciente_ID")
);

CREATE INDEX "ix_consultas_Consulta_ID" ON consultas ("Consulta_ID");

CREATE TABLE "exameConsulta" (
    "ExameConsulta_ID" VARCHAR NOT NULL, 
    "Consulta_ID" VARCHAR, 
    "Exame_ID" VARCHAR, 
    PRIMARY KEY ("ExameConsulta_ID"), 
    FOREIGN KEY("Consulta_ID") REFERENCES consultas ("Consulta_ID"), 
    FOREIGN KEY("Exame_ID") REFERENCES exames ("Exame_ID")
);

CREATE INDEX "ix_exameConsulta_ExameConsulta_ID" ON "exameConsulta" ("ExameConsulta_ID");

INSERT INTO alembic_version (version_num) VALUES ('71e7411435a5');

-- Running upgrade 71e7411435a5 -> 26fc7ec6027e

CREATE TABLE receitas (
    "Receita_ID" VARCHAR NOT NULL, 
    "Data" TIMESTAMP WITHOUT TIME ZONE, 
    "Nome_Arquivo" VARCHAR, 
    "Consulta_ID" VARCHAR, 
    PRIMARY KEY ("Receita_ID"), 
    FOREIGN KEY("Consulta_ID") REFERENCES consultas ("Consulta_ID")
);

CREATE INDEX "ix_receitas_Receita_ID" ON receitas ("Receita_ID");

UPDATE alembic_version SET version_num='26fc7ec6027e' WHERE alembic_version.version_num = '71e7411435a5';

-- Running upgrade 26fc7ec6027e -> 8fbac71abae6

ALTER TABLE consultas ADD COLUMN "Especialidade_ID" VARCHAR;

ALTER TABLE consultas ADD FOREIGN KEY("Especialidade_ID") REFERENCES especialidades ("Especialidade_ID");

ALTER TABLE consultas DROP COLUMN "Anamnese";

UPDATE alembic_version SET version_num='8fbac71abae6' WHERE alembic_version.version_num = '26fc7ec6027e';

-- Running upgrade 8fbac71abae6 -> 4a7a84d3ce95

ALTER TABLE exames ADD COLUMN "Descricao" VARCHAR;

UPDATE alembic_version SET version_num='4a7a84d3ce95' WHERE alembic_version.version_num = '8fbac71abae6';

-- Running upgrade 4a7a84d3ce95 -> 187e812f34f2

ALTER TABLE exames ADD COLUMN "Paciente_ID" VARCHAR;

ALTER TABLE exames ADD FOREIGN KEY("Paciente_ID") REFERENCES pacientes ("Paciente_ID");

UPDATE alembic_version SET version_num='187e812f34f2' WHERE alembic_version.version_num = '4a7a84d3ce95';

-- Running upgrade 187e812f34f2 -> 7575d4179aac

ALTER TABLE consultas ADD COLUMN "LinkMeet" VARCHAR;

UPDATE alembic_version SET version_num='7575d4179aac' WHERE alembic_version.version_num = '187e812f34f2';

COMMIT;


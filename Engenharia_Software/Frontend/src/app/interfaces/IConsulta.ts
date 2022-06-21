import { IHorario } from "./IHorario"
import { IMedico } from "./IMedico"
import { IPaciente } from "./IPaciente"
import { IEspecialidade } from "./IEspecialidade"
export interface IConsulta
{
    Consulta_ID: string;
    Status: number;
    Paciente_ID: string;
    pacientes: IPaciente;
    Medico_ID: string;
    medicos: IMedico;
    Horario_ID: string;
    horarios: IHorario;
    Especialidade_ID: string;
    especialidades: IEspecialidade;
    LinkMeet: string;
}
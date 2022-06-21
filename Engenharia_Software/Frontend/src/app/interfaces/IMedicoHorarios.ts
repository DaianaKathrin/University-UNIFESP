import { IHorario } from "./IHorario";

export interface IMedicoHorarios{
    Medico_ID: string;
    Nome: string;
    CRM: string;
    Descricao: string;
    Horarios: IHorario[];
  }
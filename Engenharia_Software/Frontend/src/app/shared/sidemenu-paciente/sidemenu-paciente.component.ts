import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu-paciente',
  templateUrl: './sidemenu-paciente.component.html',
  styleUrls: ['./sidemenu-paciente.component.scss']
})
export class SidemenuPacienteComponent implements OnInit {

  @Input() opcao: number;

  constructor() { }

  ngOnInit(): void {
  }

}

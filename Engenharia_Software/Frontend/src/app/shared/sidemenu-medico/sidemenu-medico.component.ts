import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu-medico',
  templateUrl: './sidemenu-medico.component.html',
  styleUrls: ['./sidemenu-medico.component.scss']
})
export class SidemenuMedicoComponent implements OnInit {

  @Input() opcao: number;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  @Input() nomeUsuario: string;
  @Input() ehMedico: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

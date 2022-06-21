import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamesPacienteComponent } from './exames-paciente.component';

describe('ExamesPacienteComponent', () => {
  let component: ExamesPacienteComponent;
  let fixture: ComponentFixture<ExamesPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamesPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamesPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

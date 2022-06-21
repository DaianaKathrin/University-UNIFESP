import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuPacienteComponent } from './sidemenu-paciente.component';

describe('SidemenuPacienteComponent', () => {
  let component: SidemenuPacienteComponent;
  let fixture: ComponentFixture<SidemenuPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

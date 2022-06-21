import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoEfetivadoComponent } from './agendamento-efetivado.component';

describe('AgendamentoEfetivadoComponent', () => {
  let component: AgendamentoEfetivadoComponent;
  let fixture: ComponentFixture<AgendamentoEfetivadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentoEfetivadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoEfetivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

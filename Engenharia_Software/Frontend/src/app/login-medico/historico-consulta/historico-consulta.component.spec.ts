import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoConsultaComponent } from './historico-consulta.component';

describe('HistoricoConsultaComponent', () => {
  let component: HistoricoConsultaComponent;
  let fixture: ComponentFixture<HistoricoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaHorarioComponent } from './busca-horario.component';

describe('BuscaHorarioComponent', () => {
  let component: BuscaHorarioComponent;
  let fixture: ComponentFixture<BuscaHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

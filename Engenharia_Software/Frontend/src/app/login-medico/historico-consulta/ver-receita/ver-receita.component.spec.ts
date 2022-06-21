import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReceitaComponent } from './ver-receita.component';

describe('VerReceitaComponent', () => {
  let component: VerReceitaComponent;
  let fixture: ComponentFixture<VerReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerReceitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

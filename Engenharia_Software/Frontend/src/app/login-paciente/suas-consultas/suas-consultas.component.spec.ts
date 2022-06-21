import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuasConsultasComponent } from './suas-consultas.component';

describe('SuasConsultasComponent', () => {
  let component: SuasConsultasComponent;
  let fixture: ComponentFixture<SuasConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuasConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuasConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoExameComponent } from './novo-exame.component';

describe('NovoExameComponent', () => {
  let component: NovoExameComponent;
  let fixture: ComponentFixture<NovoExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoExameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

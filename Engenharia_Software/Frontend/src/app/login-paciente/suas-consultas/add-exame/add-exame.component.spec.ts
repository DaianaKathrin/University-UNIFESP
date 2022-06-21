import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExameComponent } from './add-exame.component';

describe('AddExameComponent', () => {
  let component: AddExameComponent;
  let fixture: ComponentFixture<AddExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

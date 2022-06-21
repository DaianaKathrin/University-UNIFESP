import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuMedicoComponent } from './sidemenu-medico.component';

describe('SidemenuMedicoComponent', () => {
  let component: SidemenuMedicoComponent;
  let fixture: ComponentFixture<SidemenuMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

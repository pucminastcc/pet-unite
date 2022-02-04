import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetRegistrationComponent} from './pet-registration.component';

describe('PetRegistrationComponent', () => {
  let component: PetRegistrationComponent;
  let fixture: ComponentFixture<PetRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetRegistrationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

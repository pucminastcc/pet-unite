import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppIndexLayoutComponent} from './app-index-layout.component';

describe('AppIndexLayoutComponent', () => {
  let component: AppIndexLayoutComponent;
  let fixture: ComponentFixture<AppIndexLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppIndexLayoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIndexLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

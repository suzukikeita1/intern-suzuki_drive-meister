import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSubmitComponent } from './login-submit.component';

describe('LoginSubmitComponent', () => {
  let component: LoginSubmitComponent;
  let fixture: ComponentFixture<LoginSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

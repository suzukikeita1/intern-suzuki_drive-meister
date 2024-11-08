import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPageLoginLogoutComponent } from './my-page-login-logout.component';

describe('MyPageLoginLogoutComponent', () => {
  let component: MyPageLoginLogoutComponent;
  let fixture: ComponentFixture<MyPageLoginLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPageLoginLogoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPageLoginLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

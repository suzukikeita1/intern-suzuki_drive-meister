import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPageCloseComponent } from './my-page-close.component';

describe('MyPageCloseComponent', () => {
  let component: MyPageCloseComponent;
  let fixture: ComponentFixture<MyPageCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPageCloseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPageCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPageGuideComponent } from './my-page-guide.component';

describe('MyPageGuideComponent', () => {
  let component: MyPageGuideComponent;
  let fixture: ComponentFixture<MyPageGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPageGuideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPageGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

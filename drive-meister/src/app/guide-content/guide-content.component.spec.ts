import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideContentComponent } from './guide-content.component';

describe('GuideContentComponent', () => {
  let component: GuideContentComponent;
  let fixture: ComponentFixture<GuideContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuideContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

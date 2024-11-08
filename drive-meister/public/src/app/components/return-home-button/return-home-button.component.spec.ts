import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnHomeButtonComponent } from './return-home-button.component';

describe('ReturnHomeButtonComponent', () => {
  let component: ReturnHomeButtonComponent;
  let fixture: ComponentFixture<ReturnHomeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnHomeButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnHomeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

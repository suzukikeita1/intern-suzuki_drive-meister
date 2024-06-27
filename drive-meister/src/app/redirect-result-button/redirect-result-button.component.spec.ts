import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectResultButtonComponent } from './redirect-result-button.component';

describe('RedirectResultButtonComponent', () => {
  let component: RedirectResultButtonComponent;
  let fixture: ComponentFixture<RedirectResultButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirectResultButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedirectResultButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

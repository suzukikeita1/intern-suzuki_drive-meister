import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeTrueFalseComponent } from './judge-true-false.component';

describe('JudgeTrueFalseComponent', () => {
  let component: JudgeTrueFalseComponent;
  let fixture: ComponentFixture<JudgeTrueFalseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JudgeTrueFalseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JudgeTrueFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

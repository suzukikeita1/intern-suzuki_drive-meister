import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReturnHomeButtonComponent } from '../return-home-button/return-home-button.component';
import { RouterModule } from '@angular/router';
import { RedirectResultButtonComponent } from '../redirect-result-button/redirect-result-button.component';
import { JudgeAnswerService } from '../judge-answer.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ReturnHomeButtonComponent,
    RouterModule,
    RedirectResultButtonComponent,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  constructor(private judgeAnswerService: JudgeAnswerService) {}
  @Input() results: boolean[] = this.judgeAnswerService.results;

  answerTotal: number = this.results.length;
  correctTotal: number = this.results.filter((result) => result === true)
    .length;
}

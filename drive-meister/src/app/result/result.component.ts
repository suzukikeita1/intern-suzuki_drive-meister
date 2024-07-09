import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReturnHomeButtonComponent } from '../return-home-button/return-home-button.component';
import { RouterModule } from '@angular/router';
import { RedirectResultButtonComponent } from '../redirect-result-button/redirect-result-button.component';

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
  constructor() {}
  answerTotal: number = 10;
  correctTotal: number = 4;
}

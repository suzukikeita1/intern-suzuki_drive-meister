import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QuizComponent } from '../quiz/quiz.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    QuizComponent,
    RouterModule,
  ],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss',
})
export class HomeCardComponent {
  @Input() cardType: string = '';
}

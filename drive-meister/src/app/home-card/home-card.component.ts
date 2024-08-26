import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QuizComponent } from '../quiz/quiz.component';
import { RouterModule } from '@angular/router';
import { Card } from '../types/card';
import { Router } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { QuizService } from '../quiz.service';
import { ShuffleCardsService } from '../shuffle-cards.service';
import { QuizCardService } from '../quiz-card.service';


@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    QuizComponent,
    RouterModule,
    AngularFirestoreModule,
  ],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss',
})
export class HomeCardComponent {
  constructor(private quizService: QuizService,private quizCardService: QuizCardService, private router: Router) {}
  cards: Card[] = [];
  @Input() cardType: string = '';

  onWorkButtonClick(): void {
    console.log('onWorkButtonClick');
    this.quizService.getAllQuiz().subscribe((data) => {
      this.cards = data;
      this.quizCardService.setQuizCards = this.cards;
    });
  }

  onReviewButtonClick(): void {
    console.log('onReviewButtonClick');
    this.quizService.getAllReview().subscribe((data) => {
      this.cards = data;
      this.quizCardService.setQuizCards = this.cards;
    });
  }
}

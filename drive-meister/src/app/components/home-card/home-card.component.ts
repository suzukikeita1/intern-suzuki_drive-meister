import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QuizComponent } from '../../pages/quiz/quiz.component';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { Card } from '../../types/card';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { QuizService } from '../../services/quiz.service';
import { QuizCardService } from '../../services/quiz-card.service';
import { ReviewCountService } from '../../services/review-count.service';


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
    MatBadgeModule
  ],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss',
})
export class HomeCardComponent implements OnInit {
  constructor(private quizService: QuizService,private quizCardService: QuizCardService,private reviewCountService: ReviewCountService ) {}
  cards: Card[] = [];
  reviewCards: Card[] = [];
  provisionalLicenseCount: number | undefined;
  driversLicenseCount: number | undefined;

  @Input() cardType: string = '';

  ngOnInit() {
    this.quizService.getAllQuiz().subscribe((data) => {
      this.cards = data;
      this.quizCardService.setQuizCards = this.cards;
    });
    this.quizService.getAllReview().subscribe((data) => {
      this.reviewCards = data;
      this.quizCardService.setReviewQuizCards = this.reviewCards;
    });
    this.reviewCountService.getProvisionalLicenseCount().subscribe((data) => {
      this.provisionalLicenseCount = data;
    });
    this.reviewCountService.getDriversLicenseCount().subscribe((data) => {
      this.driversLicenseCount = data;
    });
  }
}

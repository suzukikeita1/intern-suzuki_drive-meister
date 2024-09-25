import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResultComponent } from '../result/result.component';
import { QuizIndexService } from '../quiz-index.Service';
import { ShuffleCardsService } from '../shuffle-cards.service';
import { ReviewCountService } from '../review-count.Service';
import { QuizService } from '../quiz.service';
import { QuizCardService } from '../quiz-card.service';
import { AddReviewRemoveReviewService } from '../add-review_remove-review.service';
import { Card } from '../types/card';
import { AngularFirestore,AngularFirestoreModule } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-redirect-result-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule, ResultComponent, AngularFirestoreModule],
  templateUrl: './redirect-result-button.component.html',
  styleUrl: './redirect-result-button.component.scss',
})
export class RedirectResultButtonComponent {
  constructor(private quizIndexService: QuizIndexService,private shuffleCardsService: ShuffleCardsService,private reviewCountService: ReviewCountService,private quizService: QuizService,private quizCardService: QuizCardService, private addReviewRemoveReviewService: AddReviewRemoveReviewService,private db: AngularFirestore) {}
  
  onResetCardIndex() {
    this.quizIndexService.resetCurrentCardIndex();
    this.shuffleCardsService.shuffleCards = [];
  }

}

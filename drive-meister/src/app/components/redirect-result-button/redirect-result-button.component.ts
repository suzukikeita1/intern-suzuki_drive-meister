import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResultComponent } from '../../pages/result/result.component';
import { QuizIndexService } from '../../services/quiz-index.service';
import { ShuffleCardsService } from '../../services/shuffle-cards.service';
import { ReviewCountService } from '../../services/review-count.service';
import { QuizService } from '../../services/quiz.service';
import { QuizCardService } from '../../services/quiz-card.service';
import { AddReviewRemoveReviewService } from '../../services/add-review_remove-review.service';
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

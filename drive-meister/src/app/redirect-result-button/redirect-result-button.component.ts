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
  imports: [MatButtonModule, CommonModule, RouterModule, ResultComponent, AngularFirestore,AngularFirestoreModule],
  templateUrl: './redirect-result-button.component.html',
  styleUrl: './redirect-result-button.component.scss',
})
export class RedirectResultButtonComponent {
  constructor(private quizIndexService: QuizIndexService,private shuffleCardsService: ShuffleCardsService,private reviewCountService: ReviewCountService,private quizService: QuizService,private quizCardService: QuizCardService, private addReviewRemoveReviewService: AddReviewRemoveReviewService,private db: AngularFirestore) {}
  reviewCards: Card[] = [];
  provisionalLicenseCount: number | undefined;
  driversLicenseCount: number | undefined;

  onResetCardIndex() {
    this.quizIndexService.resetCurrentCardIndex();
    this.shuffleCardsService.shuffleCards = [];
  }

  onResetReviewCard() {
    this.quizService.getAllReview().subscribe((data) => {
      this.reviewCards = data;
      this.quizCardService.setReviewQuizCards = this.reviewCards;
    });
  }

  onResetCardCount() {
    this.reviewCountService.getProvisionalLicenseCount().subscribe(count => {
      this.provisionalLicenseCount = count;
    });
    this.reviewCountService.getDriversLicenseCount().subscribe(count => {
      this.driversLicenseCount = count;
    });
  }

  addCardToUserReview() {
    const addReviewCards = this.addReviewRemoveReviewService.getAddReviewCards;
    addReviewCards.forEach(cardId => {
      this.db.collection('quiz', ref => ref.where('id', '==', cardId)).get().subscribe(querySnapshot => {
        if (querySnapshot.empty) {
          this.db.collection('user_review').add({ id: cardId });
        }
      });
    });
  }

  removeCardFromUserReview() {
    const removeReviewCards = this.addReviewRemoveReviewService.getRemoveReviewCards;
    removeReviewCards.forEach(cardId => {
      this.db.collection('user_review', ref => ref.where('id', '==', cardId)).get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
    });
  }

}

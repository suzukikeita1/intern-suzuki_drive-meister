import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReturnHomeButtonComponent } from '../return-home-button/return-home-button.component';
import { RouterModule } from '@angular/router';
import { RedirectResultButtonComponent } from '../redirect-result-button/redirect-result-button.component';
import { JudgeAnswerService } from '../judge-answer.service';
import { AngularFirestore,AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AddReviewRemoveReviewService } from '../add-review_remove-review.service';
import { ReviewCountService } from '../review-count.Service';
import { QuizCardService } from '../quiz-card.service';
import { QuizService } from '../quiz.service';
import { Card } from '../types/card';


@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ReturnHomeButtonComponent,
    RouterModule,
    RedirectResultButtonComponent,
    AngularFirestoreModule
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  constructor(private judgeAnswerService: JudgeAnswerService, private db: AngularFirestore, private addReviewRemoveReviewService: AddReviewRemoveReviewService, private reviewCountService: ReviewCountService, private quizService: QuizService,private quizCardService: QuizCardService,) {}
  @Input() results: boolean[] = this.judgeAnswerService.results;
  reviewCards: Card[] = [];
  provisionalLicenseCount: number | undefined;
  driversLicenseCount: number | undefined;
  

  answerTotal: number = this.results.length;
  correctTotal: number = this.results.filter((result) => result === true)
    .length;

  async ngOnInit() {
    await this.addCardToUserReview();
    await this.removeCardFromUserReview();
    await this.onResetReviewCard();
    await this.onResetCardCount();
    this.addReviewRemoveReviewService.initializeReviewCards();
    console.log('After initialization - addReviewCards:', this.addReviewRemoveReviewService.getAddReviewCards);
    console.log('After initialization - removeReviewCards:', this.addReviewRemoveReviewService.getRemoveReviewCards);
  }

  async addCardToUserReview() {
    const addReviewCards = this.addReviewRemoveReviewService.getAddReviewCards;
    addReviewCards.forEach(cardId => {
      // 'quiz' コレクションから 'id' が 'cardId' と一致するドキュメントをクエリ
      this.db.collection('quiz', ref => ref.where('id', '==', cardId)).get().subscribe(quizSnapshot => {
        if (!quizSnapshot.empty) {
          // クエリ結果のドキュメントごとに処理
          quizSnapshot.forEach(doc => {
            // 'user_review' コレクションから 'id' が 'cardId' と一致するドキュメントをクエリ
            this.db.collection('user_review', ref => ref.where('id', '==', doc.id)).get().subscribe(userReviewSnapshot => {
              if (userReviewSnapshot.empty) {
                // 'user_review' コレクションに新しいドキュメントを追加
                this.db.collection('user_review').add(doc.data());
              }
            });
          });
        }
      });
    });
  }

  async removeCardFromUserReview() {
    const removeReviewCards = this.addReviewRemoveReviewService.getRemoveReviewCards;
    removeReviewCards.forEach(cardId => {
      this.db.collection('user_review', ref => ref.where('id', '==', cardId)).get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
    });
  }

  async onResetReviewCard() {
    this.quizService.getAllReview().subscribe((data) => {
      this.reviewCards = data;
      this.quizCardService.setReviewQuizCards = this.reviewCards;
    });
  }

  async onResetCardCount() {
    this.reviewCountService.getProvisionalLicenseCount().subscribe(count => {
      this.provisionalLicenseCount = count;
    });
    this.reviewCountService.getDriversLicenseCount().subscribe(count => {
      this.driversLicenseCount = count;
    });
  }


}

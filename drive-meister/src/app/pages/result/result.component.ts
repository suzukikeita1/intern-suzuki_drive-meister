import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReturnHomeButtonComponent } from '../../components/return-home-button/return-home-button.component';
import { RouterModule } from '@angular/router';
import { RedirectResultButtonComponent } from '../../components/redirect-result-button/redirect-result-button.component';
import { JudgeAnswerService } from '../../services/judge-answer.service';
import { AngularFirestore,AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AddReviewRemoveReviewService } from '../../services/add-review_remove-review.service';
import { ReviewCountService } from '../../services/review-count.service';
import { QuizCardService } from '../../services/quiz-card.service';
import { QuizService } from '../../services/quiz.service';
import { Card } from '../../types/card';


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
    console.log('After addCardToUserReview');
    await this.removeCardFromUserReview();
    console.log('After removeCardFromUserReview');
    await this.onResetReviewCard();
    console.log('After onResetReviewCard');
    await this.onResetCardCount();
    console.log('After onResetCardCount');
    this.addReviewRemoveReviewService.initializeReviewCards();
  }

  async addCardToUserReview() {
    let addReviewCards = this.addReviewRemoveReviewService.getAddReviewCards;
    addReviewCards.forEach(cardId => {
      // 'quiz' コレクションから 'id' が 'cardId' と一致するドキュメントをクエリ
      this.db.collection('quiz', ref => ref.where('id', '==', cardId)).get().subscribe(quizSnapshot => {
        if (!quizSnapshot.empty) {
          // クエリ結果のドキュメントごとに処理
          quizSnapshot.forEach(doc => {
            // 'user_review' コレクションから 'id' が 'cardId' と一致するドキュメントをクエリ
            const data = doc.data() as { id: number };
            this.db.collection('user_review', ref => ref.where('id', '==', data.id)).get().subscribe(userReviewSnapshot => {
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
    let removeReviewCards = this.addReviewRemoveReviewService.getRemoveReviewCards;
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

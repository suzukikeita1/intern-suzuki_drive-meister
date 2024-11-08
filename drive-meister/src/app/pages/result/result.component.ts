import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReturnHomeButtonComponent } from '../../components/return-home-button/return-home-button.component';
import { RouterModule } from '@angular/router';
import { RedirectResultButtonComponent } from '../../components/redirect-result-button/redirect-result-button.component';
import { JudgeAnswerService } from '../../services/judge-answer.service';
import { AngularFirestore,AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AddReviewRemoveReviewService } from '../../services/add-review_remove-review.service';
import { QuizCardService } from '../../services/quiz-card.service';
import { QuizService } from '../../services/quiz.service';
import { Card } from '../../types/card';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';



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
  constructor(
    private judgeAnswerService: JudgeAnswerService, 
    private db: AngularFirestore, 
    private addReviewRemoveReviewService: AddReviewRemoveReviewService, 
    private quizService: QuizService, 
    private quizCardService: QuizCardService, 
    private authService: AuthService, 
    private fireauth: AngularFireAuth,
  ) {}
  @Input() results: boolean[] = this.judgeAnswerService.results;
  reviewCards: Card[] = [];
  userDocId: string  = '';
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
  }

  async isUserLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const subscription = this.fireauth.authState.subscribe({
          next: (user) => {
            resolve(user !== null);
          },
          error: (error) => {
            reject(`認証状態の取得中にエラーが発生しました: ${error}`);
          },
          complete: () => {
            subscription.unsubscribe();
          }
        });
      } catch (error) {
        reject(`予期しないエラーが発生しました: ${error}`);
      }
    });
  }

  async addCardToUserReview() {
    try {
      const userID = await this.authService.getUserId();
      if (!userID) {
        console.log('ユーザーIDが取得できません');
        return;
      }
      this.userDocId = userID;
    } catch (error) {
      return;
    }

    try {
      if (!(await this.isUserLoggedIn())) {
        console.log('ユーザーがログインしていません');
        return;
      }
    } catch (error) {
      return;
    }

    const addReviewCards = this.addReviewRemoveReviewService.getAddReviewCards;

    addReviewCards.forEach(cardId => {
      // 'quiz' コレクションから 'id' が 'cardId' と一致するドキュメントをクエリ
      this.db.collection('quiz', ref => ref.where('id', '==', cardId)).get().subscribe(quizSnapshot => {
        if (!quizSnapshot.empty) {
          // クエリ結果のドキュメントごとに処理
          quizSnapshot.forEach(doc => {
            // 'user_review' コレクションから 'id' が 'cardId' と一致するドキュメントをクエリ
            const data = doc.data() as { id: number };
            console.log(data);
            this.db.collection('user').doc(this.userDocId).collection('user_review', ref => ref.where('id', '==', data.id)).get().subscribe(userReviewSnapshot => {
              if (userReviewSnapshot.empty) {
                // 'user_review' コレクションに新しいドキュメントを追加
                this.db.collection('user').doc(this.userDocId).collection('user_review').add(data);
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
      this.db.collection('user').doc(this.userDocId).collection('user_review', ref => ref.where('id', '==', cardId)).get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
    });
  }

  async onResetReviewCard() {
    (await this.quizService.getAllReview()).subscribe((data) => {
      this.reviewCards = data;
      this.quizCardService.setReviewQuizCards = this.reviewCards;
    });
  }

  async onResetCardCount() {
    (await this.authService.getProvisionalLicenseCount()).subscribe(count => {
      this.provisionalLicenseCount = count;
    });
    (await this.authService.getDriversLicenseCount()).subscribe(count => {
      this.driversLicenseCount = count;
    });
  }
}

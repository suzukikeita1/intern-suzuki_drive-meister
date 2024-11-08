import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Card } from '../types/card';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';



@Injectable({ providedIn: 'root' }) // このサービスをルートに提供する

export class QuizService {
  //全クイズデータを取得、全クイズ（復習）データを取得
  quizList: AngularFirestoreCollection<Card>;
  reviewList: AngularFirestoreCollection<Card> | null = null;
  userDocId: string  = '';

  constructor(private db: AngularFirestore, private fireauth: AngularFireAuth, private authService: AuthService) {
    this.quizList = this.db.collection('/quiz');
    this.initializeUserReviewList();
  }

  async initializeUserReviewList() {
    try {
      const userId = await this.authService.getUserId();
      if (userId) {
        this.userDocId = userId;
        this.reviewList = this.db.collection('user').doc(this.userDocId).collection('user_review');
      } else {
        console.log('ユーザーIDが取得できませんでした。');
      }
    } catch (error) {
      console.error('ユーザーIDの取得中にエラーが発生しました:', error);
    }
  }

  async getAllQuiz(): Promise <Observable<Card[]>> {
    return this.quizList.valueChanges();
  }

  async getAllReview(): Promise <Observable<Card[]>> {
    if (!this.reviewList) {
      await this.initializeUserReviewList();
    }
    return this.reviewList ? this.reviewList.valueChanges() : new Observable<Card[]>();
  }
}

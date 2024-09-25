import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../types/card';


@Injectable({ providedIn: 'root' }) // このサービスをルートに提供する

export class QuizService {
  //全クイズデータを取得、全クイズ（復習）データを取得
  quizList: AngularFirestoreCollection<Card>;
  reviewList: AngularFirestoreCollection<Card>;

  constructor(private db: AngularFirestore) {
    this.quizList = this.db.collection('/quiz');
    this.reviewList = this.db.collection('/user_review');
  }

  getAllQuiz(): Observable<Card[]> {
    return this.quizList.valueChanges();
  }

  getAllReview(): Observable<Card[]> {
    return this.reviewList.valueChanges();
  }
}

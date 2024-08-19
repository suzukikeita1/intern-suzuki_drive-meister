import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './types/card';

@Injectable({ providedIn: 'root' }) // このサービスをルートに提供する

export class QuizService {
  quizList: AngularFirestoreCollection<Card>;

  constructor(private db: AngularFirestore) {
    this.quizList = this.db.collection('/quiz');
  }

  getAllQuiz(): Observable<Card[]> {
    return this.quizList.valueChanges();
  }
}

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) // このサービスをルートに提供する

export class QuizService {
  quizList: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.quizList = this.db.collection('/quiz');
  }

  getAllQuiz() {
    return this.quizList;
  }
}

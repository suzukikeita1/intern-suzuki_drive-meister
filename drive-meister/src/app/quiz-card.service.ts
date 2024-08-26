import { Injectable } from '@angular/core';
import { Card } from './types/card';

@Injectable({
  providedIn: 'root',
})
export class QuizCardService {
  private quizCards: Card[] = [];

  set setQuizCards(cards: Card[]) {
    this.quizCards = cards;
    console.log(this.quizCards);
  }

  get getQuizCards(): Card[] {
    console.log('aaa');
    return this.quizCards;
  }
}

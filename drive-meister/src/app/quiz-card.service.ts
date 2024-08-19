import { Injectable } from '@angular/core';
import { Card } from './types/card';

@Injectable({
  providedIn: 'root',
})
export class QuizCardService {
  private quizCards: Card[] = [];

  set setQuizCards(cards: Card[]) {
    this.quizCards = cards;
  }

  get getQuizCards(): Card[] {
    return this.quizCards;
  }
}

import { Injectable } from '@angular/core';
import { Card } from './types/card';

@Injectable({
  providedIn: 'root',
})
export class QuizCardService {
  private quizCards: Card[] = [];
  private reviewQuizCards: Card[] = [];

  set setQuizCards(cards: Card[]) {
    this.quizCards = cards;
  }

  get getQuizCards(): Card[] {
    return this.quizCards;
  }

  set setReviewQuizCards(cards: Card[]) {
    this.reviewQuizCards = cards;
  }

  get getReviewQuizCards(): Card[] {
    return this.reviewQuizCards;
  }
}

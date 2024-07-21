import { Injectable } from '@angular/core';
import { Card } from './types/card';

@Injectable({
  providedIn: 'root',
})
export class QuizStateService {
  private _cardState: Card[] = [];

  setCard(card: Card) {
    this._cardState = [card];
  }

  getCard(): Card | null {
    return this._cardState[0];
  }
}

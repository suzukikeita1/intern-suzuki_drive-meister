import { Injectable } from '@angular/core';
import { Card } from './types/card';

@Injectable({
  providedIn: 'root',
})
export class ShuffleCardsService {
  private shuffledCards: Card[] = []; // シャッフルされたカードデータ

  set shuffleCards(cards: Card[]) {
    this.shuffledCards = cards;
  }

  get shuffleCards(): Card[] {
    return this.shuffledCards;
  }
}

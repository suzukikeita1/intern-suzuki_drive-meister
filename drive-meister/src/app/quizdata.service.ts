import { Injectable } from '@angular/core';
import { Card } from './types/card';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class QuizDataService {
  // QuizDataServiceに現在のカードインデックスとフィルタリングされたカードのリストを保持するプロパティを追加
  currentCardIndex: number = 0;
  filteredCards: Card[] = [];

  // フィルタリングされたカードと現在のカードインデックスを設定するメソッドを追加
  setFilteredCards(cards: Card[], index: number) {
    this.filteredCards = cards;
    this.currentCardIndex = index;
  }

  // フィルタリングされたカードと現在のカードインデックスを取得するメソッドを追加
  getFilteredCard() {
    return this.filteredCards.length > 0
      ? this.filteredCards[this.currentCardIndex]
      : null;
  }
}

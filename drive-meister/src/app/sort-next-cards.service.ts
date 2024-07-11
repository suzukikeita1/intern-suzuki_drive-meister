import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortNextCardsService {
  private _displayedCardsIndices: number[] = []; // 表示されたカードのインデックスを追跡する配列

  get displayedCardsIndices(): number[] {
    return this._displayedCardsIndices;
  }

  // 表示されたカードのインデックスを追加するメソッド
  addIndex(index: number): void {
    if (!this._displayedCardsIndices.includes(index)) {
      this._displayedCardsIndices.push(index);
    }
  }

  clearIndices(): void {
    this._displayedCardsIndices = [];
  }
}

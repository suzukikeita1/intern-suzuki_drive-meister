import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizIndexService {
  private _currentCardIndex: number = 0;

  get currentCardIndex(): number {
    return this._currentCardIndex;
  }

  set currentCardIndex(value: number) {
    this._currentCardIndex = value;
  }
}

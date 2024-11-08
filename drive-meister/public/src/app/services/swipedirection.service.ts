import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwipeDirectionService {
  private directionSource = new BehaviorSubject<'correct' | 'incorrect' | null>(
    null
  );
  currentDirection = this.directionSource.asObservable();
  private directionSet = false; // directionが設定されたかどうかを追跡するプロパティ

  constructor() {}

  changeDirection(direction: 'correct' | 'incorrect') {
    if (!this.directionSet) {
      this.directionSource.next(direction);
      this.directionSet = true; // directionが設定されたことを記録
    }
  }

  resetDirection() {
    this.directionSet = false; // directionの設定をリセット
    this.directionSource.next(null); // directionをnullにリセット
  }
}

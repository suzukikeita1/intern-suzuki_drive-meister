import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { HammerModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { RedirectResultButtonComponent } from '../redirect-result-button/redirect-result-button.component';
import { Card } from '../types/card';
import { CARDS } from '../quiz-cards';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    CommonModule,
    HammerModule,
    MatButtonModule,
    RedirectResultButtonComponent,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
  animations: [
    trigger('swipeOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('* => correct', [
        animate('600ms ease-in-out', style({ transform: 'translateX(150%)' })),
      ]),
      transition('* => incorrect', [
        animate('600ms ease-in-out', style({ transform: 'translateX(-150%)' })),
      ]),
    ]),
  ],
})
export class QuizComponent implements OnInit {
  cards: Card[] = [...CARDS]; // 全カードデータ
  filteredCards: Card[] = []; // フィルタリングされたカードデータ
  currentCardIndex = 0;
  startX = 0; // タッチ開始時のX座標
  animationState: string = 'in'; // アニメーションの状態を管理するプロパティを追加

  constructor(private route: ActivatedRoute, private router: Router) {
    // タッチイベントリスナーの登録
    document.addEventListener(
      'touchstart',
      this.handleTouchStart.bind(this),
      { passive: false } // passiveをfalseに設定
    );
    document.addEventListener(
      'touchend',
      this.handleTouchEnd.bind(this),
      { passive: false } // passiveをfalseに設定
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const type = params['type']; // クエリパラメータからtypeを取得
      this.filterCards(type);
    });
  }

  filterCards(type: string) {
    // クエリパラメータに基づいてカードをフィルタリング
    this.filteredCards = this.cards.filter((card) => {
      return card.cardType === `${type}-license`;
    });
  }

  handleTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX; // タッチ開始時のX座標を記録
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // ブラウザのデフォルト動作を防止
  }

  handleTouchEnd(event: TouchEvent) {
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // ブラウザのデフォルト動作を防止

    const endX = event.changedTouches[0].clientX; // タッチ終了時のX座標を取得
    const diffX = endX - this.startX; // 開始X座標と終了X座標の差
    const swipeThreshold = 150; // スワイプとして認識する最小の距離（ピクセル）

    if (diffX > swipeThreshold) {
      // 右スワイプ
      this.changeAnimationState('correct');
    } else if (diffX < -swipeThreshold) {
      // 左スワイプ
      this.changeAnimationState('incorrect');
    }
  }

  changeAnimationState(direction: 'incorrect' | 'correct') {
    this.animationState = direction;
    setTimeout(() => {
      this.animationState = 'in'; // アニメーション状態をリセット
      // 現在のカードデータを取得
      const currentCard = this.filteredCards[this.currentCardIndex];
      // 遷移先のコンポーネントにカードデータを渡す
      this.router.navigate(['/judge-true-false'], {
        state: { card: currentCard },
      });
      this.onSwipe(); // ここでカードの要素を更新
    }, 550); // 550ミリ秒はアニメーションの時間
  }

  onSwipe() {
    // this.handleSwipe();
    this.currentCardIndex++;
    if (this.currentCardIndex >= this.filteredCards.length) {
      this.currentCardIndex = 0; // カードのリストの最後に達したら、最初に戻る
    }
  }
}

import { Component } from '@angular/core';
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
      transition('* => right', [
        animate('600ms ease-in-out', style({ transform: 'translateX(150%)' })),
      ]),
      transition('* => left', [
        animate('600ms ease-in-out', style({ transform: 'translateX(-150%)' })),
      ]),
    ]),
  ],
})
export class QuizComponent {
  cards = [
    { quiz_img: '画像1', text: 'テキスト1' },
    { quiz_img: '画像2', text: 'テキスト2' },
    { quiz_img: '画像3', text: 'テキスト3' },
    { quiz_img: '画像4', text: 'テキスト4' },
    { quiz_img: '画像5', text: 'テキスト5' },
    { quiz_img: '画像6', text: 'テキスト6' },
    { quiz_img: '画像7', text: 'テキスト7' },
    { quiz_img: '画像8', text: 'テキスト8' },
    { quiz_img: '画像9', text: 'テキスト9' },
    { quiz_img: '画像10', text: 'テキスト10' },
  ];
  currentCardIndex = 0;
  startX = 0; // タッチ開始時のX座標
  animationState: string = 'in'; // アニメーションの状態を管理するプロパティを追加

  constructor() {
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
      this.changeAnimationState('right');
    } else if (diffX < -swipeThreshold) {
      // 左スワイプ
      this.changeAnimationState('left');
    }
  }

  changeAnimationState(direction: 'left' | 'right') {
    this.animationState = direction;
    setTimeout(() => {
      this.animationState = 'in'; // アニメーション状態をリセット
      this.onSwipe(); // ここでカードの要素を更新
    }, 400); // 400ミリ秒はアニメーションの時間
  }

  onSwipe() {
    this.currentCardIndex++;
    if (this.currentCardIndex >= this.cards.length) {
      this.currentCardIndex = 0; // カードのリストの最後に達したら、最初に戻る
    }
  }
}

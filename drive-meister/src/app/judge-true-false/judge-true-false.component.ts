import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RedirectResultButtonComponent } from '../redirect-result-button/redirect-result-button.component';
import { Card } from '../types/card';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-judge-true-false',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    RedirectResultButtonComponent,
    CommonModule,
  ],
  templateUrl: './judge-true-false.component.html',
  styleUrl: './judge-true-false.component.scss',
  animations: [
    trigger('swipeOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('* => next', [
        animate('600ms ease-in-out', style({ transform: 'translateY(150%)' })),
      ]),
      transition('* => review', [
        animate('600ms ease-in-out', style({ transform: 'translateY(-150%)' })),
      ]),
    ]),
  ],
})
export class JudgeTrueFalseComponent {
  cardData: Card | null = null;
  startY = 0; // タッチ開始時のX座標
  animationState: string = 'in'; // アニメーションの状態を管理するプロパティを追加

  // 遷移先のコンポーネントのコンストラクタ内
  constructor(private router: Router, private route: ActivatedRoute) {
    // ナビゲーションからstateを取得してカードデータを使用
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.cardData = currentNavigation.extras.state['card'];
      console.log(this.cardData); // ここで取得したカードデータを使用
    }
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
    this.startY = event.touches[0].clientY; // タッチ開始時のX座標を記録
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // ブラウザのデフォルト動作を防止
  }

  handleTouchEnd(event: TouchEvent) {
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // ブラウザのデフォルト動作を防止

    const endY = event.changedTouches[0].clientY; // タッチ終了時のX座標を取得
    const diffY = endY - this.startY; // 開始X座標と終了X座標の差
    const swipeThreshold = 150; // スワイプとして認識する最小の距離（ピクセル）

    if (diffY > swipeThreshold) {
      // 上スワイプ
      this.changeAnimationState('next');
    } else if (diffY < -swipeThreshold) {
      // 下スワイプ
      this.changeAnimationState('review');
    }
  }

  changeAnimationState(direction: 'next' | 'review') {
    this.animationState = direction;
    setTimeout(() => {
      this.animationState = 'in'; // アニメーション状態をリセット
      // 遷移先のコンポーネントにカードデータを渡す
      this.router.navigate(['/'], {});
    }, 550); // 550ミリ秒はアニメーションの時間
  }
}

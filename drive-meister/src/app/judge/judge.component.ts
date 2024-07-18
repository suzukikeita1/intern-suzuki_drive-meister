import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RedirectResultButtonComponent } from '../redirect-result-button/redirect-result-button.component';
import { Card } from '../types/card';
import { ActivatedRoute } from '@angular/router';
import { HammerModule } from '@angular/platform-browser';
import { SwipeDirectionService } from '../../../swipedirection.service';
import { JudgeAnswerService } from '../../app/judge-answer.service';

import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-judge',
  standalone: true,
  imports: [
    HammerModule,
    RouterModule,
    MatCardModule,
    RedirectResultButtonComponent,
    CommonModule,
  ],
  templateUrl: './judge.component.html',
  styleUrl: './judge.component.scss',
  animations: [
    trigger('swipeOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('* => next', [
        animate('800ms ease-in-out', style({ transform: 'translateY(-220%)' })),
      ]),
      transition('* => review', [
        animate('800ms ease-in-out', style({ transform: 'translateY(350%)' })),
      ]),
    ]),
  ],
})
export class JudgeComponent implements OnInit {
  direction: 'correct' | 'incorrect' | null = null;
  cardData: Card | null = null;
  startY = 0; // タッチ開始時のY座標
  animationState: string = 'in'; // アニメーションの状態を管理するプロパティを追加
  type: string = ''; // クエリパラメータから取得したtype
  type2: string = ''; // クエリパラメータから取得したtype2

  // 遷移先のコンポーネントのコンストラクタ内
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private swipeDirectionService: SwipeDirectionService,
    private judgeAnswerService: JudgeAnswerService
  ) {
    // ナビゲーションからstateを取得してカードデータを使用
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.cardData = currentNavigation.extras.state['card'];
    }
    console.log(this.cardData); // ここで取得したカードデータを使用

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
    this.swipeDirectionService.currentDirection.subscribe(
      (direction: 'correct' | 'incorrect' | null) => {
        this.direction = direction;
        console.log(this.direction);
      }
    );

    if (this.direction !== null) {
      this.judgeAnswerService.isCorrectType(this.direction, this.cardData);
    }
    console.log(this.judgeAnswerService.results);

    this.route.queryParams.subscribe((params) => {
      this.type = params['type']; // クエリパラメータからtypeを取得
      this.type2 = params['type2']; // クエリパラメータからtype2を取得
    });
  }

  handleTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY; // タッチ開始時のY座標を記録
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // ブラウザのデフォルト動作を防止
  }

  handleTouchEnd(event: TouchEvent) {
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // ブラウザのデフォルト動作を防止

    const endY = event.changedTouches[0].clientY; // タッチ終了時のY座標を取得
    const diffY = endY - this.startY; // 開始Y座標と終了Y座標の差

    const swipeThreshold = 100; // スワイプとして認識する最小の距離（ピクセル）

    if (diffY < -swipeThreshold) {
      // 上スワイプ
      this.changeAnimationState('next');
    } else if (diffY > swipeThreshold) {
      // 下スワイプ
      this.changeAnimationState('review');
    }
  }

  changeAnimationState(newDirection: 'next' | 'review') {
    this.animationState = newDirection;

    setTimeout(() => {
      this.animationState = 'in'; // アニメーション状態をリセット
      // 遷移先のコンポーネントにカードデータを渡す
      this.router.navigate(['/quiz'], {
        queryParams: {
          type: this.type,
          type2: this.type2,
        },
      });
      this.swipeDirectionService.resetDirection();
    }, 600); // 550ミリ秒はアニメーションの時間
  }
}

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
import { SwipeDirectionService } from '../../../swipedirection.service';
import { QuizStateService } from '../QuizState.Service';

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
  startX = 0; // タッチ開始時のX座標
  animationState: string = 'in'; // アニメーションの状態を管理するプロパティを追加
  type: string = ''; // クエリパラメータから取得したtype
  type2: string = ''; // クエリパラメータから取得したtype2
  directionChanged: boolean = false; // directionが変更されたかどうかを管理するプロパティを追加

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private swipeDirectionService: SwipeDirectionService,
    private quizStateService: QuizStateService
  ) {
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
      this.type = params['type']; // クエリパラメータからtypeを取得
      this.type2 = params['type2']; // クエリパラメータからtype2を取得
      this.filterCards(this.type2);
    });

    if (
      this.router.url === '/quiz?type=work&type2=provisional' ||
      '/quiz?type=work&type2=drivers' ||
      '/quiz?type=review&type2=provisional' ||
      '/quiz?type=review&type2=drivers'
    ) {
      this.nextCard();
      // filteredCardsの要素を更新してバインドするために、Angularの変更検知をトリガーする
      console.log(this.filteredCards);
      console.log(this.quizStateService.currentCardIndex);
    }
  }

  get currentCardIndex() {
    return this.quizStateService.currentCardIndex;
  }

  nextCard() {
    this.quizStateService.currentCardIndex = Math.floor(
      Math.random() * this.filteredCards.length
    );
  }

  filterCards(type2: string) {
    // クエリパラメータに基づいてカードをフィルタリング
    this.filteredCards = this.cards.filter((card) => {
      return card.cardType === `${type2}-license`;
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

  changeAnimationState(direction: 'correct' | 'incorrect') {
    this.animationState = direction;
    if (!this.directionChanged) {
      this.animationState = direction;
      this.directionChanged = true; // directionが変更されたことを記録
      console.log('Updated animationState:', this.animationState);
    } else {
      console.log('directionは既に設定されています。');
    }
    this.swipeDirectionService.changeDirection(direction);

    setTimeout(() => {
      // 現在のカードデータを取得
      const currentCard = this.filteredCards[this.currentCardIndex];
      // 遷移先のコンポーネントにカードデータを渡す
      this.router.navigate(['/judge'], {
        state: { card: currentCard },
        queryParams: {
          type: this.type,
          type2: this.type2,
        },
      });
      this.animationState = 'in'; // アニメーション状態をリセット
    }, 550); // 550ミリ秒はアニメーションの時間
  }
}

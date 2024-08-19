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
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SwipeDirectionService } from '../../../swipedirection.service';
import { QuizIndexService } from '../quiz-index.Service';
import { ShuffleCardsService } from '../shuffle-cards.service';
import { QuizStateService } from '../quiz-state.service';
import { QuizCardService } from '../quiz-card.service';


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
  cards: Card[] = this.quizCardService.getQuizCards; // 全カードデータ
  filteredCards: Card[] = []; // フィルタリングされたカードデータ
  shuffleCards: Card[] = []; // シャッフルされたカードデータ
  startX = 0; // タッチ開始時のX座標
  animationState: string = 'in'; // アニメーションの状態を管理するプロパティを追加
  type: string = ''; // クエリパラメータから取得したtype
  type2: string = ''; // クエリパラメータから取得したtype2
  directionChanged: boolean = false; // directionが変更されたかどうかを管理するプロパティを追加
  hasShuffled = false; // shuffleメソッドの実行状態を追跡するフラグ
  cardIndex = 0; // 現在のカードのインデックス

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private swipeDirectionService: SwipeDirectionService,
    private quizIndexService: QuizIndexService,
    private shuffleCardsService: ShuffleCardsService,
    private quizStateService: QuizStateService,
    private quizCardService: QuizCardService
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
    console.log('cards', this.cards);
    this.route.queryParams.subscribe((params) => {
      this.type = params['type']; // クエリパラメータからtypeを取得
      this.type2 = params['type2']; // クエリパラメータからtype2を取得
      this.filterCards(this.type2);
    });

    const isQuizUrl =
      /^\/quiz\?type=(work|review)&type2=(provisional|drivers)$/.test(
        this.router.url
      );
    const hasNoShuffleCards = !this.shuffleCardsService.shuffleCards.length;

    if (isQuizUrl && hasNoShuffleCards) {
      this.shuffle();
      this.cardIndex = this.quizIndexService.currentCardIndex;
    }
    this.cardIndex = this.quizIndexService.currentCardIndex++;
    this.shuffleCards = this.shuffleCardsService.shuffleCards;
    if (this.shuffleCards[this.cardIndex]?.id !== undefined) {
      // idが存在する場合の処理
      this.quizStateService.setCard(this.shuffleCards[this.cardIndex]);
    }
  }

  resetShuffledCards(): void {
    this.shuffleCardsService.shuffleCards = [];
  }

  resetCurrentCardIndex(): void {
    this.quizIndexService.currentCardIndex = 0;
  }

  shuffle() {
    this.shuffleCards = [...this.filteredCards]; // フィルタリングされたカードデータをコピー
    const count = this.shuffleCards.length; //配列の件数を取得
    // Fisher-Yates (Knuth) シャッフルアルゴリズムでカードをシャッフル
    for (let i = count - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffleCards[i], this.shuffleCards[j]] = [
        this.shuffleCards[j],
        this.shuffleCards[i],
      ]; // 要素の交換
    }
    this.shuffleCardsService.shuffleCards = this.shuffleCards; // シャッフルされたカードをセッターを通して保存
  }

  filterCards(type2: string) {
    console.log(this.cards);
    // クエリパラメータに基づいてカードをフィルタリング
    this.filteredCards = this.cards.filter((card) => {
      return card.card_type === `${type2}-license`;
    });
    console.log(this.filteredCards);
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
    } else {
    }
    this.swipeDirectionService.changeDirection(direction);

    setTimeout(() => {
      // 遷移先のコンポーネントにカードデータを渡す
      this.router.navigate(['/judge'], {
        queryParams: {
          type: this.type,
          type2: this.type2,
        },
      });
      this.animationState = 'in'; // アニメーション状態をリセット
    }, 550); // 550ミリ秒はアニメーションの時間
  }
}

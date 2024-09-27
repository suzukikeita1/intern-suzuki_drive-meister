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
import { RedirectResultButtonComponent } from '../../components/redirect-result-button/redirect-result-button.component';
import { Card } from '../../types/card';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SwipeDirectionService } from '../../services/swipedirection.service';
import { QuizIndexService } from '../../services/quiz-index.service';
import { ShuffleCardsService } from '../../services/shuffle-cards.service';
import { QuizStateService } from '../../services/quiz-state.service';
import { QuizCardService } from '../../services/quiz-card.service';


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
      { passive: true } // passiveをfalseに設定
    );
    document.addEventListener(
      'touchend',
      this.handleTouchEnd.bind(this),
      { passive: true } // passiveをfalseに設定
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.type = params['type']; // クエリパラメータからtypeを取得
      this.type2 = params['type2']; // クエリパラメータからtype2を取得
    });

    if (this.type === 'review') {
      this.cards = this.quizCardService.getReviewQuizCards;
    }

    this.filterCards(this.type2); // クエリパラメータに基づいてカードをフィルタリング(仮免or本免)

    const isQuizUrl =
    /^\/quiz\?type=(work|review)&type2=(provisional|drivers)$/.test(
      this.router.url
    );
    let hasNoShuffleCards = !this.shuffleCardsService?.shuffleCards?.length;

    if (isQuizUrl && hasNoShuffleCards) {
      this.shuffle();
      this.cardIndex = this.quizIndexService.currentCardIndex;
    }

    this.cardIndex = this.quizIndexService.currentCardIndex++;
    this.shuffleCards = this.shuffleCardsService.shuffleCards;

    // シャッフルされたカードデータが存在し、idプロパティが定義されている場合
    if (this.shuffleCards[this.cardIndex]?.id !== undefined) {
      console.log(this.cardIndex);
      console.log(this.shuffleCards[this.cardIndex]);
      // idが存在する場合の処理
      this.quizStateService.setCard(this.shuffleCards[this.cardIndex]);
    }
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
    // クエリパラメータに基づいてカードをフィルタリング
    this.filteredCards = this.cards.filter((card) => {
      return card.card_type === `${type2}-license`;
    });
  }

  handleTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX; // タッチ開始時のX座標を記録
    event.stopPropagation(); // イベントの伝播を停止
  }

  handleTouchEnd(event: TouchEvent) {
    event.stopPropagation(); // イベントの伝播を停止

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

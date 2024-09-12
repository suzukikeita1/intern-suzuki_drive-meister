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
import { QuizIndexService } from '../quiz-index.Service';
import { QuizStateService } from '../quiz-state.service';
import { AddReviewRemoveReviewService } from '../add-review_remove-review.service';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    AngularFirestoreModule,
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
    private judgeAnswerService: JudgeAnswerService,
    private quizIndexService: QuizIndexService,
    private quizStateService: QuizStateService,
    private addReviewRemoveReviewService: AddReviewRemoveReviewService,
    private db: AngularFirestore
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
    this.swipeDirectionService.currentDirection.subscribe(
      (direction: 'correct' | 'incorrect' | null) => {
        this.direction = direction;
      }
    );

    this.cardData = this.quizStateService.getCard();

    if (this.direction !== null) {
      this.judgeAnswerService.isCorrectType(this.direction, this.cardData);
    }

    this.route.queryParams.subscribe((params) => {
      this.type = params['type']; // クエリパラメータからtypeを取得
      this.type2 = params['type2']; // クエリパラメータからtype2を取得
    });
  }

  handleTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY; // タッチ開始時のY座標を記録
    event.stopPropagation(); // イベントの伝播を停止
  }

  handleTouchEnd(event: TouchEvent) {
    event.stopPropagation(); // イベントの伝播を停止

    const endY = event.changedTouches[0].clientY; // タッチ終了時のY座標を取得
    const diffY = endY - this.startY; // 開始Y座標と終了Y座標の差

    const swipeThreshold = 100; // スワイプとして認識する最小の距離（ピクセル）

    if (diffY < -swipeThreshold) {
      // 上スワイプ
      this.changeAnimationState('next');
    } else if (diffY > swipeThreshold && this.type === 'work') {
      // 下スワイプ 
      this.addReviewRemoveReviewService.addCardToReview(this.cardData?.id);
      this.changeAnimationState('review');
    } else if (diffY > swipeThreshold && this.type === 'review') {
      // 下スワイプで復習からはずす
      this.addReviewRemoveReviewService.removeCardFromReview(this.cardData?.id);
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

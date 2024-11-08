import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QuizComponent } from '../../pages/quiz/quiz.component';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { Card } from '../../types/card';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { QuizService } from '../../services/quiz.service';
import { QuizCardService } from '../../services/quiz-card.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    QuizComponent,
    RouterModule,
    AngularFirestoreModule,
    MatBadgeModule
  ],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss',
})
export class HomeCardComponent implements OnInit {
  constructor(private quizService: QuizService, private quizCardService: QuizCardService, private db: AngularFirestore, private fireauth: AngularFireAuth, private authService: AuthService ) {}
  cards: Card[] = [];
  reviewCards: Card[] = [];
  provisionalLicenseCount: number | undefined;
  driversLicenseCount: number | undefined;

  @Input() cardType: string = '';

  async ngOnInit() {
    (await this.quizService.getAllQuiz()).subscribe((data) => {
      this.cards = data;
      this.quizCardService.setQuizCards = this.cards;
    });
    await this.authService.getUserId().then(async (userId) => {
      if (userId) {
        (await this.authService.getProvisionalLicenseCount()).subscribe((data) => {
          this.provisionalLicenseCount = data;
        });

        (await this.authService.getDriversLicenseCount()).subscribe((data) => {
          this.driversLicenseCount = data;
        });

      } else {
        console.log('ユーザーIDを取得できませんでした');
      }
    }).catch((error) => {
      console.error('ユーザーIDの取得中にエラーが発生しました', error);
    });
  }

}

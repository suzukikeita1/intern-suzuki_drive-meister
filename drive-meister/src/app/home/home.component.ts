import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { MyPageComponent } from '../my-page/my-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Card } from '../types/card';

import { QuizService } from '../quiz.service';
import { ShuffleCardsService } from '../shuffle-cards.service';
import { QuizCardService } from '../quiz-card.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    HomeCardComponent,
    HomeHeaderComponent,
    MyPageComponent,
    AngularFirestoreModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private quizSservice: QuizService,private shuffleCardsService: ShuffleCardsService,private quizCardService: QuizCardService) {}
  cards: Card[] = [];

  ngOnInit(): void {
    this.quizSservice.getAllQuiz().subscribe((data) => {
      this.cards = data;
      this.quizCardService.setQuizCards = this.cards;
    });
  }
}



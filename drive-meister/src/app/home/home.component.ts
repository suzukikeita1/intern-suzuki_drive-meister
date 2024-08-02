import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { MyPageComponent } from '../my-page/my-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Card } from '../types/card';
import { CARDS } from '../quiz-cards';

import { QuizService } from '../quiz.service';

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
  constructor(private quizSservice: QuizService) {}
  cards: Card[] = [...CARDS];

  ngOnInit(): void {
    console.log(this.quizSservice.getAllQuiz());
  }

  // async addCardsToFirestore() {
  //   try {
  //     const cardsCollection = this.firestore.collection('cards');
  //     for (const card of this.cards) {
  //       await cardsCollection.add(card);
  //     }
  //     console.log('All cards have been added to Firestore');
  //   } catch (error) {
  //     console.error('Error adding documents: ', error);
  //   }
  // }

}



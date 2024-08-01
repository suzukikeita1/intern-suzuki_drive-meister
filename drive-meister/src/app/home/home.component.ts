import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { MyPageComponent } from '../my-page/my-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { Card } from '../types/card';
import { CARDS } from '../quiz-cards';
import { environment } from '../../environments/environment';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { app } from '../../../server';
import { appConfig } from '../app.config';
import { provideAuth } from '@angular/fire/auth';
import { provideStorage } from '@angular/fire/storage';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { routes } from '../app.routes';
import { ApplicationConfig } from '@angular/core';

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
  constructor(private firestore: AngularFirestore) {}

  cards: Card[] = [...CARDS];

  ngOnInit(): void {
    this.addCardsToFirestore();
  }

  async addCardsToFirestore() {
    try {
      const cardsCollection = this.firestore.collection('cards');
      for (const card of this.cards) {
        await cardsCollection.add(card);
      }
      console.log('All cards have been added to Firestore');
    } catch (error) {
      console.error('Error adding documents: ', error);
    }
  }

}



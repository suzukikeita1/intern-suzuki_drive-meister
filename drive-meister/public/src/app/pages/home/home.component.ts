import { Component } from '@angular/core';
import { HomeCardComponent } from '../../components/home-card/home-card.component';
import { HomeHeaderComponent } from '../../components/home-header/home-header.component';
import { MyPageComponent } from '../my-page/my-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

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
export class HomeComponent {
  
}



import { Component } from '@angular/core';
import { HomeAnswerComponent } from '../home-answer/home-answer.component';
import { HomeReviewComponent } from '../home-review/home-review.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    HomeAnswerComponent,
    HomeReviewComponent,
    HomeHeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

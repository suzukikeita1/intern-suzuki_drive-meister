import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-review',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home-review.component.html',
  styleUrl: './home-review.component.scss',
})
export class HomeReviewComponent {}

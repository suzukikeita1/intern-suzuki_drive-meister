import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-answer',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home-answer.component.html',
  styleUrl: './home-answer.component.scss',
})
export class HomeAnswerComponent {}

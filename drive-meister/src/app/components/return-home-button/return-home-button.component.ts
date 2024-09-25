import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JudgeAnswerService } from '../../services/judge-answer.service';
import { AddReviewRemoveReviewService } from '../../services/add-review_remove-review.service';

@Component({
  selector: 'app-return-home-button',
  standalone: true,
  imports: [MatButtonModule, HomeComponent, RouterModule, CommonModule],
  templateUrl: './return-home-button.component.html',
  styleUrl: './return-home-button.component.scss',
})
export class ReturnHomeButtonComponent {
  constructor(private judgeAnswerService: JudgeAnswerService,private addReviewRemoveReviewService: AddReviewRemoveReviewService) {}

  // results配列を初期化するメソッド
  resetResults() {
    this.judgeAnswerService.results = [];
  }

  // addReviewCards配列を初期化するメソッド
  resetAddReviewCards() {
    this.addReviewRemoveReviewService.addReviewCards = [];
  }
}

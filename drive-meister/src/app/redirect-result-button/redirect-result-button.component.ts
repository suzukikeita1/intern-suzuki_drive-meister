import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-redirect-result-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule, ResultComponent],
  templateUrl: './redirect-result-button.component.html',
  styleUrl: './redirect-result-button.component.scss',
})
export class RedirectResultButtonComponent {}

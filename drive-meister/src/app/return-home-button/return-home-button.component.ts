import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-return-home-button',
  standalone: true,
  imports: [MatButtonModule, HomeComponent, RouterModule, CommonModule],
  templateUrl: './return-home-button.component.html',
  styleUrl: './return-home-button.component.scss',
})
export class ReturnHomeButtonComponent {}

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '../home/home.component';
import { HomeCardComponent } from '../home-card/home-card.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-page-close',
  standalone: true,
  imports: [
    MatCardModule,
    HomeCardComponent,
    HomeHeaderComponent,
    HomeComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './my-page-close.component.html',
  styleUrl: './my-page-close.component.scss',
})
export class MyPageCloseComponent {}

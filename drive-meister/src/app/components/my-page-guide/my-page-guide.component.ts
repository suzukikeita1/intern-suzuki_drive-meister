import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '../home/home.component';
import { HomeCardComponent } from '../home-card/home-card.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { GuideComponent } from '../guide/guide.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-page-guide',
  standalone: true,
  imports: [
    MatCardModule,
    HomeCardComponent,
    HomeHeaderComponent,
    GuideComponent,
    HomeComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './my-page-guide.component.html',
  styleUrl: './my-page-guide.component.scss',
})
export class MyPageGuideComponent {}

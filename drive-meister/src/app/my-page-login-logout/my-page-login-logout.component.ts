import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '../home/home.component';
import { HomeCardComponent } from '../home-card/home-card.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { LoginComponent } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-page-login-logout',
  standalone: true,
  imports: [
    MatCardModule,
    HomeCardComponent,
    HomeHeaderComponent,
    LoginComponent,
    HomeComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './my-page-login-logout.component.html',
  styleUrl: './my-page-login-logout.component.scss',
})
export class MyPageLoginLogoutComponent {
  // ボタンの表示状態を管理するプロパティ
  isButtonVisible = true;
}

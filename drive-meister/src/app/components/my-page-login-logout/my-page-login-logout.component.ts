import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '../../pages/home/home.component';
import { HomeCardComponent } from '../home-card/home-card.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
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
    RegisterComponent,
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

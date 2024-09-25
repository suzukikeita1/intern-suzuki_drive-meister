import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '../home/home.component';
import { HomeCardComponent } from '../home-card/home-card.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { MyPageCloseComponent } from '../my-page-close/my-page-close.component';
import { MyPageGuideComponent } from '../my-page-guide/my-page-guide.component';
import { MyPageLoginLogoutComponent } from '../my-page-login-logout/my-page-login-logout.component';
import { LoginComponent } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    MatCardModule,
    HomeCardComponent,
    LoginComponent,
    HomeHeaderComponent,
    HomeComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    MyPageCloseComponent,
    MyPageGuideComponent,
    MyPageLoginLogoutComponent,
  ],
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.scss',
})
export class MyPageComponent {}

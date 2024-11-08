import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '../home/home.component';
import { HomeCardComponent } from '../../components/home-card/home-card.component';
import { HomeHeaderComponent } from '../../components/home-header/home-header.component';
import { MyPageCloseComponent } from '../../components/my-page-close/my-page-close.component';
import { MyPageGuideComponent } from '../../components/my-page-guide/my-page-guide.component';
import { MyPageLoginLogoutComponent } from '../../components/my-page-login-logout/my-page-login-logout.component';
import { LoginComponent } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
export class MyPageComponent implements OnInit {
  currentUser: string | null | undefined = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      if (user?.email){
        this.currentUser = user?.email;
      } else {
        this.currentUser = 'マイページ';
      }
    });

  }
}

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyPageComponent } from './my-page/my-page.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'my-page', component: MyPageComponent },
];

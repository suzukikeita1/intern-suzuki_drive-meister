import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyPageComponent } from './pages/my-page/my-page.component';
import { GuideComponent } from './pages/guide/guide.component';
import { LoginComponent } from './pages/login/login.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { JudgeComponent } from './pages/judge/judge.component';
import { ResultComponent } from './pages/result/result.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'my-page', component: MyPageComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'my-page/login', component: LoginComponent },
  { path: 'my-page/register', component: RegisterComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'judge', component: JudgeComponent },
  { path: 'result', component: ResultComponent },
];

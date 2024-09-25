import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { GuideComponent } from './components/guide/guide.component';
import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { JudgeComponent } from './components/judge/judge.component';
import { ResultComponent } from './components/result/result.component';
import { RegisterComponent } from './components/register/register.component';

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

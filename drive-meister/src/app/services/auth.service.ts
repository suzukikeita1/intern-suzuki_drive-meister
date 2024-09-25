import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // メールアドレス・パスワードでのログイン
  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['/home']);
      }).catch(error => {
        alert(error.message);
      });
  }

  // メールアドレス・パスワードでの登録
  register(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['/home']);
      }).catch(error => {
        alert(error.message);
      });
  }

  // ログアウト
  logout() {
    return this.fireauth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      alert(error.message);
    });
  }

  // ユーザーの取得
  getUser() {
    return this.fireauth.authState;
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router, private db: AngularFirestore) {}

  private addUserToFirestore(email: string, password: string) {
    return this.db.collection('user').add({ email, password });
  }

  private handleError(error: any) {
    alert(error.message);
  }

  // メールアドレス・パスワードでのログイン
  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password)
  }

  // メールアドレス・パスワードでの登録
  register(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // ユーザー登録が成功した場合の処理
        console.log('ユーザー登録成功:', userCredential);
        // Firestoreにユーザー情報を追加
        return this.addUserToFirestore(email, password).then(() => {
            console.log('Firestoreにユーザー情報を追加しました');
        });
    })
    .catch((error) => {
        // エラーが発生した場合の処理
        console.error('エラー:', error);
        throw error; // 必要に応じてエラーを再スロー
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

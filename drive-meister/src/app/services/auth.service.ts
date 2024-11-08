import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router, private db: AngularFirestore) {}

  private userDocId: string = '';

  // メールアドレス・パスワードでのログイン
  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password)
  }

  // メールアドレス・パスワードでの登録
  register(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Firestoreにユーザー情報を追加
        const userID = userCredential.user?.uid;
        const userDoc = {
        email: userCredential.user?.email,
        };
        this.db.collection('user').doc(userID).set(userDoc);
    })
    .catch((error) => {
        // エラーが発生した場合の処理
        console.error('エラー:', error);
        throw error;
    });
  }

  // ログアウト
  logout() {
    return this.fireauth.signOut().then(() => {
      this.router.navigate(['/my-page']);
    }).catch(error => {
      alert(error.message);
    });
  }

  // ユーザーの取得
  getUser() {
    return this.fireauth.authState;
  }

  // ユーザーIDの取得
  async getUserId(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      try {
        subscription = this.fireauth.authState.subscribe({
          next: (user) => {
            if (user) {
              this.userDocId = user.uid;
              resolve(user.uid);
            } else {
              resolve(null);
            }
          },
          error: (error) => {
            reject(`ユーザーIDの取得中にエラーが発生しました: ${error}`);
          },
          complete: () => {
            if (subscription) {
              subscription.unsubscribe();
            }
          }
        });
      } catch (error) {
        reject(`予期しないエラーが発生しました: ${error}`);
      }
    });
  }

  //仮免復習問題の件数を取得
  async getProvisionalLicenseCount(): Promise<Observable<number>> {
    return this.db.collection('user').doc(this.userDocId).collection('user_review', ref => ref.where('card_type', '==', 'provisional-license'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.length)
    );
  }

  //本免復習問題の件数を取得
  async getDriversLicenseCount(): Promise<Observable<number>> {
    return this.db.collection('user').doc(this.userDocId).collection('user_review', ref => ref.where('card_type', '==', 'drivers-license'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.length)
    );
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewCountService {
  constructor(private firestore: AngularFirestore) {}
  
  getProvisionalLicenseCount(): Observable<number> {
    return this.firestore.collection('user_review', ref => ref.where('card_type', '==', 'provisional-license'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.length)
    );
  }
  getDriversLicenseCount(): Observable<number> {
    return this.firestore.collection('user_review', ref => ref.where('card_type', '==', 'drivers-license'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.length)
    );
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AddReviewRemoveReviewService {
    private addReviewCards: number[] = []; // レビューに追加したいカードデータ
    private removeReviewCards: number[] = []; // レビューから削除したいカードデータ

    addCardToReview(cardId: number | undefined): void {
        if (cardId !== undefined && !this.addReviewCards.includes(cardId)) {
            this.addReviewCards.push(cardId);
        }
        console.log(this.addReviewCards);
    }

    removeCardFromReview(cardId: number | undefined): void {
        if (cardId !== undefined && !this.removeReviewCards.includes(cardId)) {
            this.removeReviewCards.push(cardId);
        }
        console.log(this.removeReviewCards);
    }

    get getAddReviewCards(): number[] {
        return this.addReviewCards;
    }

    get getRemoveReviewCards(): number[] {
        return this.removeReviewCards;
    }

    initializeReviewCards() {
        this.addReviewCards = [];
        this.removeReviewCards = [];
    }

}

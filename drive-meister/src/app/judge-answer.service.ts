import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JudgeAnswerService {
  // 結果を格納するための配列プロパティ
  results: boolean[] = [];

  // directionがcardData?.CorrectTypeと等しいかどうかを判断するメソッド
  isCorrectType(
    direction: 'correct' | 'incorrect' | null,
    cardData: { CorrectType?: 'correct' | 'incorrect' } | null
  ): boolean {
    // cardDataがnullまたはCorrectTypeがundefinedの場合、falseを返す
    if (!cardData || cardData.CorrectType === undefined) {
      this.results.push(false); // 結果を配列に追加
      return false;
    }
    // directionとcardData.CorrectTypeが等しいかどうかを判断し、結果を配列に追加
    const result = direction === cardData.CorrectType;
    this.results.push(result);
    return result;
  }
}

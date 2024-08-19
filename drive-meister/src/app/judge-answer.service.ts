import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JudgeAnswerService {
  // 結果を格納するための配列プロパティ
  results: boolean[] = [];

  // directionがcardData?.correct_typeと等しいかどうかを判断するメソッド
  isCorrectType(
    direction: 'correct' | 'incorrect' | null,
    cardData: { correct_type?: 'correct' | 'incorrect' } | null
  ): boolean {
    // cardDataがnullまたはcorrect_typeがundefinedの場合、falseを返す
    if (!cardData || cardData.correct_type === undefined) {
      this.results.push(false); // 結果を配列に追加
      return false;
    }
    // directionとcardData.correct_typeが等しいかどうかを判断し、結果を配列に追加
    const result = direction === cardData.correct_type;
    this.results.push(result);
    return result;
  }
}

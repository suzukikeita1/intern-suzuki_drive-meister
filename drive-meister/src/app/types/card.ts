export interface Card {
  quiz_img: string;
  text: string;
  CorrectType: 'correct' | 'incorrect'; // 問題の正解が⚪︎か×かを判別するプロパティ
  cardType: 'provisional-license' | 'drivers-license'; // カードの種類を判別するプロパティ
  isAddedToReview: boolean; // 復習に追加されているかどうかを判断するプロパティ
  explanation: string; // 解説テキストを保持する新しいプロパティ
}

export interface Card {
  id: number; // カードのIDを保持する新しいプロパティ
  image: string;
  text: string;
  correct_type: 'correct' | 'incorrect'; // 問題の正解が⚪︎か×かを判別するプロパティ
  card_type: 'provisional-license' | 'drivers-license'; // カードの種類を判別するプロパティ
  isAddedToReview: boolean; // 復習に追加されているかどうかを判断するプロパティ
  explanation: string; // 解説テキストを保持する新しいプロパティ
}

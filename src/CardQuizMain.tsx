import FlashcardList from "./Components/FlashcardList";
import { useState } from "react";

export interface FlashCardType {
  id: number;
  question: string;
  answer: string;
  wrongOptions: string[];
}

const sampleFlashCards: FlashCardType[] = [
  {
    id: 1,
    question: "What is 3+5?",
    answer: "8",
    wrongOptions: ["2", "5", "9"]
  },
  {
    id: 2,
    question: "What is 2+2?",
    answer: "4",
    wrongOptions: ["2", "5", "9"]
  }
];

export default function CardQuizMain() {
  const [flashCards, flashCardsHandler] = useState(sampleFlashCards);
  return (
    <div>
      <FlashcardList flashCards={flashCards} />
    </div>
  );
}

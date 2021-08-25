import FlashcardList from "./Components/FlashcardList";
import { useState, useEffect } from "react";

export interface FlashCardType {
  id: number;
  question: string;
  answer: string;
  wrongOptions: string[];
}

const decodeString = (str: string) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};

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

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium")
      .then((response) => response.json())
      .then((data) =>
        flashCardsHandler(
          data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              wrongOptions: options.sort(() => Math.random() - 0.5)
            };
          })
        )
      );
  }, []);

  return (
    <div>
      <FlashcardList flashCards={flashCards} />
    </div>
  );
}

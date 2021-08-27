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

export default function CardQuizMain({ APIurl, onError }) {
  const [flashCards, flashCardsHandler] = useState([]);

  useEffect(() => {
    const fetchAPI = async (url: string) => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        //cleans data and formats it to fit into flashcard format
        const flashCards = data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a: string) =>
              decodeString(a)
            ),
            answer
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            wrongOptions: options.sort(() => Math.random() - 0.5)
          };
        });

        //updates flashcard state
        flashCardsHandler(flashCards);
      } catch (e) {
        onError();
        console.log("failed fetch, check fetch of flashcards");
      }
    };

    fetchAPI(APIurl);
  }, [APIurl, onError]);

  return (
    <div className="container">
      <FlashcardList flashCards={flashCards} />
    </div>
  );
}

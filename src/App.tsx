import "./styles.css";
import CardQuizMain from "./CardQuizMain";
import FlashCardSelectorForm from "./Components/FlashCardSelectorForm";
import { useState } from "react";

export default function App() {
  const [APIurl, APIurlHandler] = useState(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium"
  );

  const apiSelectorHandler = (category, amount, difficulty, e) => {
    e.preventDefault();
    const categoryID = category.current.value;
    const numQuestions = amount.current.value;
    const questionDifficulty = !difficulty.current.value
      ? ""
      : `&difficulty=${difficulty.current.value}`;
    APIurlHandler(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryID}${questionDifficulty}`
    );
  };

  return (
    <div className="app_container">
      <FlashCardSelectorForm onSelection={apiSelectorHandler} />
      <CardQuizMain APIurl={APIurl} />
    </div>
  );
}

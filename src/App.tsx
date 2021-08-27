import "./styles.css";
import CardQuizMain from "./CardQuizMain";
import FlashCardSelectorForm from "./Components/FlashCardSelectorForm";
import { useState } from "react";

export default function App() {
  const [APIurl, APIurlHandler] = useState<string>();
  const [fetchError, fetchErrorHandler] = useState(false);

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

  const errorHandler = () => {
    fetchErrorHandler(true);
  };

  return (
    <div className="app_container">
      {fetchError ? (
        <h1>Website is currently not working, please come back later</h1>
      ) : (
        <div>
          <FlashCardSelectorForm
            onSelection={apiSelectorHandler}
            onError={errorHandler}
          />
          {APIurl ? (
            <CardQuizMain APIurl={APIurl} onError={errorHandler} />
          ) : (
            <h1>Click Generate to Create Flashcards!</h1>
          )}
        </div>
      )}
    </div>
  );
}

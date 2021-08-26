import { FlashCardType } from "../CardQuizMain";
import { useEffect, useState } from "react";

export default function FlashCardSelectorForm() {
  const [quizCategoriesObj, quizCategoriesObjHandler] = useState([]);

  useEffect(() => {
    const fetchJSON = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");
      const triviaCategories = await response.json();

      quizCategoriesObjHandler(triviaCategories.trivia_categories);
    };

    fetchJSON();
  }, []);

  return (
    <form>
      <select>
        <option>Volvo</option>
        <option>Saab</option>
        <option>Fiat</option>
        <option>Audi</option>
      </select>
    </form>
  );
}

import { useEffect, useState, useRef } from "react";

export default function FlashCardSelectorForm({ onSelection }) {
  const [quizCategoriesObj, quizCategoriesObjHandler] = useState([]);
  const categoryEl = useRef();
  const numberEl = useRef();
  const difficultyEl = useRef();

  useEffect(() => {
    const fetchJSON = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      quizCategoriesObjHandler(data.trivia_categories);
    };
    fetchJSON();
  }, []);

  //https://opentdb.com/api.php?amount=10&category=9

  return (
    <div className="navbar_container">
      <form
        className="navbar_form"
        onSubmit={(e) => onSelection(categoryEl, numberEl, difficultyEl, e)}
      >
        <label htmlFor="Category">Category</label>
        <select ref={categoryEl}>
          {quizCategoriesObj.map((categories) => {
            return (
              <option key={categories.id} value={categories.id}>
                {categories.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="Difficulty">Difficulty</label>
        <select ref={difficultyEl}>
          <option key="AnyDifficulty" value="">
            Any Difficulty
          </option>
          <option key="easy" value="easy">
            Easy
          </option>
          <option key="medium" value="medium">
            Medium
          </option>
          <option key="hard" value="hard">
            Hard
          </option>
        </select>
        <label htmlFor="Amount">Amount</label>
        <input
          type="number"
          id="amount"
          min="1"
          step="1"
          defaultValue="10"
          ref={numberEl}
        />
        <input type="submit" value="Generate" />
      </form>
    </div>
  );
}

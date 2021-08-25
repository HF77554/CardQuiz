import { useState } from "react";

export default function Flashcard({ flashcard }) {
  const [flip, flipHandler] = useState(true);
  return (
    <div
      className={`card ${flip ? "" : "flip"}`}
      onClick={() => flipHandler(!flip)}
    >
      <div className="front">
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.wrongOptions.map((option: string) => {
            return (
              <div
                key={`${flashcard.id}_${option}`}
                className="flashcard-option"
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back">{flashcard.answer}</div>
    </div>
  );
}

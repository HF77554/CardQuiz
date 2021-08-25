import { useState, useRef, useEffect } from "react";

export default function Flashcard({ flashcard }) {
  const [flip, flipHandler] = useState(true);
  const [height, setHeight] = useState(100);

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [flashcard.question]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? "" : "flip"}`}
      style={{ height: height }}
      onClick={() => flipHandler(!flip)}
    >
      <div className="front" ref={frontEl}>
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
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
}

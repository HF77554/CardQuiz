import Flashcard from "./Flashcard";
import { FlashCardType } from "../CardQuizMain";

export default function FlashcardList({ flashCards }) {
  return (
    <div className="card-grid">
      {flashCards.map((card: FlashCardType) => (
        <Flashcard key={card.id} flashcard={card} />
      ))}
    </div>
  );
}

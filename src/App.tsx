import "./styles.css";
import CardQuizMain from "./CardQuizMain";
import FlashCardSelectorForm from "./Components/FlashCardSelectorForm";

export default function App() {
  return (
    <div>
      <FlashCardSelectorForm />
      <CardQuizMain />
    </div>
  );
}

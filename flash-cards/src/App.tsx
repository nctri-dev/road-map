import { useEffect, useMemo, useRef, useState } from "react";
import { adjustFontSize } from "./libs/utils";
import data from "./libs/data.json";

import "./App.css";

type DataState = {
  name: string;
  description: string;
};

type CardType = "name" | "description";

const arrData: DataState[] = data;

function App() {
  const [progressing, setProgressing] = useState(0);
  const total = useRef(20);
  const [currentCard, setCurrentCard] = useState<DataState>(arrData[0]);
  const [currentCardType, setCurrentCardType] = useState<CardType>("name");

  const numberProgressing = useMemo(() => progressing + 1, [progressing]);

  const completionStatus = useMemo(
    () => ((numberProgressing / total.current) * 100).toFixed(0) + "%",
    [numberProgressing]
  );

  const fontSize = (text: string) =>
    adjustFontSize(text, { min: 16, max: 36 }) + "px";

  const handleNext = () => {
    if (progressing < arrData.length) setProgressing((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (progressing > 0) setProgressing((prev) => prev - 1);
  };

  const toggleAnswer = () => {
    if (currentCardType === "name") setCurrentCardType("description");
    else setCurrentCardType("name");
  };

  useEffect(() => {
    setCurrentCard(arrData[progressing]);
    setCurrentCardType("name");
  }, [progressing]);

  const toggleText = useMemo(
    () => (currentCardType === "name" ? "Show Answer" : "Hide Answer"),
    [currentCardType]
  );

  const classCards =
    currentCardType === "description" ? "cards isFlipped" : "cards";

  return (
    <main>
      <div className="flash-cards">
        <h2>Flash Cards</h2>
        <div className="progress-bar">
          <div className="bar" style={{ width: completionStatus }}>
            <span className="completion-status">{completionStatus}</span>
          </div>

          <span className="question-progress">
            {numberProgressing} of {total.current}
          </span>
        </div>
        <div key={currentCard.name} className={classCards}>
          <div className="card">
            <div
              className="card-front"
              style={{
                fontSize: fontSize(currentCard.name),
              }}
            >
              {currentCard.name}
            </div>
            <div
              className="card-back"
              style={{
                fontSize: fontSize(currentCard.description),
              }}
            >
              {currentCard.description}
            </div>
          </div>
          <div className="pagination">
            <button
              id="previous"
              disabled={numberProgressing <= 1}
              onClick={handlePrev}
            >
              Previous
            </button>
            <button id="toggle-answer" onClick={toggleAnswer}>
              {toggleText}
            </button>
            <button
              id="next"
              disabled={numberProgressing >= arrData.length}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

import React, {useState} from "react";
import Settings from "../settings/Settings";
import Board from "../board/Board";
import Stopwatch from "../stopwatch/Stopwatch";
import "./Game.css";
import Finish from "../finish/Finish";

export default function Game() {

  const [boardSize, setBoardSize] = useState(null);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  function generateBoard(boardSize) {
    setBoardSize(boardSize)
  }

  function resetGame() {
    setIsTimeRunning(false);
    setIsGameFinished(false);
    setBoardSize(null)
  }

  function checkGameState(gameFinished) {
    if (!isTimeRunning) {
      setIsTimeRunning(true);
    }

    if (gameFinished) {
      setIsTimeRunning(false);
      setIsGameFinished(true);
    }
  }

  return (
    <div id="game">
      {(() => {
        // If the board size has not yet been chosen, render the settings page.
        if (!boardSize) {
          return <Settings onBoardSizeButtonClick={(clickedBoardSize) => generateBoard(clickedBoardSize)}></Settings>
        } else {
          // If the board size has been chosen, render the board with the chosen size.
          return (
            <>
              <Stopwatch isTimeRunning={isTimeRunning}></Stopwatch>

              {(() => {
                if (isGameFinished) {
                  // If the game is finished.
                  return <Finish></Finish>;
                } else {
                  // If the game is still going.
                  return <Board boardSize={boardSize} bubbleUpCardFlipEvent={checkGameState}></Board>;
                }
              })()}
              <button type="button" id="go-back-btn" className="nes-btn is-primary" onClick={resetGame}>Go Back</button>
            </>
          )
        }
      })()}
    </div>
  )
}

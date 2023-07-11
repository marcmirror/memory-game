import React from "react";
import './Settings.css';

export default function Settings({onBoardSizeButtonClick}) {

  return (
    <div id="settings-container" className="nes-container is-rounded">
      <p id="settings-title">Choose the board size</p>

      <div id="settings-buttons" className="item">
        <button type="button" className="nes-btn is-success" onClick={() => onBoardSizeButtonClick(4)}>4x4</button>
        <button type="button" className="nes-btn is-warning" onClick={() => onBoardSizeButtonClick(6)}>6x6</button>
        <button type="button" className="nes-btn is-error" onClick={() => onBoardSizeButtonClick(8)}>8x8</button>
      </div>
    </div>
  );

}

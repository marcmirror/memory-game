import sound from "./assets/sound/lofi-piano.wav";
import './assets/css/nes.min.css';
import './App.css';
import Game from './components/game/Game';

export default function App() {

  const backgroundMusic = setupMusic();

  function toggleMusic(event) {
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch(reason => console.error(reason));
      event.currentTarget.classList.toggle('music-icon-on');
    } else {
      backgroundMusic.pause();
      event.currentTarget.classList.toggle('music-icon-on');
    }
  }

  function setupMusic() {
    const backgroundMusic = new Audio(sound);
    backgroundMusic.volume = 0.25;
    backgroundMusic.loop = true;

    return backgroundMusic;
  }

  return (
    <div className="app">
      <span className="music-icon-off" onClick={toggleMusic}></span>
      <h1>Memory Game</h1>
      <h5>by Marc</h5>

      <Game></Game>
    </div>
  );
}

import {useEffect, useState} from "react";
import './Stopwatch.css';

export default function Stopwatch({isTimeRunning}) {

  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isTimeRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimeRunning]);

  return (
    <div id="stopwatch">
      <span id="stopwatch-text">Elapsed time:</span>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
      :
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </div>
  );

}

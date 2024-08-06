import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      clearInterval(intervalRef.current);
      setIsActive(false);
    }
  }, [timeLeft, isActive]);

  const startTimer = () => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    setTimeLeft(totalSeconds);
    setIsActive(true);
    setIsPaused(false);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseResumeTimer = () => {
    if (isPaused) {
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setMinutes(0);
    setSeconds(0);
    setTimeLeft(0);
    setIsActive(false);
    setIsPaused(false);
  };

  const formatTime = (time) => {
    const getMinutes = Math.floor(time / 60);
    const getSeconds = time % 60;
    return `${getMinutes
      .toString()
      .padStart(2, "0")}:${getSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <div>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />{" "}
        Minutes
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />{" "}
        Seconds
        <button onClick={startTimer}>START</button>
      </div>
      <div>
        <button onClick={pauseResumeTimer}>
          {isPaused ? "RESUME" : "PAUSE/RESUME"}
        </button>
        <button onClick={resetTimer}>RESET</button>
      </div>
      <div>
        <h2>{formatTime(timeLeft)}</h2>
      </div>
    </div>
  );
}

export default App;

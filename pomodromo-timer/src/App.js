import React, { useState } from "react";
import Setters from "./Setters";

import "./App.css";
let interval = undefined;
function App() {
  const initialState = {
    breakLength: 5,
    breakTitle: "Break Length",
    sessionLength: 25,
    sessionTitle: "Session Length",
    timerTitle: "Session",
    isRunning: false,
    initialSeconds: 1500,
    timer: "25:00",
  };

  const [state, setState] = useState(initialState);

  let startBtn = !state.isRunning ? "play" : "pause";

  const convertTimer = (totalSeconds) => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let timerMins = minutes < 10 ? `0${minutes}` : minutes;
    let timerSecs = seconds < 10 ? `0${seconds}` : seconds;
    return `${timerMins}:${timerSecs}`;
  };

  const resetTimer = (e) => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.pause();

    setState((prevState) => {
      return {
        ...prevState,
        breakLength: 5,
        sessionLength: 25,
        timerTitle: "Session",
        timer: convertTimer(1500),
        isRunning: false,
      };
    });
    clearInterval(interval);
  };

  const startStopTimer = () => {
    if (!state.isRunning) {
      let newSecs = 0;
      let newTimer = 0;
      let newTimerTitle = state.timerTitle;

      //Starting the Timer
      interval = setInterval(() => {
        setState((prev) => {
          return { ...prev, isRunning: true };
        });

        setState((prevState) => {
          newSecs = prevState.initialSeconds - 1;
          newTimer = convertTimer(newSecs);

          //console.log(`Time `, newSecs, prevState);

          if (newSecs === 0) {
            const audio = document.getElementById("beep");
            audio.play();
            audio.currentTime = 0;
          }

          if (newSecs < 0 && prevState.timerTitle === "Session") {
            console.log(`Time less than 0`, newSecs);
            newSecs = prevState.breakLength * 60;
            newTimer = convertTimer(newSecs);
            newTimerTitle = "Break";
          } else if (newSecs < 0 && prevState.timerTitle === "Break") {
            newSecs = prevState.sessionLength * 60;
            newTimer = convertTimer(newSecs);
            newTimerTitle = "Session";
          }

          return {
            ...prevState,
            initialSeconds: newSecs,
            timer: newTimer,
            timerTitle: newTimerTitle,
          };
        });
      }, 1000);
    } else {
      clearInterval(interval);
      setState((prev) => {
        return { ...prev, isRunning: false };
      });
    }
  };

  const breakIncr = (title) => {
    const [type, change] = title.split("-");

    if (type === "break") {
      if (state.breakLength < 60) {
        setState((prev) => {
          return { ...prev, breakLength: prev.breakLength + 1 };
        });
      }
    } else {
      if (state.sessionLength < 60) {
        setState((prev) => {
          let sessionLength = prev.sessionLength + 1;
          let timer = convertTimer(sessionLength * 60);
          return { ...prev, sessionLength: sessionLength, timer: timer };
        });
      }
    }
  };

  const breakDecr = (title) => {
    const [type, change] = title.split("-");

    if (type === "break") {
      if (state.breakLength > 1) {
        setState((prev) => {
          return { ...prev, breakLength: prev.breakLength - 1 };
        });
      }
    } else {
      if (state.sessionLength > 1) {
        setState((prev) => {
          let sessionLength = prev.sessionLength - 1;
          let timer = convertTimer(sessionLength * 60);
          return { ...prev, sessionLength: sessionLength, timer: timer };
        });
      }
    }
  };

  return (
    <div className="section-center">
      <h1>25 + 5 Clock</h1>
      <div className="break-session">
        <Setters
          length={state.breakLength}
          title={state.breakTitle}
          breakIncr={breakIncr}
          breakDecr={breakDecr}
        />
        <Setters
          length={state.sessionLength}
          title={state.sessionTitle}
          breakIncr={breakIncr}
          breakDecr={breakDecr}
        />
      </div>
      <div className="section-timer">
        <h2 id="timer-label">{state.timerTitle}</h2>
        <h1 className="timer" id="time-left">
          {state.timer}
        </h1>
        <div className="btn-cntr">
          <button
            id="start_stop"
            className="btn play-btn"
            type="button"
            onClick={startStopTimer}
          >
            <i className={`fas fa-${startBtn}`}></i>
          </button>
          <button
            id="reset"
            className="btn reset-btn"
            type="button"
            onClick={resetTimer}
          >
            <i className="fas fa-sync"></i>
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
      <img src="./image/item-1.jpeg" alt="imgage1" />
    </div>
  );
}

export default App;

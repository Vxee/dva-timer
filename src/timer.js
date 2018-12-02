import React from 'react';
import { getFormattedTime } from './format';

const Timer = ({ timer, dispatch }) => {
  const { status, seconds } = timer;
  return (
    <div>
      <p>
        {getFormattedTime(seconds)}({status})
      </p>
      <button
        key="reset"
        disabled={status === "Running"}
        onClick={() => dispatch({ type: "timer/reset" })}
      >
        reset
      </button>
      <button
        key="start"
        disabled={status === "Running"}
        onClick={() => dispatch({ type: "timer/start" })}
      >
        start
      </button>
      <button
        key="stop"
        disabled={status === "Stopped"}
        onClick={() => dispatch({ type: "timer/stop" })}
      >
        stop
      </button>
    </div>
  );
}

export default Timer;
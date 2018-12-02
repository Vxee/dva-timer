import React from "react";
import dva, { connect } from "dva";
import { race } from "redux-saga/effects";
import delay from "./delay";
import Timer from './timer';

const app = dva();

app.model({
  namespace: "timer",
  state: {
    status: "Stopped",
    seconds: 0
  },
  reducers: {
    start(state) {
      return { ...state, status: "Running" };
    },
    stop(state) {
      return { ...state, status: "Stopped" };
    },
    tick(state) {
      return { ...state, seconds: state.seconds + 1 };
    },
    reset() {
      return { seconds: 0, status: "Stopped" };
    }
  },
  effects: {
    *runTimer({ type }, { put, call, take }) {
      console.log(type);
      while (yield take("start")) {
        while (true) {
          const winner = yield race({
            stopped: take("stop"),
            tick: call(delay, 1000)
          });

          if (!winner.stopped) {
            yield put({ type: "tick" });
          } else {
            break;
          }
        }
      }
    }
  }
});

const App = connect(({ timer }) => ({
  timer
}))(Timer);

app.router(() => <App />);

app.start("#root");

app._store.dispatch({ type: "timer/runTimer" });

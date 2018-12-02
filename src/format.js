import { duration } from "moment";
import { compose } from "ramda";

export const getFormattedTime = seconds => formatTime(seconds * 1000);

const pad = t => (t < 10 ? `0${t}` : `${t}`);

const formatMoment = m => `${pad(m.minutes())}:${pad(m.seconds())}`;

const formatTime = compose(
  formatMoment,
  duration
);

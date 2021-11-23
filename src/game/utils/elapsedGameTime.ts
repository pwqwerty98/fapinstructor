import differenceInMinutes from "date-fns/differenceInMinutes";

import store from "@/store";

export function gameCompletionPercent() {
  return elapsedGameTime() / store.config.gameDuration.max;
}

export default function elapsedGameTime() {
  return differenceInMinutes(new Date(), new Date(store.game.startTime));
}

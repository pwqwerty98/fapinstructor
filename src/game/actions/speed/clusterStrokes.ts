import store from "@/store";
import { createNotification } from "@/game/engine/notification";
import {
  getAverageStrokeSpeed,
  setStrokeSpeed,
} from "@/game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "@/utils/math";
import { delay } from "@/game/engine/delay";
import { StrokeService } from "@/game/xstate/services";

export const clusterStrokes = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;

  createNotification({
    message: "Cluster Strokes",
    delay: true,
  });

  const sets = getRandomInclusiveInteger(3, 6);
  const reps = getRandomInclusiveInteger(3, 15);
  const averageSpeed = getAverageStrokeSpeed();

  // time to complete set
  const fastTime = reps / store.config.strokeSpeed.max;
  const averageTime = reps / averageSpeed;

  const startDelayTime = 2;

  setStrokeSpeed(0);
  await delay(startDelayTime * 1000);

  setStrokeSpeed(averageSpeed);

  for (let i = 0; i < sets; i++) {
    setStrokeSpeed(store.config.strokeSpeed.max);
    await delay(fastTime * 1000);

    setStrokeSpeed(averageSpeed);
    await delay(averageTime * 1000);
  }

  setStrokeSpeed(previousStrokeSpeed);
};
clusterStrokes.label = "Cluster Strokes";

import store from "@/store";
import { createNotification } from "@/game/engine/notification";
import {
  getAverageStrokeSpeed,
  setStrokeSpeed,
} from "@/game/utils/strokeSpeed";
import { getRandomArbitrary, getRandomInclusiveInteger } from "@/utils/math";
import { delay } from "@/game/engine/delay";
import { StrokeService } from "@/game/xstate/services";

export const randomBeat = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;

  createNotification({
    message: "Random beat",
    delay: true,
  });

  // set count
  const setCount = getRandomInclusiveInteger(3, 6);

  // stroke speed of sets
  const fastSpeed = getRandomArbitrary(
    getAverageStrokeSpeed(),
    store.config.strokeSpeed.max
  );
  const slowSpeed = getRandomArbitrary(
    store.config.strokeSpeed.min,
    getAverageStrokeSpeed()
  );

  // rep count
  const fastReps = getRandomInclusiveInteger(2, 10);
  const slowReps = getRandomInclusiveInteger(1, 5);

  // time to complete set
  const fastTime = fastReps / fastSpeed;
  const slowTime = slowReps / slowSpeed;

  setStrokeSpeed(0);

  for (let i = 0; i < setCount; i++) {
    setStrokeSpeed(fastSpeed);
    await delay(fastTime * 1000);

    setStrokeSpeed(slowSpeed);
    await delay(slowTime * 1000);
  }

  setStrokeSpeed(previousStrokeSpeed);
};
randomBeat.label = "Random Beat";

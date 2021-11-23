import { createNotification } from "@/game/engine/notification";
import { getRandomInclusiveInteger } from "@/utils/math";
import { delay } from "@/game/engine/delay";
import { playCommand } from "@/game/engine/audio";

export const squeezeBalls = async () => {
  const time = getRandomInclusiveInteger(15, 40);

  createNotification({
    message: "Squeeze your balls and stroke",
    duration: time * 1000,
    showProgress: true,
    delay: true,
  });

  playCommand("squeezeBalls");

  await delay(time * 1000);
};
squeezeBalls.label = "Squeeze Balls";

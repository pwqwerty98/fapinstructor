import store from "@/store";
import { createNotification } from "@/game/engine/notification";
import { setStrokeSpeed } from "@/game/utils/strokeSpeed";
import { getRandomRubStrength } from "@/game/enums/RubStrength";
import { getRandomInclusiveInteger } from "@/utils/math";
import { delay } from "@/game/engine/delay";
import {
  getCurrentStrokeStyle,
  setStrokeStyle,
} from "@/game/enums/StrokeStyle";
import { setStrokeStyleHandsOff } from "@/game/actions/strokeStyle";
import { StrokeService } from "@/game/xstate/services";

export const rubNipples = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  const style = getCurrentStrokeStyle();
  const strength = getRandomRubStrength();
  const taskDuration = getRandomInclusiveInteger(15, 30);

  let message = `Use both of your hands to ${strength}rub your nipples`;

  if (store.game.clothespins === 1) {
    message = `Use one of your hands to ${strength}turn the clothespin on your nipple`;
  } else if (store.game.clothespins > 1) {
    message = `Use both of your hands to ${strength}turn the clothespins on your nipples`;
  }
  createNotification({
    message,
    duration: taskDuration * 1000,
    showProgress: true,
    delay: true,
  });

  setStrokeSpeed(0);
  await setStrokeStyleHandsOff();
  await delay(taskDuration * 1000);

  await delay(2000);

  setStrokeSpeed(previousStrokeSpeed);
  await setStrokeStyle(style);
};
rubNipples.label = "Rub Nipples";

import { assign, createMachine, send } from "xstate";

import type { GameConfig } from "@/configureStore";
import store from "@/common/store";
import { selectEnableTicks } from "@/common/store/settings";
import { playTick } from "@/game/engine/audio";
import { TICK_DELAY } from "@/config";
import { handy } from "@/features/handy";
import { getAverageStrokeSpeed } from "@/game/utils/strokeSpeed";
import { getRandomArbitrary } from "@/utils/math";

import { StrokeService } from "../services";

import createIntervalMachine, { TickEvent } from "./intervalMachine";

export type StrokeMachine = ReturnType<typeof createStrokeMachine>;

function convertSpeedToInterval(speed: number) {
  return (1 / speed) * 1000;
}

export type StrokeMachineContext = {
  strokeSpeed: number;
  strokeSpeedBaseline: number;
  strokeQueue: number[];
};

type SetStrokeSpeedBaselineEvent = {
  type: "SET_STROKE_SPEED_BASELINE";
  speed: number;
};

type SetStrokeSpeedEvent = {
  type: "SET_STROKE_SPEED";
  speed: number;
};

export type QueueStrokeEvent = {
  type: "QUEUE_STROKE";
  timestamp: number;
};

export type ClearStrokeQueue = {
  type: "CLEAR_STROKE_QUEUE";
};

export type StrokeEvent = {
  type: "STROKE";
  timestamp: number;
};

export type StopEvent = {
  type: "STOP";
};

export type StrokeMachineEvent =
  | { type: "PAUSE" }
  | { type: "PLAY" }
  | SetStrokeSpeedEvent
  | SetStrokeSpeedBaselineEvent
  | TickEvent
  | QueueStrokeEvent
  | ClearStrokeQueue
  | StrokeEvent
  | StopEvent;

export function createStrokeMachine(config: GameConfig) {
  const initialStrokeSpeed = getRandomArbitrary(
    config.strokeSpeed.min,
    getAverageStrokeSpeed()
  );

  const strokeMachine = createMachine<StrokeMachineContext, StrokeMachineEvent>(
    {
      id: "stroke",
      initial: "paused",
      context: {
        // beats per second
        strokeSpeed: initialStrokeSpeed,
        strokeSpeedBaseline: 0,
        strokeQueue: [],
      },
      on: {
        STOP: {
          target: "stopped",
        },
      },
      states: {
        stopped: {
          entry: () => {
            if (handy.connected) {
              handy.setBeatsPerSecond(0);
            }
          },
          type: "final",
        },
        paused: {
          entry: () => {
            if (handy.connected) {
              handy.setBeatsPerSecond(0);
            }
          },
          on: {
            PLAY: "playing",
          },
        },
        playing: {
          invoke: [
            {
              id: "strokeQueueInterval",
              src: createIntervalMachine({ callback: "QUEUE_STROKE" }),
              data: {
                interval: ({ strokeSpeed }: StrokeMachineContext) =>
                  convertSpeedToInterval(strokeSpeed),
              },
            },
            {
              id: "strokeInterval",
              src: createIntervalMachine({ callback: "STROKE" }),
            },
          ],
          exit: send("CLEAR_STROKE_QUEUE"),
          on: {
            PAUSE: "paused",
            SET_STROKE_SPEED: {
              actions: [
                "setStrokeSpeed",
                send(
                  ({ strokeSpeed }: StrokeMachineContext) => ({
                    type: "SET_INTERVAL",
                    interval: convertSpeedToInterval(strokeSpeed),
                  }),
                  { to: "strokeQueueInterval" }
                ),
              ],
            },
            SET_STROKE_SPEED_BASELINE: {
              actions: "setStrokeSpeedBaseline",
            },
            QUEUE_STROKE: {
              actions: "queueStroke",
            },
            CLEAR_STROKE_QUEUE: {
              actions: "clearStrokeQueue",
            },
            STROKE: {
              cond: "nextStrokeAvailable",
              actions: "stroke",
            },
          },
        },
      },
    },
    {
      actions: {
        setStrokeSpeed: assign((context, event) => ({
          strokeSpeed: (event as SetStrokeSpeedEvent).speed,
        })),
        setStrokeSpeedBaseline: assign((context, event) => ({
          strokeSpeedBaseline: (event as SetStrokeSpeedBaselineEvent).speed,
        })),
        queueStroke: assign({
          strokeQueue: ({ strokeQueue }, event) => [
            ...strokeQueue,
            (event as QueueStrokeEvent).timestamp,
          ],
        }),
        clearStrokeQueue: assign({
          strokeQueue: (context) => [],
        }),
        stroke: assign((context, event) => {
          const enableTicks = selectEnableTicks(store.getState());

          if (enableTicks) {
            playTick(StrokeService.strokeSpeed);
          }

          if (handy.connected) {
            handy.setBeatsPerSecond(context.strokeSpeed);
          }

          return {
            strokeQueue: context.strokeQueue.slice(1),
          };
        }),
      },
      guards: {
        nextStrokeAvailable: ({ strokeQueue }, event) => {
          const timestamp = (event as TickEvent).timestamp;

          const nextStrokeTimeStamp = strokeQueue[0];

          if (!nextStrokeTimeStamp || !timestamp) {
            return false;
          }

          return timestamp - TICK_DELAY >= nextStrokeTimeStamp;
        },
      },
    }
  );

  return strokeMachine;
}

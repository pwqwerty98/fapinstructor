import { interpret, InterpreterFrom } from "xstate";
import { useService } from "@xstate/react";

import {
  createActionMachine,
  ActionMachine,
  Action,
} from "@/game/xstate/machines/actionMachine";
import { GameConfig } from "@/configureStore";

let machine: ActionMachine;
let service: InterpreterFrom<ActionMachine>;

export function getActionService() {
  if (!service) {
    throw new Error("You must first initialize the action service");
  }
  return service;
}

function getActionServiceContext() {
  return getActionService().state.context;
}

const ActionService = {
  initialize(gameConfig: GameConfig) {
    if (service) {
      service.stop();
    }

    machine = createActionMachine(gameConfig);
    service =
      interpret(machine); /**, { devTools: true }).onTransition((state) => {
      console.log("[ActionService] Event:", state.event);
      if (state.value !== state.history?.value) {
        console.log(`[ActionService] Transition: ${state.value}`);
      }
    });*/

    // Automatically start the service after it's created
    service.start();
  },
  stop() {
    if (!this.stopped) {
      getActionService().send("STOP");
    }
  },
  get stopped() {
    return !service || service.state.matches("stopped");
  },
  /**
   * Executes the specified action
   *
   * +----------------------------------+
   * |      Supports the following      |
   * +----------------------------------+
   * | -action executed immediately     |
   * | -action is executed on trigger   |
   * | -execution completes instantly   |
   * | -execution completes overtime    |
   * | -actions can be interrupted      |
   * +----------------------------------+
   * @param {
   *   A function that returns null or a promise.
   *   If an action is already executing,  it will be interrupted
   * } action
   */
  execute(action: Action) {
    getActionService().send({ type: "EXECUTE", action });
  },
  setTriggers(triggers: Action[]) {
    getActionService().send("SET_TRIGGERS", { triggers });
  },
  get triggers() {
    return getActionServiceContext().triggers;
  },
  get executing() {
    return getActionService().state.matches("executing");
  },
};

export function useActionService() {
  return useService(getActionService());
}

export default ActionService;

import { format } from "util";

export default function throwOnConsoleError() {
  console.error = function (...args: unknown[]) {
    const [firstArg, ...restArgs] = args;

    if (firstArg instanceof Error) {
      throw firstArg;
    }

    throw new Error(format(firstArg, ...restArgs));
  };
}

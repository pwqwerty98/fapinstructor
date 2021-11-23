export type Observer<T> = (arg: T) => void;

export type Subject<T> = {
  notify: (arg: T) => void;
  subscribe: (observer: Observer<T>) => number;
  unsubscribe: (id: number) => void;
};

type ObservableOptions<T> = {
  onSubscribe?: (observer: Observer<T>) => void;
  onUnsubscribe?: (observer: Observer<T>) => void;
};

export function createObservable<T>(
  options?: ObservableOptions<T>
): Subject<T> {
  const observers: Observer<T>[] = [];

  function subscribe(observer: Observer<T>) {
    if (options?.onSubscribe) {
      options.onSubscribe(observer);
    }

    return observers.push(observer) - 1;
  }

  function unsubscribe(id: number) {
    if (options?.onUnsubscribe) {
      options.onUnsubscribe(observers[id]);
    }

    delete observers[id];
  }

  function notify(arg: T) {
    observers.forEach((observer) => observer(arg));
  }

  return {
    notify,
    subscribe,
    unsubscribe,
  };
}

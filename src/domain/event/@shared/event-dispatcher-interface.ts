import { EventInterface } from "./event-interface";
import { EventHandlerInterface } from "./event-handler-interface";

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(name: string, event: EventHandlerInterface): void;
  unregister(name: string): void;
  unregisterAll(): void;
}

import { EventDispatcherInterface } from "./event-dispatcher-interface";
import { EventInterface } from "./event-interface";
import { EventHandlerInterface } from "./event-handler-interface";

export class EventDispatcher implements EventDispatcherInterface {
  private _handlers: Map<string, EventHandlerInterface[]> = new Map();

  notify(event: EventInterface): void {
    const handlers = this.getEventHandlers(event.constructor.name);

    handlers.forEach(handler => handler.handle(event));
  }

  register(name: string, event: EventHandlerInterface): void {
    const events = this._handlers.get(name) ?? [];

    this._handlers.set(name, [...events, event]);
  }

  unregister(name: string): void {
    this._handlers.delete(name);
  }

  unregisterAll(): void {
    this._handlers.clear()
  }

  getEventHandlers(name: string): EventHandlerInterface[] {
    return this._handlers.get(name) ?? [];
  }

  getAllEventHandlers(): Map<string, EventHandlerInterface[]> {
    return this._handlers;
  }
}

import { EventDispatcher } from "./event-dispatcher";
import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";

describe("Domain Event Dispatcher", () => {
  it("Should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toEqual([eventHandler]);
  })

  it("Should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toEqual([eventHandler]);

    eventDispatcher.unregister("ProductCreatedEvent");

    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toEqual([]);
  })

  it("Should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("ProductCreatedEvent2", eventHandler);
    eventDispatcher.register("ProductCreatedEvent3", eventHandler);

    expect(eventDispatcher.getAllEventHandlers().size).toBe(3);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getAllEventHandlers().size).toBe(0);
  })

  it("Should notify an event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const spy = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const event = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.00,
    })

    eventDispatcher.notify(event);

    expect(spy).toHaveBeenCalledWith(event)
  })
})

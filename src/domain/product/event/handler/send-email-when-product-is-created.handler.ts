import { EventHandlerInterface } from "../../../@shared/event/event-handler-interface";
import { ProductCreatedEvent } from "../product-created.event";
import { EventInterface } from "../../../@shared/event/event-interface";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: EventInterface): void {
    console.log("Sending email to ...");
  }
}

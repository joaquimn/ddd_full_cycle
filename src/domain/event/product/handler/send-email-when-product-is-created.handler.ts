import EventHandlerInterface from "../../shared/event-handler.interface";
import ProductCreatedEvent from "../product-created-event";

export default class SendEmailWhenProductIsCreatedHander implements EventHandlerInterface{
    handler(event: ProductCreatedEvent): void {
        console.log('Sending email to ..........')
    }
}
import EventHandlerInterface from "../../shared/event-handler.interface";
import CostumerCreatedEvent from "../costumer-created-events";

export default class SendConsoleLog2  implements EventHandlerInterface{
    handler(event: CostumerCreatedEvent): void {
        console.log('Esse é o segundo  console.log do evento: CustomerCreated')
    }
}
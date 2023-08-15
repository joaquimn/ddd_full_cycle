import EventHandlerInterface from "../../shared/event-handler.interface";
import CostumerCreatedEvent from "../costumer-created-events";

export default class SendConsoleLog1  implements EventHandlerInterface{
    
    handler(event: CostumerCreatedEvent): void {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated')
    }
}
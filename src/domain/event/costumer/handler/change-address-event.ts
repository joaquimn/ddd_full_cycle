import EventHandlerInterface from "../../shared/event-handler.interface";
import CostumerUpdatedEvent from "../costumer-updated-events";

export default class ChangeAddressEvent  implements EventHandlerInterface{
    handler(event: CostumerUpdatedEvent): void {
        console.log("Endereço do cliente: "+event.eventData.id+", "+event.eventData.name+" alterado para: "+event.eventData.address.street+", "+event.eventData.address.number+" - "+event.eventData.address.city+" - "+event.eventData.address.zip);
    }
}
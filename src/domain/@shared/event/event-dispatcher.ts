import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: {[eventName: string]: EventHandlerInterface[]} = {};

    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]}{

        return this.eventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        
        if(!this.getEventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        
        if(this.eventHandlers[eventName]){
            const index = this.eventHandlers[eventName].indexOf(eventHandler);

            if(index !== -1){
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unresterAll(): void {
        
        this.eventHandlers = {};
    }

    notify(event: EventInterface): void {
        
        //gets the calls name based on the constructor
        const eventName = event.constructor.name;

        if(this.eventHandlers[eventName]){

            this.eventHandlers[eventName].forEach((eventHandler) => {

                eventHandler.handler(event)

            });
        }
    }    
}
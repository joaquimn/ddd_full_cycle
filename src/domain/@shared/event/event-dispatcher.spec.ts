import SendConsoleLog1 from "../../customer/event/handler/send-console-log1.handler";
import SendConsoleLog2 from "../../customer/event/handler/send-console-log2.handler";
import SendEmailWhenProductIsCreatedHander from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created-event";
import CostumerCreatedEvent from "../../customer/event/costumer-created-events";
import EventDispatcher from "./event-dispatcher";

describe("Domain event test", () => {

    it("should register an event handler - product", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHander();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });


    it("should register an event handler - costumer - sendconsolelog 1", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1();

        eventDispatcher.register("CostumerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler);
    });
    
    it("should register an event handler - costumer - sendconsolelog 2", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2();

        eventDispatcher.register("CostumerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler - product", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHander();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister an event handler - costumer - sendconsolelog1 ", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1();

        eventDispatcher.register("CostumerCreatedEvent", eventHandler);

        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CostumerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"].length).toBe(0);
    });

    it("should unregister an event handler - costumer - sendconsolelog2 ", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2();

        eventDispatcher.register("CostumerCreatedEvent", eventHandler);

        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CostumerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"].length).toBe(0);
    });

    it("Should unregister all events", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHander();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unresterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("Should unregister all events - costumer - sendconsolelog1", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1();

        eventDispatcher.register("CostumerCreatedEvent", eventHandler);
        
        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unresterAll();

        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeUndefined();
    });    


    it("Should unregister all events - costumer - sendconsolelog2", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2();

        eventDispatcher.register("CostumerCreatedEvent", eventHandler);
        
        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unresterAll();

        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeUndefined();
    });    


    it("Should notify - product", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHander();
        
        //jest spy verifies if a method will be used during the test
        const spyEventHandler = jest.spyOn(eventHandler, "handler")

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "description",
            price: 10.0
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });



    it("Should notify - costumer - sendconsolelog1", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1();
        
        //jest spy verifies if a method will be used during the test
        const spyEventHandler = jest.spyOn(eventHandler, "handler")

        eventDispatcher.register("CostumerCreatedEvent", eventHandler);

        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler);

        const costumerCreatedEvent = new CostumerCreatedEvent({
            name: "Costumer 1"
        });

        eventDispatcher.notify(costumerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("Should notify - costumer - sendconsolelog2", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2();
        
        //jest spy verifies if a method will be used during the test
        const spyEventHandler = jest.spyOn(eventHandler, "handler")

        eventDispatcher.register("CostumerCreatedEvent", eventHandler);

        // verify if the event was properly registred
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler);

        const costumerCreatedEvent = new CostumerCreatedEvent({
            name: "Costumer 2"
        });

        eventDispatcher.notify(costumerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    }); 
});
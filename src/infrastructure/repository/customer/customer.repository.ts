import Address from "../../../domain/entity/customer/address";
import Customer from "../../../domain/entity/customer/customer";
import CostumerCreatedEvent from "../../../domain/event/costumer/costumer-created-events";
import CostumerUpdatedEvent from "../../../domain/event/costumer/costumer-updated-events";
import ChangeAddressEvent from "../../../domain/event/costumer/handler/change-address-event";
import SendConsoleLog1 from "../../../domain/event/costumer/handler/send-console-log1.handler";
import SendConsoleLog2 from "../../../domain/event/costumer/handler/send-console-log2.handler";
import EventDispatcher from "../../../domain/event/shared/event-dispatcher";
import CustomerRepositoryInterface from "../../../domain/repository/customer-repository.interface";
import CustomerModel from "../../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        
      try {

        await CustomerModel.create({
          id: entity.id,
          name: entity.name,
          street: entity.address.street, 
          number: entity.address.number,
          zipcode: entity.address.zip,
          city: entity.address.city,
          active: entity.isActive(),
          rewardPoints: entity.rewardPoints,
      });

      const eventDispatcher = new EventDispatcher();
      
      let eventHandler = new SendConsoleLog1();
      eventDispatcher.register("CostumerCreatedEvent", eventHandler);

      eventHandler = new SendConsoleLog2();
      eventDispatcher.register("CostumerCreatedEvent", eventHandler);

      const costumerCreatedEvent = new CostumerCreatedEvent({
          name: entity.name
      });

      eventDispatcher.notify(costumerCreatedEvent);

      } catch (error) {
        throw new Error("Insert process has failed");
      }
    }

    async update(entity: Customer): Promise<void> {
        
      let test: boolean = false;  
      const costumerModel = await this.find(entity.id);
      const address = new Address(entity.address.street, entity.address.number, entity.address.city, entity.address.zip);

      //triggering an event if the address has been changed
      if(JSON.stringify(address) !== JSON.stringify(costumerModel.address)){      
        test = true;
      }
    
      try{
          await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, { where: { id: entity.id } });
      
        if(test){
          const eventDispatcher = new EventDispatcher();       
          let eventHandler = new ChangeAddressEvent()
          eventDispatcher.register("CostumerUpdatedEvent", eventHandler);
      
          const costumerCreatedEvent = new CostumerUpdatedEvent({
              id: entity.id,
              name: entity.name,
              address: address,
          });

          eventDispatcher.notify(costumerCreatedEvent);
        }
      } catch(error){
        throw new Error("Update process has failed");
      }
    }

    async find(id: string): Promise<Customer> {

        let customerModel;
        
        try {
            customerModel = await CustomerModel.findOne({ where: { id },rejectOnEmpty: true });
        } catch (error) {
            throw new Error("Customer not found");
        }

      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipcode);
      customer.changeAddress(address);
      customer.addRewardPoints(customerModel.rewardPoints);
      
      if(customerModel.active){
            customer.activate();
      }

      return customer;        
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
    
        const customers = customerModels.map((customerModels) => {
          let customer = new Customer(customerModels.id, customerModels.name);
          customer.addRewardPoints(customerModels.rewardPoints);
          const address = new Address(
            customerModels.street,
            customerModels.number,
            customerModels.city,
            customerModels.zipcode
          );
          customer.changeAddress(address);
          if (customerModels.active) {
            customer.activate();
          }
          return customer;
        });
    
        return customers;
      }
}


    

import Address from "../../../domain/entity/customer/address";
import Customer from "../../../domain/entity/customer/customer";
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

      } catch (error) {
        //console.log(error);
      }
    }

    async update(entity: Customer): Promise<void> {
        
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, { where: { id: entity.id } });
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


    
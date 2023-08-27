import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import SendConsoleLog1 from "../../../../domain/customer/event/handler/send-console-log1.handler";
import SendConsoleLog2 from "../../../../domain/customer/event/handler/send-console-log2.handler";

describe('Customer Repository test', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
             
    });

    afterEach(async () => {
        await sequelize.close();
    }); 

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
        customer.activate();

        await customerRepository.create(customer);
    
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
    
        expect(customerModel.toJSON()).toStrictEqual({
          id: "123",
          name: customer.name,
          active: customer.isActive(),
          rewardPoints: customer.rewardPoints,
          street: address.street,
          number: address.number,
          zipcode: address.zip,
          city: address.city,
        });
      });

    it('should update a customer', async () => {

        const customerRepository = new CustomerRepository();

        const customer = new Customer('1', 'John');
        const address = new Address('street1', 123, 'city1', '456');
        customer.address = address;
        customer.activate();
        
        await customerRepository.create(customer);

        customer.changeName('Customer 2');
           
        await customerRepository.update(customer);

        const updatedCustomer = await CustomerModel.findOne({ where: { id: '1' } });
        expect(updatedCustomer.toJSON()).toStrictEqual({ 

            id: '1',
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zip,
            city: customer.address.city
        })
    });


    it('should update the customer address', async () => {

        const customerRepository = new CustomerRepository();

        const customer = new Customer('1', 'John');
        const address = new Address('street1', 123, 'city1', '456');
        customer.address = address;
        customer.activate();
        
        await customerRepository.create(customer);

        const newAddress = new Address('street2', 456, 'citys', '789');
        customer.changeAddress(newAddress);
           
        await customerRepository.update(customer);

        const updatedCustomer = await CustomerModel.findOne({ where: { id: '1' } });
        expect(updatedCustomer.toJSON()).toStrictEqual ({ 

            id: '1',
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: newAddress.street,
            number: newAddress.number,
            zipcode: newAddress.zip,
            city: newAddress.city
        })
    });    

    it('should find a customer', async () => {
                
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'John');
        const address = new Address('street', 123, 'winnipeg', 'r2j2l8');
        customer.address = address;
        customer.activate();
        customer.addRewardPoints(10);   

        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);
        
        expect(customer).toStrictEqual(customerResult)
    });

    it('should throw an error when customer is not found', async () => {
        const customerRepository = new CustomerRepository();
        expect(async() => {
            await customerRepository.find('abc');
        }).rejects.toThrow('Customer not found');
    });


    it('should find all customers', async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'John');
        const address = new Address('street', 123, 'city', 'zip');
        customer.address = address;
        customer.activate();
        customer.addRewardPoints(10);

        await customerRepository.create(customer);

        const customer2 = new Customer('12', 'John2');
        const address2 = new Address('street2', 1232, 'citty2', 'zip2');
        customer2.address = address2;
        customer2.activate();
        customer2.addRewardPoints(20);

        await customerRepository.create(customer2);
  
        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer2);
    });

    

});
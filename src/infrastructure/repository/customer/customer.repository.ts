import Address from "../../../domain/entity/customer/address";
import Customer from "../../../domain/entity/customer/customer";
import Product from "../../../domain/entity/product/product";
import CustomerRepositoryInterface from "../../../domain/repository/customer-repository.interface";
import CustomerModel from "../../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        
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
        
      const customerModel = await CustomerModel.findOne({ where: { id: id } });

      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);

/*
      const customer = new Customer("123", "John");
      const address = new Address("rua", 123, "winnipeg", "r2j2l8");
      customer.address = address;
*/
      return new Product(productModel.id, productModel.name, productModel.price);
        
    }

    async findAll(): Promise<Product[]> {
        
        const productModels = await ProductModel.findAll();
        const products = productModels.map(productModel => new Product(productModel.id, productModel.name, productModel.price));
        return products;
    }


    
}
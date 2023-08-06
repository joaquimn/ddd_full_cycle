import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import CustomerModel from "../../db/sequelize/model/customer.model";
import OrderModel from "../../db/sequelize/model/order.model";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import ProductModel from "../../db/sequelize/model/product.model";
import CustomerRepository from "../customer/customer.repository";
import Customer from "../../../domain/entity/customer/customer";
import Address from "../../../domain/entity/customer/address";
import ProductRepository from "../product/product.repository";
import Product from "../../../domain/entity/product/product";
import OrderItem from "../../../domain/entity/order/order_item";
import Order from "../../../domain/entity/order/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    try {
        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
          ]);
    } catch (error) {
        console.log(error);
    }

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
    
  });

  it("Should update an order", async () => {
   
    const customerRepository = new CustomerRepository();
    const customer = new Customer("12", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);


    let orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });


    const orderItem2 = new OrderItem(
      "2",
      product.id,
      product.name,
      product.price,
      2
    );

   order.items.push(orderItem2);
   order.updateTotal();
    

    await orderRepository.update(order);

    const orderFound = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderFound.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: orderItem2.productId,
        },
      ],
    });
  });

  it("Should find an order",async () => {
    
    const customerRepository = new CustomerRepository();
    const customer = new Customer("12", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFound = orderRepository.find(order.id);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId,
        }
      ],
    });

  });

  it("Should find all orders",async () => {
    
    const customerRepository = new CustomerRepository();
    const customer = new Customer("12", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
   
    const customer2 = new Customer("13", "Customer 3");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product2 = new Product("456", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.id,
      product2.name,
      product2.price,
      2
    );

    const order2 = new Order("456", customer2.id, [orderItem2]);
    await orderRepository.create(order2);

    const orderModel = await OrderModel.findAll({
      include: ["items"]
    });

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order);
    expect(orders).toContainEqual(order2);
  });
});
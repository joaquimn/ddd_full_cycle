import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe('Order service unit test', () => {

    it('should total of the all orders', () => {
        
        
        const order_item1 = new OrderItem("1", "p1", "prod 1", 10, 2);
        const order_item2 = new OrderItem("2", "p2", "prod 2", 20, 2);
        
        const order1 = new Order("1", "1", [order_item1, order_item2]);
        

        const order_item3 = new OrderItem("3", "p3", "prod 3", 10, 1);
        const order_item4 = new OrderItem("4", "p4", "prod 4", 20, 1);
        
        const order2 = new Order("2", "2", [order_item3, order_item4]);

        const total = OrderService.total([order1, order2]);

        expect(total).toEqual(90);
    });

    it('should place an order with points', () => { 
        const customer = new Customer("1", "customer 1");
        const order_item1 = new OrderItem("1", "p1", "prod 1", 10, 2);
        
        const order =  OrderService.placeOrder(customer, [order_item1]);

        expect(customer.rewardPoints).toEqual(10);
        expect(order.total()).toEqual(20);
    });

    it('should add reward points to customer', () => {
        const customer = new Customer("1", "customer 1");
        expect(customer.rewardPoints).toEqual(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toEqual(10);

        customer.addRewardPoints(20);
        expect(customer.rewardPoints).toEqual(30);
    });
});
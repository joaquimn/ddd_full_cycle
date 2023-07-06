import Customer from "./customer";
import Order from "./order";
import OrderItem from "./order_item";

describe('Order unit test', () => {

     it('should throw an error when id is empty', () => {
        expect(() => {
           
            const order = new Order("", "1", []);

        }).toThrowError("Id is required to create an order");  
    });
    

    it('should throw an error when customer id is empty', () => {
        expect(() => {
           
            const order = new Order("1", "", []);

        }).toThrowError("Customer id is required to create an order");  
    });

    it('should throw an error when order items are empty', () => {
        expect(() => {
           
            const order = new Order("1", "1", []);

        }).toThrowError("Order items are required");  
    });

    it('should calculate the price of the order', () => {

        const item1 = new OrderItem("1", "p1", "prod 1", 10, 2);
        const item2 = new OrderItem("2", "p2", "prod 2", 20, 1);
        const order = new Order("1", "1", [item1, item2]);

        expect(order.total()).toEqual(40);
    });

    it('should throw error if quantity is less or equal than 0', () => {
        expect(() => {
            const item1 = new OrderItem("1", "p1", "prod 1", 10, 0);
        }).toThrowError("Quantity must be greater than zero");  
    });
});
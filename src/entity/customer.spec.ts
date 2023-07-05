import Address from "./address";
import Customer from "./customer";


describe('Customer unit test', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    }); 

    it('should change name', () => {
        let customer = new Customer("123", "John");
        customer.changeName("Mary");

        expect(customer.name).toBe("Mary");
    });
    
    it('should activate customer', () => {
        const customer = new Customer("123", "John");
        const address = new Address("rua", 123, "winnipeg", "r2j2l8");
        customer.address = address;

        customer.activate();
        
        expect(customer.isActive()).toBe(true);
        }
    );

    it('should deactivate customer', () => {  
        const customer = new Customer("123", "John");
        customer.deactivate();
        
        expect(customer.isActive()).toBe(false);
    });

    it('should throw an error when you active a customer', () => {
        expect(() => {
            const customer = new Customer("123", "John");
            customer.activate();        
        }).toThrowError("Address is required to activate a customer");  
        }
    );
});
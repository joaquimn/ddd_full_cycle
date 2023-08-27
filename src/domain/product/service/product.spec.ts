import Product from "./product";

describe('Product unit test', () => {

     it('should throw an error when id is empty', () => {
        expect(() => {
           
            const product = new Product("", "1", 100);

        }).toThrowError("Id is required");  
    });

    it('should throw an error when name is empty', () => {
        expect(() => {
           
            const product = new Product("1", "", 100);

        }).toThrowError("Name is required");  
    });

    it('should throw an error when price is less than 0', () => {      
        expect(() => {
           
            const product = new Product("1", "1", -100);

        }).toThrowError("Price must be greater than zero");  
    });

    it('should change the name', () => {
        const product = new Product("1", "1", 100);
        product.changeName("p2");
        expect(product.name).toBe("p2");    
    });

    it('should change the price', () => {
        const product = new Product("1", "1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);    
    });
    
});
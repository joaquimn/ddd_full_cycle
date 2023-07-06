/**
 * 
 * The class will take care of just one single object at time.
 * Batch operations that will envolve more than one object will be handled by the service class.
 */

import Product from "../entity/product";
import ProductService from "./product.service";

describe('Product serve unit test', () => {

    it ('should change the price of all products', () => {

        const product1 = new Product('product1', 'product1', 10);
        const product2 = new Product('product2', 'product2', 20);
        const products = [product1, product2];

        ProductService.incrementPrice(products, 100);

        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);
    });
});
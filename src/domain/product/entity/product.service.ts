import Product from "../service/product";

export default class ProductService{

    static incrementPrice(products: Product[], percentage: number): void{
        products.forEach(product => {
            let newPrice = product.price * percentage / 100 + product.price;
            product.changePrice(newPrice);
        });
    }
}
export default class OrderItem {

    _id: string = "";
    _productId: string;
    _name: string = "";
    _price: number;
    _quantity: number;

    constructor(id: string, productID: string, name: string, price: number, quantity: number) {
        this._id = id;
        this._productId = productID;
        this._name = name;  
        this._price = price;
        this._quantity = quantity;

        this.validate();
    }

    get id(): string {  
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get productId(): string {
        return this._productId;
    }

    get quantity(): number {
        return this._quantity;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    validate() {
        if(this.orderItemTotal() < 0){
            throw new Error("Price must be greater or equals zero");
        }

        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
    }
}
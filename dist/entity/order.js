"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customerId, items) {
        this._id = "";
        this._customerId = "";
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        //this.validate();
    }
}
exports.default = Order;

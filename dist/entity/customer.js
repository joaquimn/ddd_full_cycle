"use strict";
/*

this class is to support the business rules of the customer
this does not relate to persistence or UI

Domain - how the business works
    Entity
        customer.ts - business rules

Infrastructure - how the business needs are implemented
    entity
        model (data persistence)
            customer.ts - data persistence
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = false;
        this._id = id;
        this._name = name;
        this.validate();
    }
    // class must auto-validate itself
    // if it is not valid, it should throw an error - based on the business rules
    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required to activate a customer");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    set address(address) {
        this._address = address;
    }
}
exports.default = Customer;

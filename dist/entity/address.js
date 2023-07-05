"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, number, city, zip) {
        this._street = "";
        this._number = 0;
        this._city = "";
        this._zip = "";
        this._street = street;
        this._number = number;
        this._city = city;
        this._zip = zip;
        this.validate();
    }
    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._number === 0) {
            throw new Error("Number is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is required");
        }
    }
    //this object is immutable - the goal is to manipulate the object
    toString() {
        return `${this._street} ${this._number} ${this._city} ${this._zip}`;
    }
}
exports.default = Address;

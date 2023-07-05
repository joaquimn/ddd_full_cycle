"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./entity/customer"));
const address_1 = __importDefault(require("./entity/address"));
let customer = new customer_1.default("1", "John Doe");
//constructor(street: string, number: number, city: string, zip: string){
const address = new address_1.default("123 Main St", 123, "city", "12345");

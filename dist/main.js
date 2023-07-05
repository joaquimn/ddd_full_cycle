"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./entity/customer"));
const address_1 = __importDefault(require("./entity/address"));
const order_item_1 = __importDefault(require("./entity/order_item"));
const order_1 = __importDefault(require("./entity/order"));
let customer = new customer_1.default("133", "John Doe");
const address = new address_1.default("123 Main St", 123, "city", "12345");
customer.address = address;
customer.activate();
const item1 = new order_item_1.default("1", "item 1", 10);
const item2 = new order_item_1.default("2", "item 2", 215);
const order = new order_1.default("1", "133", [item1, item2]);

import  Customer from "./entity/customer";
import  Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

let customer = new Customer("133", "John Doe");
const address = new Address("123 Main St", 123, "city", "12345");

customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "item 1", 10);
const item2 = new OrderItem("2", "item 2", 215);

const order = new Order("1", "133", [item1, item2]);
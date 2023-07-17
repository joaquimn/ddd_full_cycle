import Customer from "../entity/customer/customer";
import RepositoryInterface from "./repository-interface";

//interface created to be used specifically by the product repository

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {


}
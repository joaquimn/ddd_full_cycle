import Customer from "../entity/customer";
import RepositoryInterface from "../../@shared/repository/repository-interface";

//interface created to be used specifically by the product repository

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {


}
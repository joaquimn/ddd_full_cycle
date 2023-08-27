import Product from "../service/product";
import RepositoryInterface from "../../@shared/repository/repository-interface";

//interface created to be used specifically by the product repository

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {


}
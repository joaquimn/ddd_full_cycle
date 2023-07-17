import Product from "../entity/product/product";
import RepositoryInterface from "./repository-interface";

//interface created to be used specifically by the product repository

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {


}
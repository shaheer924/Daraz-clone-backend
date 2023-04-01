import BaseRepos from "./BaseRepos";
import Product from "../model/Product";

class ProductRepos extends BaseRepos{
    constructor() {
        super(Product);
    }
}

export default new ProductRepos()
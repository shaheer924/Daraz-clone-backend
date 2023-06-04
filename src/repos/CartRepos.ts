import BaseRepos from "./BaseRepos";
import Cart from "../model/Cart";

class CartRepos extends BaseRepos{
    constructor() {
        super(Cart);
    }
}

export default new CartRepos()
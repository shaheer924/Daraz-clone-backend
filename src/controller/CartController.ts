import BaseController from "./BaseController";
import {NextFunction, Request, Response} from "express";
import AppError from "../utils/AppError";
import CartRepos from "../repos/CartRepos";
import ProductRepos from "../repos/ProductRepos";
import Product from "../model/Product";

class CartController extends BaseController {
    constructor() {
        super(CartRepos);
    }

    addToCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let products = await Product.find({_id: {$in: req.body.products}})
            // @ts-ignore
            let total_price = products.reduce((a,b) => a.price + b.price)
            let cartBody = {
                total_price: total_price,
                products: req.body.products,
                user: req.body.user
            }
            let data = await CartRepos.model.create(cartBody)
            this.apiResponse('Cart added successfully', 200, res, products)
        } catch (e) {
            // @ts-ignore
            return next(new AppError(e.message, 500, e))
        }
    }
}

export default new CartController()
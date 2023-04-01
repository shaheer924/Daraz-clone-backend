import BaseController from "./BaseController";
import ProductRepos from "../repos/ProductRepos";
import {NextFunction, Request, Response} from "express";

class ProductController extends BaseController{
    constructor() {
        super(ProductRepos);
    }

    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body, req.files)
        let data = req.body
        data["image"] = req.files
        console.log(data)
        const product = await ProductRepos.model.create(data)
        this.apiResponse('Product created successfully', 200, res)
    }
}

export default new ProductController()
import BaseController from "./BaseController";
import ReviewRepos from "../repos/ReviewRepos";
import {NextFunction, Request, Response} from "express";
import AppError from "../utils/AppError";

class ReviewController extends BaseController {
    constructor() {
        super(ReviewRepos);
    }
    getReviewsByProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = await ReviewRepos.model.find({product: req.query.product}).populate('user')
            if(!data || data.length<1) return next(new AppError("No reviews found for this product", 404))
            this.apiResponse("Reviews fetched with the given product",200,res, data)
        } catch (e) {
            console.log(e)
            return next(new AppError("Something went wrong please try again", 500, e))
        }
    }
}

export default new ReviewController()
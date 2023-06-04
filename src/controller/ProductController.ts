import BaseController from "./BaseController";
import ProductRepos from "../repos/ProductRepos";
import {NextFunction, Request, Response} from "express";
import {registerProduct} from '../validations/ProductValidators'
import Product from "../model/Product";
import AppError from "../utils/AppError";

class ProductController extends BaseController {
    constructor() {
        super(ProductRepos);
    }

    createProduct = async (req: Request, res: Response) => {
        const data = await registerProduct.validateAsync(req.body)

        if (data.quantity > 0) {
            data.is_available = true
        }

        const product = await ProductRepos.model.create(data)
        this.apiResponse('Product created successfully', 200, res, product)
    }

    getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let query = req.query
            let queryObj = {...req.query}
            let queryArr = ["limit", "sort", "page", "fields", "sort_key"]
            queryArr.forEach(dt => {
                delete query[dt]
            })

            let sortObj = {"createdAt": "desc"}
            if (queryObj.sort && queryObj.sort_key) {
                // @ts-ignore
                delete sortObj['createdAt']
                // @ts-ignore
                sortObj[queryObj.sort_key] = queryObj.sort
            }
            let page: number = Number(queryObj.page) || 1
            let limit: number = Number(queryObj.limit) || 10
            let skip: number = (page - 1) * limit

            // @ts-ignore
            if (query.query && query.query.length > 0) {
                // @ts-ignore
                query["title"] = new RegExp(query.query)
            }
            delete query.query
            let data = await ProductRepos.model.find(query).limit(limit).skip(skip).sort(sortObj)

            let count = await ProductRepos.model.count(query)

            let responseBody = {
                data: data,
                pagination: {
                    totalRecords: count,
                    totalPages: Math.ceil(count / limit),
                    perPageRecords: limit,
                    pageNumber: page
                }
            }
            this.apiResponse('Record fetched successfully', 200, res, responseBody)
        } catch (err) {
            return next(new AppError('Something went wrong please try again', 500, err))
        }
    }

    getDiscountedProducts = async (req: Request, res: Response, next: NextFunction) => {
        console.log("im here")
        try {

            const data = await Product.aggregate([
                {$match: {discountPercentage: {$gte: 15 }}},
                {$skip: 0},
                {$limit: 100}
            ])

            this.apiResponse('Record fetched successfully', 200, res, data)
        } catch (e) {

            return next(new AppError('Something went wrong please try again', 500, e))
        }
    }
}

export default new ProductController()
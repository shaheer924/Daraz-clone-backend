import {NextFunction, Request, Response} from "express";
import AppError from "../utils/AppError";

class BaseController {
    public repos: any
    constructor(repos: any) {
        this.repos = repos
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let page: any = req.query.page || 1
            let limit: any = req.query.limit || 10

            const data = await this.repos.model.aggregate([
                {"$limit": limit},
                {"skip": ( page - 1) * limit},

            ])

            let responseBody = {
                meta: {
                    totalRecords: data.length,
                    perPage: limit,
                    currentPage: page,
                    totalPages: Math.ceil(data.length / limit)
                },
                data: data
            }
            this.apiResponse('record fetched successfully', 200, res, responseBody)
        } catch (err) {
            return next(new AppError('Something went wrong please try again', 500, err))
        }

    }

    store = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.body) return next(new AppError("Please provide data", 400))
            let data = await this.repos.model.create(req.body)
            this.apiResponse("Record created successfully", 201, res, data)
        } catch (e) {
            return next(new AppError("Something went wrong please try again", 500, e))
        }
    }

    storeMany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.body) return next(new AppError("Please provide data", 400))
            let data = await this.repos.model.create(req.body)
            this.apiResponse("Record created successfully", 201, res, data)
        } catch (e) {
            return next(new AppError("Something went wrong please try again", 500, e))
        }
    }

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = await this.repos.show(req.params.id)
            if(!data) return next(new AppError('No product found', 404))
            this.apiResponse('record fetched successfully', 200, res, data)
        } catch (err) {
            return next(new AppError('Something went wrong please try again', 500, err))
        }
    }

    update = (req: Request, res: Response) => {

    }

    delete = (req: Request, res: Response) => {

    }

    deleteMany = (req: Request, res: Response) => {

    }

    apiResponse(message: string, status: number, res: Response, data: any = {},  meta: any = undefined, token: any = undefined) {
        res.status(status).json({
            message,
            success: true,
            meta,
            data,
            token
        })
    }
}

export default BaseController
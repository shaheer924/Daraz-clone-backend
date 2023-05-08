import {Request, Response} from "express";
import ApiFeatures from "../utils/ApiFeatures";

class BaseController {
    public repos: any
    constructor(repos: any) {
        this.repos = repos
    }

    index = async (req: Request, res: Response) => {
        console.log("here")
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
        } catch (e) {
            
        }

    }

    store = async (req: Request, res: Response) => {
    }

    storeMany = (req: Request, res: Response) => {

    }

    show = (req: Request, res: Response) => {

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
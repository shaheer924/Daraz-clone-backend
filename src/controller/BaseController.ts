import {Request, Response} from "express";

class BaseController {
    public repos: any
    constructor(repos: any) {
        this.repos = repos
    }

    index = async (req: Request, res: Response) => {
        try {
            const users = await this.repos.index(req.query)
            let meta = {
                total: users.length,
                page: 1,
                per_page: 10
            }
            this.apiResponse('record fetched successfully', 200, res, users, meta)
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
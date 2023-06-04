import {NextFunction, Response} from "express";

export const ProductMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    let query: any = req.query
    let page: number = parseInt(query.page)
    let limit: number = parseInt(query.limit)
    let skip: number = ( page - 1 ) * limit

    let search: any = new RegExp(query.query)

    let sortField: string = query.sort_key
    let sortOrder: string = query.sort

    let queryObj = {
        query: search,
        limit: limit,
        skip: skip,
        sort: {sortField: sortOrder}
    }
}

export default ProductMiddleware
import {NextFunction, Request, Response} from "express";
import {Error} from "mongoose";

const DuplicateValues = (msg: string) => {

}

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    let statusCode = err.statusCode || 500
    let message = err.message


    let error = {...err}
    error.message = message

    console.log(error)

    res.status(statusCode).json({
        message: err.message,
        success: false,
        error: err,
        stack: err.stack,
    })
}

export default ErrorHandler
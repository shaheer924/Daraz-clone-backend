import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import UserRepos from "../repos/UserRepos";
import AppError from "../utils/AppError";

const AuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization?.startsWith("Bearer")){
            token = req.headers.authorization?.split(" ")[1]
        }
        // @ts-ignore
        let decoded = jwt.decode(token)

        let user = await UserRepos.model.findOne({_id: decoded?.id})
        if(!user){
            return next(new AppError('Unauthenticated',401))
        }
        // @ts-ignore
        req.user = user
        next()
    } catch (e) {
        return next(new AppError(JSON.stringify(e),500))
    }

}

export default AuthenticationMiddleware
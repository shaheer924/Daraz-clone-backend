import BaseRepos from "./BaseRepos";
import Reviews from "../model/Reviews";
import {NextFunction, Request, Response} from "express";

class ReviewRepos extends BaseRepos{
    constructor() {
        super(Reviews);
    }

}

export default new ReviewRepos()
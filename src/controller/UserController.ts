import BaseController from "./BaseController";
import UserRepos from "../repos/UserRepos";
import {NextFunction, Request, Response} from "express";
import AppError from "../utils/AppError";
import Email from "../utils/Email";
import {registerUser, loginUser} from '../validations/AuthenticationValidation'

class UserController extends BaseController {
    constructor() {
        super(UserRepos);
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await registerUser.validateAsync(req.body)

            const check_user = await UserRepos.model.findOne({email: data?.email})

            if(check_user) return next(new AppError('user with the given email already exist',400))

            const user = await UserRepos.store(data)

            return this.apiResponse('User registered successfully', 200, res, user)
        } catch (e) {
            console.log(e)
            return next(new AppError(JSON.stringify(e), 500, e))
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const {email, password} = await loginUser.validateAsync(req.body)

            const user = await UserRepos.model.findOne({ email: email})

            if(!user) {
                return next(new AppError('no user found with the email', 400))
            }

            if(!(await user.correct_password(user.password, password))) {
                return next(new AppError('password is incorrect', 400))
            }

            let token = UserRepos.signToken(user._id)
            this.apiResponse('User signed successfully', 200, res, user,undefined,token)
        } catch (e) {
            return next(new AppError(JSON.stringify(e), 500))
        }
    }

    changePassword = async (req: Request, res: Response,  next: NextFunction) => {
        try {
            // @ts-ignore
            let user = await UserRepos.model.findOne({email: req.user.email})

            if(!(await user.correct_password(user.password, req.body.current_password))) {
                return next(new AppError('current password is incorrect', 400))
            }

            user.password = req.body.new_password
            user.confirm_password = req.body.confirm_password
            await user.save({validateBeforeSave: true})

            this.apiResponse('password changed successfully',200,res, user)
        } catch (e) {
            return next(new AppError(JSON.stringify(e), 500))
        }
    }

    unActiveUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email} = req.body

            const check_user = await UserRepos.model.findOne({email: email})

            if(!check_user) return next(new AppError('no email found', 400))

            await UserRepos.update(check_user._id, {active: false})

            this.apiResponse('user is inactive', 200, res)
        } catch (e) {
            return next(new AppError(JSON.stringify(e), 500))
        }
    }

    verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email} = req.body

            let user = await UserRepos.model.findOne({email: email})

            if(!user) return next((new AppError('No user found with this email', 404)))

            let emailSend = await UserRepos.generateOtpWithEmail(email)

            if(!emailSend){
                return next(new AppError('Something went wrong', 400))
            }

            this.apiResponse('Your OTP code sent to your email', 200,res)

        } catch (e) {
            return next(new AppError(JSON.stringify(e), 500))
        }
    }

    verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let {email, otp} = req.body

            let user = await UserRepos.model.findOne({email: email}).select('+otp_code')

            if(user.otp_code_expires < (new Date().getTime())) return next(new AppError('otp verification time expires', 400))

            if(otp != user.otp_code) return next(new AppError('Invalid Otp', 400))

            await UserRepos.model.updateOne({email: email}, {
                is_verified: true
            })

            user = await UserRepos.show(user._id)

            this.apiResponse('User verification successful', 200, res, user)

        } catch (e) {
            return next(new AppError(JSON.stringify(e), 500))
        }
    }

    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let {email} = req.body
            let user  = await UserRepos.model.findOne({email: email})

            if(!user) return next(new AppError('No user found with this email',404))

            const resetToken = user.create_password_reset_token()
            user.save({validateBeforeSave: false})

            let resetUrl = `http://localhost:5000/api/v1/user/reset-password/${resetToken}`
            let message = `Forgot your password don't worry\n please click below link to reset your password\n${resetUrl}`

            let emailSend = new Email(email, message, 'password reset url')
            await emailSend.sendEmail()

            if(!emailSend) return next(new AppError('Something went wrong',400))

            this.apiResponse('Password reset token send to email',200, res, {email})
        } catch (e) {
            return next(new AppError(JSON.stringify(e), 500))
        }
    }

    reset_password = async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const {reset_token} = req.params

            const user = await UserRepos.model.findOne({password_reset_token: reset_token, password_reset_expires: {$gte: Date.now()}})


            if(!user) return next(new AppError('password reset time expired',400))

            user.password = req.body.password
            user.confirm_password = req.body.confirm_password
            user.save()

            this.apiResponse('password updated successfully',200,res)
        } catch (e) {
            return next(new AppError(JSON.stringify(e), 500))
        }
    }


}

export default new UserController()
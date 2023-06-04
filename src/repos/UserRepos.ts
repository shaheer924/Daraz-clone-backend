import BaseRepos from "./BaseRepos";
import User from "../model/User";
import jwt from "jsonwebtoken"
import Email from "../utils/Email";

class UserRepos extends BaseRepos {
    constructor() {
        super(User);
    }

    signToken = (id: string) => {
        return jwt.sign({id},'I am happy with my job and life my laptop',{
            expiresIn: '1d'
        })
    }

    generateOtpWithEmail = async (email: string) => {
        let otp_code = Math.floor(1000 + Math.random() * 9000);

        await User.updateOne({email: email}, {
            otp_code: otp_code,
            otp_code_expires:new Date().getTime() + 60*10*1000
        })

        let message = `Your OTP code is ${otp_code}`
        let subject = `Verify Email`
        let sendMail = new Email(email, message, subject)
        let mail = await sendMail.sendEmail()

        return mail
    }
}

export default new UserRepos()
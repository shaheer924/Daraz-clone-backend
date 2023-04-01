import nodemailer from 'nodemailer'
import AppError from "./AppError";

export default class Email  {
    public mailOptions: any
    constructor(email:string, message: string, subject: string) {

        this.mailOptions = {
            from: "Syed Shaheer syedshaheer0331@gmail.com",
            to: email,
            subject: subject,
            text: message

        }

    }
    public async sendEmail() {
        try {
            let transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "113d4ce3bc3af2",
                    pass: "0e40117e9df2dd"
                }
            });

            await transport.sendMail(this.mailOptions)
            return true
        } catch (e) {
            return new AppError(JSON.stringify(e),400)
        }


    }
}
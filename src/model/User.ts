import mongoose from "mongoose";
import {NextFunction} from "express";
import bcrypt from 'bcryptjs'
import * as crypto from "crypto";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username should be unique']
    },
    image: {
        type: String,
        default: "https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png"
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email should be unique']
    },
    password: {
        type: String,
        required: ['true', 'password is required'],
    },
    confirm_password: {
        type: String,
        required: ['true', 'password is required'],
        validate: function (value: any) {
            // @ts-ignore
            return this.password === value
        }
    },
    is_first_login: {
        type: Boolean,
        default: false
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    otp_code: {
        type: Number,
        select: false
    },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: 'buyer'
    },
    password_changed_at: Date,
    password_reset_token: String,
    password_reset_expires: Date,
    otp_code_expires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

// @ts-ignore
userSchema.pre("save", async function (next: NextFunction) {
    if(!this.isModified('password')) return next()
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, 12)
    this.confirm_password = undefined
})

// @ts-ignore
userSchema.pre(/^find/, function (next: NextFunction){
    this.find({active: {$ne: false}})
    next()
})

userSchema.methods.correct_password = async function (candidate_password: string, confirm_password: string) {
    return bcrypt.compare(confirm_password, candidate_password)
}

userSchema.methods.create_password_reset_token = function () {
    let resetToken = crypto.randomBytes(32).toString('hex')
    resetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.password_reset_token = resetToken
    this.password_reset_expires = Date.now() + 10*60*1000

    console.log(this.password_reset_token)
    return resetToken
}


const User = mongoose.model('users', userSchema)

export default User
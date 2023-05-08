import joi from 'joi'

export const registerUser = joi.object().keys({
    first_name: joi.string().alphanum().min(3).max(100),
    last_name: joi.string().alphanum().min(3).max(100),
    username: joi.string().alphanum().min(3).max(100).required(),
    email: joi.string().email(),
    password: joi.string().alphanum().min(8).max(50),
    confirm_password: joi.string().alphanum().min(8).max(50),
    role: joi.string().required()
})

export const loginUser = joi.object().keys({
    username: joi.string().alphanum().min(3).max(100),
    email: joi.string().email(),
    password: joi.string().alphanum().min(8).max(50),
})
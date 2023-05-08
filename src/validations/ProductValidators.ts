import joi from 'joi'

export const registerProduct = joi.object().keys({
    name: joi.string().min(3).max(100).required(),
    price: joi.number().required(),
    description: joi.string().min(3).max(500).required(),
    brand: joi.string(),
    quantity: joi.number().required(),
    image: joi.array().items(joi.string()),
})
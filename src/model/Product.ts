import mongoose, {Schema, Types} from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    is_available: {
        type: Boolean,

        default: false
    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {}

})

const Product = mongoose.model('products', productSchema)

export default Product
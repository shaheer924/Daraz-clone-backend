import mongoose, {Schema, Types} from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    images: [{
        type: String,
        required: false
    }],
    rating: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
})

const Product = mongoose.model('products', productSchema)

export default Product
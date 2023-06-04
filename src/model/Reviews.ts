import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: [true, "user_id is required"]
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: [true, "product_id is required"]
    },
    reviews: {
        type: String,
        required: [true, 'review is required']
    },
    star: {
        type: Number,
        min: [0, "star cannot be less than 0"],
        max: [5, "star cannot be less than 5"],
        required: [true, "Stars are required"]
    },
    images: [{
        type: String,
    }]
})

const Reviews = mongoose.model("reviews", ReviewsSchema)

export default Reviews
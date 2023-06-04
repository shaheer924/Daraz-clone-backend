import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: [true, "Product is required"]
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"]
    },
    total_price: {
        type: Number,
    },
    deleted_at: {
        type: Date
    }
},{
    timestamps: true
})

const Cart = mongoose.model("carts", CartSchema)

export default Cart
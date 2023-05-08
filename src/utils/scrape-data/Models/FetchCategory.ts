import mongoose from "mongoose";

const FetchCategory = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})
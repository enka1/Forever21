import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    code: {
        name: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    information: [{
        title: {
            type: String
        },
        content: {
            type: String
        }
    }],
    patterns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pattern'
    }],
    importDate: {
        type: Date
    },
    importPrice: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Product', ProductSchema)
import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
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
        type: Number
    },
    export_Price: {
        type: Number
    },
    quantity: {
        type: Number
    }
})

export default mongoose.model('Product', ProductSchema)
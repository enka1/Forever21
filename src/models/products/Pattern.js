import mongoose from 'mongoose'

const PatternSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    patternColorType: {
        name: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        }
    },
    images: [{
        type: String
    }],
    size: [{
        type: String
    }]
})

export default mongoose.model("Pattern", PatternSchema)
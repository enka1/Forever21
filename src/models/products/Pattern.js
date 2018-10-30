import mongoose from 'mongoose'

const PatternSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId
    },
    images: [{
        type: String
    }],
    size: [{
        type: String
    }]
})

export default mongoose.model("Pattern", PatternSchema)
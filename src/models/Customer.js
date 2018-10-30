import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const CustomerSchema = new mongoose.Schema({
    display_name:{
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'User'
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    }
})

CustomerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        let salt = await bcrypt.genSalt(10)
        this.password = bcrypt.hash(this.password, salt)
    }
    next()
})

CustomerSchema.static.findByCrendentials = async (username, password) => {
    let salt = await bcrypt.genSalt(10)
    password = bcrypt.hash(password, salt)
    let user = await model.findOne({
        username,
        password
    })
    return user
}

CustomerSchema.methods.generateToken = function () {
    this.token = jwt.sign({ _id: this._id, role: this.role }, process.env.TOKEN_SECRET)
    this.save()
    return this.token
}
const model = mongoose.model('Customer', CustomerSchema)
export default model
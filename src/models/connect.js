import mongoose from 'mongoose'

export default function() {
   let mongodbURL = `mongodb://${process.env.MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017`
   mongoose.connect(mongodbURL, { useNewUrlParser: true }).catch(er => console.log(er))
   mongoose.set('debug', true)
}
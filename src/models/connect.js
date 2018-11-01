import mongoose from 'mongoose'

export default function() {
   let mongodbURL = `mongodb://${process.env.MONGODB_SERVICE}:27017/Shopping`
   mongoose.connect(mongodbURL, { useNewUrlParser: true }).catch(err => {
      console.log(err)
      process.exit(0)
   })
   mongoose.set('debug', true)
}
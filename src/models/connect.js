import mongoose from 'mongoose'

export default function(url){
    mongoose.connect(url, {
        useNewUrlParser: true
    }).catch(er => console.log(er))
    mongoose.set('debug', true)
} 
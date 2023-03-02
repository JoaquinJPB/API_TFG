const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdviceSchema = new Schema({
    title: { type: String },
    description: {type: String},
    img: {type: String},
},  
)

let ADVICE = mongoose.model('Advice', AdviceSchema)
module.exports = ADVICE
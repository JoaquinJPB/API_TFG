const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BreathSchema = new Schema({
    title: { type: String },
    description: {type: String},
    img: {type: String},
},  
)

let BREATH = mongoose.model('Breath', BreathSchema)
module.exports = BREATH
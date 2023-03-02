const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MeditationSchema = new Schema({
    title: { type: String },
    description: {type: String},
    img: {type: String},
},  
)

let MEDITATION = mongoose.model('Meditation', MeditationSchema)
module.exports = MEDITATION
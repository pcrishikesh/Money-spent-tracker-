let mongoose = require('mongoose')

let schema = mongoose.Schema({
    item:String,
    cost:Number,
    date:String
})

module.exports =  mongoose.model('item', schema)
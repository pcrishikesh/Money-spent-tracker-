let express = require('express')
let app = express()
let bodyparser = require('body-parser')
let mongoose = require('mongoose')
let expressejslayout = require('express-ejs-layouts')

// schema

let itemschema = require('./schema/item')


mongoose.connect('mongodb://localhost:27017/item',  {useNewUrlParser: true})


app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(expressejslayout)
app.use(express.static('public'))


let sum = 0

app.get("/", async(req,res)=> {
    let itemfind = await itemschema.find()
    let itemfindcost = await itemschema.find({}).select('cost')


    let sum = await itemschema.aggregate(
         [{
           $group: {
               _id: null,
               total: {$sum: "$cost"}
           }
           }]
       );


    res.render('index.ejs', {itemfind, sum})
})

app.get('/additem', (req,res)=> {
    res.render('add.ejs')
})

app.post('/add',async(req,res)=> {
    let itemcreate = await itemschema.create({
        item:req.body.item,
        cost:req.body.cost,
        date:req.body.date
    })

    res.redirect('/')

})

app.get("/deleteitem/:id", (req,res)=> {
    res.send('hi')
    console.log(req.params.id);
})


app.listen(8080, () => console.log("server running"))

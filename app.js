let express = require('express')
let app = express()
let bodyparser = require('body-parser')
let mongoose = require('mongoose')


app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({ extended: false }))

app.use(express.static('public'))

app.get("/", (req,res)=> {
    res.render('index.ejs')
})

app.get('/additem', (req,res)=> {
    res.render('add.ejs')
})


app.listen(8080, () => console.log("server running"))
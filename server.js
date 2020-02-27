const http = require('http')
const express = require('express')
const app = express()
const User = require('./routes/userRoute')
const mongoose = require('mongoose')
const cors=require('cors')


mongoose.connect('mongodb+srv://Ahmad:Ahmad78965@cluster0-copnl.mongodb.net/test?retryWrites=true&w=majority'
    ,{
        useNewUrlParser:true,
        useCreateIndex:true,useUnifiedTopology:true
    }
).then((res) => console.log('connected')).catch(err => console.log(err));
app.use(cors())
app.use(express.json())

app.use('/',User)


const port= process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server starte listening at localhost:${port}`)
})
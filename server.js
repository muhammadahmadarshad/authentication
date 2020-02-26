const http = require('http')
const express = require('express')
const app = express()
const User = require('./routes/userRoute')
const mongoose = require('mongoose')

const server = http.createServer(express);

mongoose.connect(
    'mongodb+srv://Ahmad:ahmad123@users-skp63.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }
).then((res) => console.log('connected')).catch(err => console.log(err));

app.use(express.json())
app.use('/',User)


server.listen(8080, () => {
    console.log('Server starte listening at localhost:8080')
})
const mongoose = require('mongoose')
require('dotenv').config()
// console.log(process.env)

mongoose.connect(process.env.URL, {useNewUrlParser : true})
mongoose.connection.on('connected', (err, res)=>{
   console.log(`mongoDb is connected to Review_Rating`)
})
mongoose.connection.on('error', (err, res)=>{
   console.log('mongoDb connection error' + err)
})


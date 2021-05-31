const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');


const app = express();


//Connect DB 
mongoose.connect('mongodb+srv://atakan:atakan123@smartedu.swhav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Veritabanına bağlantı saplandı")
}).catch((err)=>{
    console.log(err);
})
 
//Template Engine

app.set('view engine','ejs');

//Middlewares
app.use(express.static('public'));

app.use('/',pageRoute);


const port = 3000;
app.listen(port,()=>{
    console.log(`App started on port ${port}`)
})
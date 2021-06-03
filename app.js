const   express = require('express'),
        mongoose = require('mongoose'),
        session = require('express-session'),
        MongoStore = require('connect-mongo'),
        pageRoute = require('./routes/pageRoute'),
        courseRoute = require('./routes/courseRoute'),
        categoryRoute = require('./routes/categoryRoute'),
        userRoute = require('./routes/userRoute')

const app = express();


//Connect DB 
mongoose.connect('mongodb+srv://atakan:atakan123@smartedu.swhav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Veritabanına bağlantı saplandı")
}).catch((err) => {
    console.log(err);
})

//Template Engine

app.set('view engine', 'ejs');


//GLOBAL Veriables

global.userIN = null;


//Middlewares

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://atakan:atakan123@smartedu.swhav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    })
}))


//Routes
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);



const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})
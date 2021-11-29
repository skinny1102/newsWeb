const express = require('express');
const app = express();
const PORT=process.env.PORT|| 3000;
const path = require('path')

const multipart = require('connect-multiparty');
const express_handlebars_sections = require('express-handlebars-sections');
const exphbs  = require('express-handlebars');

const connectDB = require('./config/db')
const routerPost = require('./routes/posts')
const routerAdmin = require('./routes/admin')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const session = require('express-session');

app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {},
    }),
);


app.engine('handlebars', exphbs({
    helpers:{
        section: express_handlebars_sections()
    }
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
connectDB()

app.use('',routerPost);
app.use('/admin',routerAdmin);

app.listen(PORT,()=>{
   console.log( `Server đang chạy ở PORT : ${PORT}`)
})
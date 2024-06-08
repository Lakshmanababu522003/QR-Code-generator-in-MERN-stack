const app=require('express')();
require('dotenv').config({path:'./config.env'});
const cors=require('cors');
const morgan=require('morgan');
const bodyParser=require('body-parser');

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(cors());
app.use(morgan('dev'));

require('./db/conn');


app.use('/api',require('./routes/pubRou'));

app.listen(4000,() =>{
    console.log('server start');
});
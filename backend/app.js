const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoute = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');

//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
    
}).then(()=>console.log("Db connected"))
.catch((err)=>console.log(err));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyparser.json({limit: "5mb"}));
app.use(bodyparser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

// error middleware
app.use(errorHandler);

//ROUTES
//app.get('/', (req,res) =>{
  //  res.send("hello from node js");
//})

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);


const port = process.env.PORT || 8000

app.listen(port, ()=> {
    console.log(`server running on ${port}`);
});
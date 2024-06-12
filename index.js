const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


require('dotenv').config()
require('./config/db')

const port = process.env.PORT || 4000;
const userRouter = require('./routes/userRoutes')

const app = express();
app.use(bodyparser.json());
app.use(express.json())
app.use(cors());


app.get('/',(req,res)=>{
    res.status(200).json({
        message:"compunet basic backend setip complete."
    })
})

app.use('/users',userRouter)

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
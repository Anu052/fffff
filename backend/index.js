const mongoose=require('mongoose');
const connectToDB=require('./db');
const express = require('express');
var cors=require('cors');
connectToDB();
const app = express()
mongoose.connect('mongodb+srv://anu052:Anurag2023@cluster0.ocuv7ec.mongodb.net/clgproject?retryWrites=true&w=majority')
.then(()=>console.log("connection success"))
.catch((err)=>console.log(err));

const port=5000;
//Available Routes
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

//app.get('/', (req, res) => {
//  res.send('Hello World anurag!')
//})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

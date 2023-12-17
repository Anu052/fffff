const mongoose=require('mongoose');
/*const connectToDB =()=>
{
console.log("mongodb connected success");
}
*/
const connectToDB = () =>{
    mongoose.connect('mongodb+srv://anu052:Anurag2023@cluster0.ocuv7ec.mongodb.net/clgproject?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(()=>console.log("connection success"))
    .catch((err)=>console.log(err));
}
module.exports=connectToDB;
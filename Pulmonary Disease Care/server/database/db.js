import mongoose from "mongoose";
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/PulmocareDB').then(()=>{
    console.log('Connected to monogoDB');}).catch((error) => {
    console.log('Not Connected',error);
})







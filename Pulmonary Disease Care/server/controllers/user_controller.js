
import User from "../model/UserModel.js";


export const RegUser = (request,response) =>{
    const user = request.body;
    
    const newUser = new User(user);

    try{
        newUser.save();
        response.status(201).json(newUser)
    }
    catch(error){
        response.status(209).json({message:error.message});
    }

}
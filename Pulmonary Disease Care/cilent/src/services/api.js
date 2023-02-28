import axios from 'axios' ;


const URL = 'http://localhost:8000';


export const RegUser = async (data) =>{
     try {
        return await axios.post(`${URL}/register`,data);
     } catch (error) {
        console.log('Error while Register',error);
     } 
}






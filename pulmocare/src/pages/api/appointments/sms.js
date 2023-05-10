export default async function handler() {
    const accountSid = process.env.ACCOUNT_ID; 
    const authToken = process.env.ACCOUNT_TOKEN; 
    const client = require('twilio')(accountSid, authToken); 
     
    client.messages 
          .create({ 
             body: 'Booking id Done',  
             messagingServiceSid: 'MGb045d15ba59ecb30fa1af8d2c8be87e0',      
             to: '+917356215600' 
           }) 
          .then(message => console.log(message.sid)) 
  
        }
const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = () =>{
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@tudoem1.pre9i.mongodb.net/?retryWrites=true&w=majority&appName=tudoem1`)
    .then(() => {
        console.log("Conectado ao MongoDB");
    })
    .catch(err => {
        console.error("Erro ao conectar ao MongoDB:", err.message);
    });
    
     
}
connect();
module.exports = mongoose;
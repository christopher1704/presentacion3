// mongodb+srv://mean_user:ifdtT8NThMMbqOyG@cluster0.9f9r5.mongodb.net/hospitaldb

// Aca dentro va la configuracion de mongoose
const mongoose = require('mongoose');

const dbConnection = async () =>{    //el async await nos permite trabajar con promesas como si fueran sincronas
    try {
        await mongoose.connect("mongodb+srv://mean_user:ifdtT8NThMMbqOyG@cluster0.9f9r5.mongodb.net/user");
        console.log("DB Online")
    }catch (error) {
        throw new Error("Error a la hora de iniciar la BD"); 
    }

}

module.exports = {
    dbConnection : dbConnection
}
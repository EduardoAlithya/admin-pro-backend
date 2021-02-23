const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,
        {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true,
           useFindAndModify: false
       });

       console.log('db conectada');
    } catch (error) {
        console.log("Error a la hora de iniciar DB vonnect ver logs");
    }


}

module.exports = {
    dbConnection
}
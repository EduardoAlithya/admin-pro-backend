const express = require('express'); //1
require('dotenv').config();//3 const process
const { dbConnection } = require('./database/config');//2
const cors = require('cors')//4
//crear servidor express
const app = express();//1
// configurar cors
app.use(cors());//4
// conectar db
dbConnection();//2



app.get('/', (req, res) => {
    res.json({
        ok: 'true',
        message: 'hola mundo'
    });
});

app.listen (process.env.PORT, ()=> {
    console.log('corriendo server en puerto: ' + process.env.PORT );
})

//zz8kgAwLPN19KxVp
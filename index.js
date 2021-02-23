const express = require('express'); //1
require('dotenv').config();//3 const process
const { dbConnection } = require('./database/config');//2
const cors = require('cors')//4
//crear servidor express
const app = express();//1
// configurar cors
app.use(cors());//4
// lectura del body (post) 5
app.use( express.json() );
// conectar db
dbConnection();//2

//rutas 6
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );

app.listen (process.env.PORT, ()=> {
    console.log('corriendo server en puerto: ' + process.env.PORT );
})

//zz8kgAwLPN19KxVp
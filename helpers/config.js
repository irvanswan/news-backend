const {Client} = require('pg')
require("dotenv").config()

const pg  = (process.env.VERSION_STATE == 'production') ?
    new Client({
        host:process.env.DB_HOST,
        port:process.env.DB_PORT || 3030,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false
        }
    })  
    : 
    new Client({
        host:process.env.DB_HOST,
        port:process.env.DB_PORT || 3030,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
    });

pg.connect()
.then(()=> console.log('Database Connect'))
.catch((err)=>console.log('Database Filed Connect', err))

module.exports = pg
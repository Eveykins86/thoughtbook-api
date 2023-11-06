require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./api');
const app = express();
const db = require('./connection')

const port = process.env.PORT || 3001




const main = async () => {
    
    db.once('connected', () => {
        console.log('Database Connected');

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(bodyParser.json())
        app.use(apiRoutes)

        app.listen(port, () => {
            console.log('server is running on port ' + port)
        });
    })
}


main().catch(err => console.log(err))
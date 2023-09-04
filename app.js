require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { dbConnect } = require('./config/mongo')

const PORT = process.env.PORT || 3000;

app.use(cors({origin:"http://localhost:3000/"}));

app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Prefijo de ruta:
app.use('/api/1.0', require('./app/routes'));

dbConnect()
app.listen(PORT, () => {
    console.log('API lista por el puerto ', PORT);
})
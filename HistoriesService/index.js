require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const path = require('path');

const PORT = process.env.PORT || 7000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); 
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}

start();


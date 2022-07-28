// getting-started.js
const mongoose = require('mongoose');

const dbConection = async() => {

    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB online')
    } catch (error){
        console.log(error);
    }
}

module.exports = {
    dbConection
}

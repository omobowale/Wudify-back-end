const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
    'wudify',
    'omobowale',
    '147258stiga',
    {
        dialect: 'mysql',
        host: 'localhost'
    })


const connectToDb = async () => {
    try {
        sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
    } catch (e) {
        console.log("Error connecting to database", e)
    }
}


module.exports = { connectToDb, sequelize }
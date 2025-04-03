// import config which contains the connection string to connect to the db
const config = require('../utils/config')

// import Sequelize from the npm dependency
const { Sequelize } = require('sequelize')

// create a new instance of Sequelize with our connection
const sequelize = new Sequelize(config.POSTGRES_URI)

const db = {}
db.sequelize = sequelize
// export this instance for use in our application
module.exports = db
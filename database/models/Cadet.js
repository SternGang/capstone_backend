// import the sequelize instance we created
const db = require('../db')
const { DataTypes, UUID } = require('sequelize');

// create a Cadet definition for the Note model
const Cadet = db.sequelize.define('Cadet', {
  // create the primary key id column that is a UUID (contains entropy)
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail:{
    type:DataTypes.STRING,
    allowNull: false
  },
  Password:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {});

module.exports = Cadet
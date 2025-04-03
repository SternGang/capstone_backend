// import the sequelize instance we created
const db = require('../db')
const { DataTypes, UUID } = require('sequelize');

// create a Cadet definition for the Note model
const Bone = db.sequelize.define('Bone', {
  // create the primary key id column that is a UUID (contains entropy)
  BoneCodeId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Demerits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PenaltyTours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {});

module.exports = Bone
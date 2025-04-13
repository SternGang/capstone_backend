const db = require('../db')
const { DataTypes, UUID } = require('sequelize');

// create a Cadet definition for the Note model
const Bone = db.sequelize.define('Events', {
  // create the primary key id column that is a UUID (contains entropy)
  EventId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  CadetID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  BoneCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {});

module.exports = Bone
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../util/dbsql');

const Item = sequelize.define('item',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        // allowNull: false
    },
})

module.exports = Item; 
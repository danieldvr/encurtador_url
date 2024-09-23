const Sequelize = require('sequelize');
const database = require('../db');

const Link = database.define('link', {
    id: {
        type: Sequelize.INTEGER, // Remover UNSIGNED para compatibilidade com SQLite
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Garantir que o código seja único
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hits: {
        type: Sequelize.INTEGER, // Remover UNSIGNED para compatibilidade com SQLite
        allowNull: true,
        defaultValue: 0
    }
});

module.exports = Link;

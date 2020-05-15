const sequelize = require("sequelize")

const conn = require("./db")
const { Sequelize } = require("sequelize")

const Pergunta = conn.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

Pergunta.sync({force:false}).then(()=>{})

module.exports = Pergunta
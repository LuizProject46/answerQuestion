const sequelize = require("sequelize")
const conn = require("./db")
const { Sequelize } = require("sequelize")

const Resposta = conn.define("respostas",{
    corpo :{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false}).then(()=>{})

module.exports = Resposta
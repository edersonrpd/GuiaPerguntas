const Sequelize = require("sequelize")

// TOD conexão com o Mysql
const connection = new Sequelize("guiaperguntas","root","1234", {
  host: "localhost",
  dialect: "mysql"
})

module.exports = connection
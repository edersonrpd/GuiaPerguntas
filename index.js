const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((err) => {
    console.log(msgErro);
  });

//EJS como renderizador de HTML
app.set("view engine", "ejs");
app.use(express.static("public")); //Definir pagina publica para arquivos estaticos

//Body parser
app.use(bodyParser.urlencoded({ extended: false })); //Pega dados do formulário e traduz para Jascript
app.use(bodyParser.json()); //

//Rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  res.send(`Formulário recebido titulo ${titulo}  ${descricao}`);
});

app.listen(3000, () => {
  console.log("Servidor iniciado");
});

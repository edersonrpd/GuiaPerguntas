const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
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
  // select * from perguntas
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //Ordernar do maior para menor
    ],
  }).then((perguntas) => {
    res.render("index", { perguntas: perguntas });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  //Insert do Sequelize
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/"); // Apos postar pergunta direciona para a raiz
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [["id", "DESC"]],
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then((response) => {
    res.redirect("/pergunta/" + perguntaId);
  });
});

app.listen(3000, () => {
  console.log("Servidor iniciado");
});

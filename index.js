const express = require("express");
const app = express();

//EJS como renderizador de HTML
app.set("view engine", "ejs");
app.use(express.static("public")) //Definir pagina publica para arquivos estaticos

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/perguntar", (req, res) => {
  res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
  res.send("Formulário recebido")
})

app.listen(3000, () => {
  console.log("Servidor iniciado");
});

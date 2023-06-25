const express = require("express");
const app = express();
require("dotenv").config();
const porta = process.env.PORTA;
const mongoose = require("mongoose");
const enderecoBanco = process.env.URL_BD;

mongoose.connect(enderecoBanco);

mongoose.connection.on("error", function (erro) {
  console.log("Erro na conexão com o BD " + erro);
});

mongoose.connection.on("disconnected", function () {
  console.log("Aplicação desconectada do BD");
});

mongoose.connection.on("connected", function () {
  console.log("Aplicação conectada ao BD");
});

app.listen(porta, function () {
  console.log("Aplicação rodando na porta " + porta);
});

// localhost:3000 OU IP_API:3000
app.get("/status", (req, res) => {
  res.send({ mensagem: "API online" });
});

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
const produtosController = require("./controller/produtos.js");
app.get("/produtos", produtosController.listarProdutos);
app.post("/produtos", produtosController.adicionarProduto);
app.delete("/produtos", produtosController.removerProduto);
app.get("/buscar-produtos", produtosController.buscarProdutos);

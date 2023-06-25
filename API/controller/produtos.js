const Produtos = require('../model/produto');

//LISTAR
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produtos.find({});
    res.send(produtos);
  } catch (error) {
    console.log(error);
    res.send({mensagem: '[ERRO]: Erro ao listar!'});
  }
}


//CADASTRAR
exports.adicionarProduto = async (req, res) => {
  const novoProduto = req.body;
  if(!novoProduto.nome ||  !novoProduto.preco) {
    res.send({mensagem: '[ERRO]: informar nome e preço!'});
  } else {
    try {
      await Produtos.create(novoProduto);
      res.send({mensagem: '[SUCESSO]: Produto salvo!'});
    } catch (error) {
      console.log(error);
      res.send({ mensagem: '[ERRO]: Erro ao add produto!', detalhes: error });
    }
  }
}

//REMOVER POR NOME
exports.removerProduto = async (req, res) => {
  const produto = req.body
  if(!produto.nome) {
    return res.send({ mensagem: '[ERRO]: Informar nome!' });
  }
  try {
    const produtoRemovido = await Produtos.findOneAndDelete({ nome: produto.nome });
    if(produtoRemovido == null)
      res.send({ mensagem: '[AVISO]: produto não existe no BD!' });
    else
      res.send({ mensagem: '[SUCESSO]: Produto removido!' });
  } catch (error) {
    res.send({ mensagem: '[ERRO]: Erro ao remover!', detalhes: error });
  }
}

//BUSCA
exports.buscarProdutos = async (req, res) => {
  //$eq significa igual a (==)
  //$lt significa menor que (<)
  //$lte significa menor ou igual (<=)
  //$gt significa maior que (>)
  //$gte significa maior ou igual (>=)
  //$ne significa diferente de (!=)
  //$in significa está contido em...
  var { consulta } = req.body;
  consulta = JSON.parse(consulta);

  try {
    const produtos = await Produtos.find(consulta);
    res.send(produtos);
  } catch (erro) {
    res.send({ mensagem: '[ERRO]: consulta personalizada', detalhes: erro });
  }
}
const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto.js');

// Listar produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      order: [['id', 'ASC']]
    });
    res.render('produtos/index', { produtos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar produtos');
  }
});

// Formulário novo produto
router.get('/novo', (req, res) => {
  res.render('produtos/novo');
});

// Cadastrar produto
router.post('/cadastrar', async (req, res) => {
  try {
    const { descricao, quantidade, valor, data } = req.body;
    
    await Produto.create({
      descricao,
      quantidade: parseInt(quantidade),
      valor: parseFloat(valor),
      data: new Date(data)
    });
    
    res.redirect('/produtos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar produto');
  }
});

// Editar produto
router.get('/editar/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }
    res.render('produtos/editar', { produto });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar produto');
  }
});

// Atualizar produto
router.post('/atualizar/:id', async (req, res) => {
  try {
    const { descricao, quantidade, valor, data } = req.body;
    
    await Produto.update({
      descricao,
      quantidade: parseInt(quantidade),
      valor: parseFloat(valor),
      data: new Date(data)
    }, {
      where: { id: req.params.id }
    });
    
    res.redirect('/produtos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar produto');
  }
});

// Deletar produto
router.post('/deletar/:id', async (req, res) => {
  try {
    await Produto.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/produtos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar produto');
  }
});

module.exports = router;
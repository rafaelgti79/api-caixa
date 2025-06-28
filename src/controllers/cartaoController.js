// src/controllers/cartaoController.js
import cartaoService from "../services/cartaoService.js";

const criarCartao = async (req, res) => {
  try {
    const novoCartao = await cartaoService.criarCartao(req.body);
    res.status(201).json(novoCartao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarCartoes = async (req, res) => {
  try {
    const cartoes = await cartaoService.listarCartoes();
    res.json(cartoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const marcarComoFechado = async (req, res) => {
  try {
    const { id } = req.params;
    await cartaoService.marcarCartaoComoFechado(id);
    res.status(200).json({ message: 'Cartão marcado como fechado.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  criarCartao,
  listarCartoes,
  marcarComoFechado
};

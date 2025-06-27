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

export default {
  criarCartao,
  listarCartoes,
};

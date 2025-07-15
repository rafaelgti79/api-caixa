// src/controllers/lojaController.js
import lojaService from "../services/lojaService.js";

const criarLoja = async (req, res) => {
  try {
    const nova = await lojaService.criarLoja(req.body.loja);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listarLojas = async (req, res) => {
  try {
    const lista = await lojaService.listarLojas();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletarLoja = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await lojaService.deletarLoja(id);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default {
  criarLoja,
  listarLojas,
  deletarLoja
};

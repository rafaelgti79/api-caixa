// src/controllers/jogosController.js
import jogosService from "../services/jogosService.js";

const criarJogo = async (req, res) => {
  try {
    const novo = await jogosService.criarJogo(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listarJogos = async (req, res) => {
  try {
    const lista = await jogosService.listarJogos();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  criarJogo,
  listarJogos,
};

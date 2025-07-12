import dinheiroService from "../services/dinheiroService.js";

const criarDinheiro = async (req, res) => {
  try {
    const novaDinheiro = await dinheiroService.criarDinheiro(req.body);
    res.status(201).json(novaDinheiro);
  } catch (err) {
    console.error('Erro ao criar Dinheiro:', err);
    res.status(400).json({ error: err.message });
  }
};

const listarDinheiro = async (req, res) => {
  try {
    const caixaId = req.query.caixaId;
    const dinheiro = await dinheiroService.listarDinheiro(caixaId);
    res.json(dinheiro);
  } catch (err) {
    console.error('Erro ao listar dinheiro:', err);
    res.status(500).json({ error: err.message });
  }
};

const marcarComoFechado = async (req, res) => {
  try {
    const { id } = req.params;
    await dinheiroService.marcarDinheiroComoFechado(id);
    res.status(200).json({ message: 'Dinheiro marcado como fechado.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  criarDinheiro,
  listarDinheiro,
  marcarComoFechado
};

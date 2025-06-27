import fechamentoService from '../services/fechamentoService.js';

const registrarFechamento = async (req, res) => {
  try {
    const dados = req.body;
    const novoFechamento = await fechamentoService.registrarFechamento(dados);
    res.status(201).json(novoFechamento);
  } catch (err) {
    console.error('Erro ao registrar fechamento:', err);
    res.status(400).json({ error: err.message });
  }
};

const listarFechamentos = async (req, res) => {
  try {
    const fechamentos = await fechamentoService.listarFechamentos();
    res.json(fechamentos);
  } catch (err) {
    console.error('Erro ao listar fechamentos:', err);
    res.status(500).json({ error: err.message });
  }
};

export default {
  registrarFechamento,
  listarFechamentos
};

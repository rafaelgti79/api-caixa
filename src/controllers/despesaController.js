import despesaService from '../services/despesaService.js';

const criarDespesa = async (req, res) => {
  try {
    const novaDespesa = await despesaService.criarDespesa(req.body);
    res.status(201).json(novaDespesa);
  } catch (err) {
    console.error('Erro ao criar despesa:', err);
    res.status(400).json({ error: err.message });
  }
};

const listarDespesas = async (req, res) => {
  try {
    const despesas = await despesaService.listarDespesas();
    res.json(despesas);
  } catch (err) {
    console.error('Erro ao listar despesas:', err);
    res.status(500).json({ error: err.message });
  }
};

const fecharTodas = async (req, res) => {
  try {
    await despesaService.fecharTodasDespesas();
    res.status(200).json({ message: 'Despesas fechadas com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const marcarComoFechado = async (req, res) => {
  try {
    const { id } = req.params;
    await despesaService.marcarDespesaComoFechada(id);
    res.status(200).json({ message: 'Despesa marcada como fechada.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  criarDespesa,
  listarDespesas,
  fecharTodas,
  marcarComoFechado
};

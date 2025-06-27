import historicoService from '../services/historicoCaixaService.js';

const listarHistorico = async (req, res) => {
  try {
    const historico = await historicoService.listarHistorico();
    res.json(historico);
  } catch (err) {
    console.error('Erro histórico:', err);
    res.status(500).json({ error: err.message });
  }
};

const salvarHistorico = async (req, res) => {
  try {
    const novoHistorico = req.body;
    await historicoService.salvarHistorico(novoHistorico);
    res.status(201).json({ message: 'Histórico salvo com sucesso.' });
  } catch (err) {
    console.error('Erro ao salvar histórico:', err);
    res.status(500).json({ error: err.message });
  }
};

export default {
  listarHistorico,
  salvarHistorico,
};

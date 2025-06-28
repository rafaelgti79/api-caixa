import reforcoService from '../services/reforcoService.js';

const criarReforco = async (req, res) => {
  try {
    const novaReforco = await reforcoService.criarReforco(req.body);
    res.status(201).json(novaReforco);
  } catch (err) {
    console.error('Erro ao criar Reforco:', err);
    res.status(400).json({ error: err.message });
  }
};

const listarReforco = async (req, res) => {
  try {
    const reforco = await reforcoService.listarReforco();
    res.json(reforco);
  } catch (err) {
    console.error('Erro ao listar reforco:', err);
    res.status(500).json({ error: err.message });
  }
};

const marcarComoFechado = async (req, res) => {
  try {
    const { id } = req.params;
    await reforcoService.marcarReforcoComoFechado(id);
    res.status(200).json({ message: 'Reforço marcado como fechado.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  criarReforco,
  listarReforco,
  marcarComoFechado
};

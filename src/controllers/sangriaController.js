import sangriaService from '../services/sangriaService.js';

const criarSangria = async (req, res) => {
  try {
    const novaSangria = await sangriaService.criarSangria(req.body);
    res.status(201).json(novaSangria);
  } catch (err) {
    console.error('Erro ao criar sangria:', err);
    res.status(400).json({ error: err.message });
  }
};

const listarSangria = async (req, res) => {
  try {
    const sangria = await sangriaService.listarSangria();
    res.json(sangria);
  } catch (err) {
    console.error('Erro ao listar sangria:', err);
    res.status(500).json({ error: err.message });
  }
};

export default {
  criarSangria,
  listarSangria
};

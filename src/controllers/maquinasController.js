import maquinasService from "../services/maquinasService.js";

const criarMaquina = async (req, res) => {
  try {
    const nova = await maquinasService.criarMaquina(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listarMaquinas = async (req, res) => {
  try {
    const { fechada } = req.query;
    const fechadaBool = fechada === 'true' ? true : fechada === 'false' ? false : null;
    const maquinas = await maquinasService.listarMaquinas(fechadaBool);
    res.status(200).json(maquinas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const atualizarMaquina = async (req, res) => {
  try {
    const { id } = req.params;
    const { inicial, final } = req.body;

    // Somente atualiza os campos que existem na tabela
    const dadosParaAtualizar = {};
    if (inicial !== undefined) dadosParaAtualizar.inicial = inicial;
    if (final !== undefined) dadosParaAtualizar.final = final;

    const atualizada = await maquinasService.atualizarMaquina(id, dadosParaAtualizar);
    res.status(200).json(atualizada);
  } catch (err) {
    console.error('Erro ao atualizar máquina:', err);
    res.status(400).json({ error: err.message });
  }
};

const editarMaquina = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    const resultado = await maquinasService.editarMaquina(id, dadosAtualizados);
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Erro ao editar máquina:', error);
    res.status(400).json({ error: error.message });
  }
};

const buscarMaquinaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const maquina = await maquinasService.buscarPorId(id);

    if (!maquina) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    res.status(200).json(maquina);
  } catch (err) {
    console.error('Erro ao buscar máquina:', err);
    res.status(500).json({ error: err.message });
  }
};

const excluirMaquina = async (req, res) => {
  try {
    const { id } = req.params;
    await maquinasService.excluirMaquina(id);
    res.status(200).json({ message: "Máquina excluída com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir máquina:", err);
    res.status(400).json({ error: err.message });
  }
};





export default { criarMaquina, listarMaquinas, atualizarMaquina, editarMaquina, buscarMaquinaPorId, excluirMaquina };

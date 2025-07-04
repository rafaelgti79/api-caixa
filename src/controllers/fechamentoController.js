import fechamentoService from '../services/fechamentoService.js';


const registrarFechamento = async (req, res) => {
  try {
    const dados = req.body;
   const resultado = await fechamentoService.registrarFechamento(dados);

    res.status(201).json({ message: 'Fechamento salvo com sucesso', resultado });
  } catch (err) {
    console.error('Erro ao registrar fechamento:', err);
    res.status(400).json({ error: err.message });
  }
};

const marcarComoFechado = async (req, res) => {
  try {
    const id = req.params.id;
    await fechamentoService.marcarFechamentoComoFechado(id);
    res.status(200).json({ message: 'Fechamento marcado como fechado.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

const atualizarFechamentoCompleto = async (req, res) => {
  try {
    const id = req.params.id;
    const dados = req.body;
    const atualizado = await fechamentoService.atualizarFechamento(id, dados);
    res.status(200).json({ message: 'Fechamento atualizado com sucesso', atualizado });
  } catch (err) {
    console.error('Erro ao atualizar fechamento:', err);
    res.status(500).json({ error: err.message });
  }
};


export default {
  registrarFechamento,
  marcarComoFechado,
  listarFechamentos,
  atualizarFechamentoCompleto
};



/*
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

const marcarComoFechado = async (req, res) => {
  try {
    const id = req.params.id;
    await fechamentoService.marcarFechamentoComoFechado(id);
    res.status(200).json({ message: 'Fechamento marcado como fechado.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  marcarComoFechado,
  listarFechamentos
};
*/

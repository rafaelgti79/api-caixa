import caixaService from '../services/caixaService.js';

const abrirCaixa = async (req, res) => {
  try {
    const dados = req.body;
    const novaAbertura = await caixaService.abrirCaixa(dados);
    res.status(201).json(novaAbertura);
  } catch (err) {
    console.error('Erro ao abrir caixa:', err);
    res.status(400).json({ error: err.message }); // Agora retorna o erro caso já haja um caixa aberto
  }
};

const listarCaixas = async (req, res) => {
  try {
    const caixas = await caixaService.listarCaixas();
    res.json(caixas);
  } catch (err) {
    console.error('Erro listar caixas:', err);
    res.status(500).json({ error: err.message });
  }
};

// caixaController.js
const verificarStatusCaixa = async (req, res) => {
  const { usuario } = req.query;
  try {
    const status = await caixaService.buscarStatusAtual(usuario);
    res.json({ status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const atualizarCaixa = async (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;

  try {
    const resultado = await caixaService.atualizarCaixa(id, dadosAtualizados);
    res.json(resultado);
  } catch (err) {
    console.error('Erro ao atualizar caixa:', err);
    res.status(400).json({ error: err.message });
  }
};

const verificarCaixaAbertoPorLoja = async (req, res) => {
  const { loja } = req.query;  // Aqui você pega o parâmetro da query string (loja)
  try {
    const caixaAberto = await caixaService.verificarCaixaAbertoPorLoja(loja);
    if (caixaAberto) {
      return res.json({ status: 'aberto', caixa: caixaAberto });
    } else {
      return res.json({ status: 'fechado' });
    }
  } catch (err) {
    console.error('Erro ao verificar caixa aberto:', err);
    res.status(500).json({ error: err.message });
  }
};


export default {
  abrirCaixa,
  listarCaixas,
  verificarStatusCaixa,
  atualizarCaixa,
  verificarCaixaAbertoPorLoja
};

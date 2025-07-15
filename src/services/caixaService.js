import caixaRepository from '../repositories/caixaRepository.js';

const abrirCaixa = async (dados) => {
  const { fundoInicial, data, setor, loja, usuario, status } = dados;

  if (!fundoInicial || !data || !setor || !loja || !usuario) {
    throw new Error('Todos os campos são obrigatórios');
  }

  // Verifica se já existe um caixa aberto para a loja
  const caixaAberto = await caixaRepository.verificarCaixaAbertoPorLoja(loja);
  if (caixaAberto) {
    throw new Error(`Já existe um caixa aberto para a loja ${loja}`);
  }

  // Se não houver caixa aberto, cria o novo caixa
  return caixaRepository.criarCaixa({ fundoInicial, data, setor, loja, usuario, status });
};

const listarCaixas = async () => {
  return caixaRepository.getAllCaixas();
};



// caixaService.js
const buscarStatusAtual = async (usuario) => {
  return caixaRepository.obterStatusCaixaAtual(usuario);
};

const atualizarCaixa = async (id, dados) => {
  return caixaRepository.atualizarCaixa(id, dados);
};

const verificarCaixaAbertoPorLoja = async (loja) => {
  return caixaRepository.verificarCaixaAbertoPorLoja(loja);  // Verifica o status do caixa na loja
};


export default {
  abrirCaixa,
  listarCaixas,
  buscarStatusAtual,
  atualizarCaixa,
  verificarCaixaAbertoPorLoja
};

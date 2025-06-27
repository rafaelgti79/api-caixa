import despesaRepository from '../repositories/despesaRepository.js';

const criarDespesa = async (dados) => {
  const { descricao, valor, categoria, loja, usuario, data } = dados;

  if (!descricao || !valor || !categoria || !loja || !usuario || !data) {
    throw new Error('Todos os campos são obrigatórios');
  }

  return despesaRepository.criarDespesa({ descricao, valor, categoria, loja, usuario, data });
};

const listarDespesas = async () => {
  return despesaRepository.listarDespesas();
};

export default {
  criarDespesa,
  listarDespesas
};

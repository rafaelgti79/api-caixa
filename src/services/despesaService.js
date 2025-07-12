import despesaRepository from '../repositories/despesaRepository.js';

const criarDespesa = async (dados) => {
  const { descricao, valor, categoria, loja, usuario, data, caixaId } = dados;

  if (!descricao || !valor || !categoria || !loja || !usuario || !data || !caixaId) {
    throw new Error('Todos os campos são obrigatórios');
  }

  return despesaRepository.criarDespesa({ descricao, valor, categoria, loja, usuario, data, caixaId });
};

const listarDespesas = async (caixaId = null) => {
  if (caixaId) {
    return despesaRepository.listarDespesasPorCaixaId(caixaId);
  }
  return despesaRepository.listarDespesas();
};


const fecharTodasDespesas = async () => {
  const despesas = await despesaRepository.listarDespesas();
  for (const despesa of despesas) {
    await despesaRepository.marcarDespesaComoFechada(despesa.id);
  }
};

const marcarDespesaComoFechada = async (id) => {
  return despesaRepository.marcarDespesaComoFechada(id);
};


export default {
  criarDespesa,
  fecharTodasDespesas,
  listarDespesas,
  marcarDespesaComoFechada
};

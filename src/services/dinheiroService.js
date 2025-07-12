import dinheiroRepository from "../repositories/dinheiroRepository.js";

const criarDinheiro = async (dados) => {
  const { valor, usuario, data, caixaId } = dados;

  if (!valor || !usuario || !data || !caixaId) {
    throw new Error('Todos os campos são obrigatórios');
  }

  return dinheiroRepository.criarDinheiro({ valor, usuario, data, caixaId });
};

const listarDinheiro = async (caixaId) => {
  return dinheiroRepository.listarDinheiro(caixaId);
};


const marcarDinheiroComoFechado = async (id) => {
  return dinheiroRepository.marcarDinheiroComoFechado(id);
};


export default {
  criarDinheiro,
  listarDinheiro,
  marcarDinheiroComoFechado
};

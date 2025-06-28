import dinheiroRepository from "../repositories/dinheiroRepository.js";

const criarDinheiro = async (dados) => {
  const { valor, usuario, data } = dados;

  if (!valor || !usuario || !data ) {
    throw new Error('Todos os campos são obrigatórios');
  }

  return dinheiroRepository.criarDinheiro({ valor, usuario, data});
};

const listarDinheiro = async () => {
  return dinheiroRepository.listarDinheiro();
};

const marcarDinheiroComoFechado = async (id) => {
  return dinheiroRepository.marcarDinheiroComoFechado(id);
};


export default {
  criarDinheiro,
  listarDinheiro,
  marcarDinheiroComoFechado
};

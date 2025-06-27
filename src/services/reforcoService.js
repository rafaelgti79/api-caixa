import reforcoRepository from "../repositories/reforcoRepository.js";

const criarReforco = async (dados) => {
  const { valor, usuario, data } = dados;

  if (!valor || !usuario || !data ) {
    throw new Error('Todos os campos são obrigatórios');
  }

  return reforcoRepository.criarReforco({ valor, usuario, data});
};

const listarReforco = async () => {
  return reforcoRepository.listarReforco();
};

export default {
  criarReforco,
  listarReforco
};

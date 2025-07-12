import reforcoRepository from "../repositories/reforcoRepository.js";

const criarReforco = async (dados) => {
  const { valor, usuario, data, caixaId } = dados;

  if (!valor || !usuario || !data || !caixaId) {
    throw new Error('Valor, usuário, data e caixaId são obrigatórios');
  }

  return reforcoRepository.criarReforco({ valor, usuario, data, caixaId });
};

const listarReforco = async (caixaId = null) => {
  return reforcoRepository.listarReforco(caixaId);
};


const marcarReforcoComoFechado = async (id) => {
  return reforcoRepository.marcarReforcoComoFechado(id);
};


export default {
  criarReforco,
  listarReforco,
  marcarReforcoComoFechado
};

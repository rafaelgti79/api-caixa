// src/services/cartaoService.js
import cartaoRepository from "../repositories/cartaoRepository.js";

const criarCartao = async ({ valor, tipo, usuario, data, caixaId }) => {
  if (!valor || !tipo || !usuario || !data || !caixaId) {
    throw new Error("Todos os campos são obrigatórios");
  }

  return await cartaoRepository.criarCartao({ valor, tipo, usuario, data, caixaId });
};

const listarCartoes = async (caixaId = null) => {
  return await cartaoRepository.listarCartoes(caixaId);
};

const marcarCartaoComoFechado = async (id) => {
  return cartaoRepository.marcarCartaoComoFechado(id);
};


export default {
  criarCartao,
  listarCartoes,
  marcarCartaoComoFechado
};

// src/services/cartaoService.js
import cartaoRepository from "../repositories/cartaoRepository.js";

const criarCartao = async ({ valor, tipo, usuario, data }) => {
  // Validação simples
  if (valor == null || tipo == null || usuario == null || data == null) {
    throw new Error("Todos os campos são obrigatórios");
  }
  return await cartaoRepository.criarCartao({ valor, tipo, usuario, data });
};

const listarCartoes = async () => {
  return await cartaoRepository.listarCartoes();
};

const marcarCartaoComoFechado = async (id) => {
  return cartaoRepository.marcarCartaoComoFechado(id);
};


export default {
  criarCartao,
  listarCartoes,
  marcarCartaoComoFechado
};

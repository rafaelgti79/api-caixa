// src/services/cartaoService.js
import sangriaRepository from "../repositories/sangriaResitory.js";

const criarSangria = async ({ descricao, valor, nome, loja, usuario, data, caixaId }) => {
  if (!descricao || !valor || !nome || !loja || !usuario || !data || !caixaId) {
    throw new Error("Todos os campos são obrigatórios, incluindo caixaId");
  }

  return await sangriaRepository.criarSangria({ descricao, valor, nome, loja, usuario, data, caixaId });
};

const listarSangria = async (caixaId) => {
  return await sangriaRepository.listarSangria(caixaId);
};


const marcarSangriaComoFechada = async (id) => {
  return sangriaRepository.marcarSangriaComoFechada(id);
};


export default {
  criarSangria,
  listarSangria,
  marcarSangriaComoFechada
};

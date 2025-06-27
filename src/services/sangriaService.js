// src/services/cartaoService.js
import sangriaRepository from "../repositories/sangriaResitory.js";

const criarSangria = async ({ descricao, valor, nome, loja, usuario, data }) => {
  // Validação simples
  if (descricao == null || valor == null || nome == null || loja == null || usuario == null || data == null) {
    throw new Error("Todos os campos são obrigatórios");
  }
  return await sangriaRepository.criarSangria({descricao, valor, nome, loja, usuario, data });
};

const listarSangria = async () => {
  return await sangriaRepository.listarSangria();
};

export default {
  criarSangria,
  listarSangria,
};

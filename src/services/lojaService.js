// src/services/lojaService.js
import lojaRepository from "../repositories/lojaRepository.js";

const criarLoja = async (loja) => {
  if (!loja || !loja.trim()) throw new Error("Nome da loja é obrigatório");
  return await lojaRepository.criarLoja(loja.trim());
};

const listarLojas = async () => {
  return await lojaRepository.listarLojas();
};

export default {
  criarLoja,
  listarLojas,
};

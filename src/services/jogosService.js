// src/services/jogosService.js
import jogosRepository from "../repositories/jogosRepository.js";

const criarJogo = async ({ nomedojogo, valor }) => {
  if (!nomedojogo?.trim() || valor == null) {
    throw new Error("Nome do jogo e valor são obrigatórios");
  }
  return await jogosRepository.criarJogo({ nomedojogo: nomedojogo.trim(), valor });
};

const listarJogos = async () => {
  return await jogosRepository.listarJogos();
};

export default {
  criarJogo,
  listarJogos,
};

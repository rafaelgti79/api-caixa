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

const deletarJogo = async (id) => {
  if (!id) throw new Error("ID do jogo é obrigatório");
  return await jogosRepository.deletarJogo(id);
};

export default {
  criarJogo,
  listarJogos,
  deletarJogo
};

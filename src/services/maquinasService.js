import maquinasRepository from "../repositories/maquinasRepository.js";

const criarMaquina = async (dados) => {
  const { loja, numeroMaquina, jogo } = dados;

  if (!loja || !numeroMaquina || !jogo) {
    throw new Error("Loja, número da máquina e jogo são obrigatórios");
  }

  return await maquinasRepository.criarMaquina(dados);
};

const listarMaquinas = async (fechada) => {
  return await maquinasRepository.listarMaquinas(fechada);
};

const atualizarMaquina = async (id, campos) => {
  return await maquinasRepository.atualizarMaquina(id, campos);
};



export default { criarMaquina, listarMaquinas,atualizarMaquina };

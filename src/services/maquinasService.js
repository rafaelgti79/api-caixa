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
  const camposValidos = {};

  if (campos.inicial !== undefined && !isNaN(parseFloat(campos.inicial))) {
    camposValidos.inicial = parseFloat(campos.inicial);
  }
  if (campos.final !== undefined && !isNaN(parseFloat(campos.final))) {
    camposValidos.final = parseFloat(campos.final);
  }

  if (Object.keys(camposValidos).length === 0) {
    throw new Error('Nenhum campo válido para atualizar.');
  }

  return await maquinasRepository.atualizarMaquina(id, camposValidos);
};


const editarMaquina = async (id, campos) => {
  // Aqui você pode adicionar validações adicionais se quiser
  return await maquinasRepository.editarMaquina(id, campos);
};

const buscarPorId = async (id) => {
  return await maquinasRepository.buscarPorId(id);
};

const excluirMaquina = async (id) => {
  return await maquinasRepository.excluirMaquina(id);
};


export default { criarMaquina, listarMaquinas,atualizarMaquina, editarMaquina, buscarPorId, excluirMaquina };

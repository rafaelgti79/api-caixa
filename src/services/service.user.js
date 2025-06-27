// src/services/service.user.js
import usuarioRepository from "../repositories/repository.user.js";


const validarLogin = async (nome, senha) => {
 if (!nome || !senha) throw new Error("Nome e senha são obrigatórios");

  const contas = await usuarioRepository.buscarPorNome(nome);
  if (!contas) return null;
  if (contas.senha !== senha) return null;
  return contas;
};

const criarConta = async ({ nome, senha, tipo, porcentagem }) => {
  if (!nome || !senha || !tipo) throw new Error("Campos obrigatórios ausentes");
  return await usuarioRepository.criarConta({ nome, senha, tipo, porcentagem });
};

const listarContas = async () => {
  return await usuarioRepository.listarContas();
};

const atualizarConta = (id, dados) => {
  return usuarioRepository.atualizarConta(id, dados);
};

const deletarConta = (id) => {
  return usuarioRepository.deletarConta(id);
};


export default {
  validarLogin,
  criarConta,
  listarContas,
  atualizarConta,
  deletarConta
};

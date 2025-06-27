import historicoRepository from '../repositories/historicoCaixaRepository.js';

const listarHistorico = async () => {
  return await historicoRepository.listarHistorico();
};

const salvarHistorico = async (dados) => {
  return await historicoRepository.salvarHistorico(dados);
};

export default {
  listarHistorico,
  salvarHistorico,
};

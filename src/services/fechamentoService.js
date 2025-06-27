import fechamentoRepository from '../repositories/fechamentoRepository.js';

const registrarFechamento = async (data) => {
  const {
    maquinaId,
    maquina,
    saidaInicial,
    saidaFinal,
    resultado,
    usuario,
    usuarioId,
    dataHora
  } = data;

  if (!maquinaId || !maquina || !saidaInicial || !saidaFinal || !resultado || !usuario) {
    throw new Error('Todos os campos obrigatórios devem ser preenchidos');
  }

  return fechamentoRepository.salvarFechamento({
    maquinaId,
    maquina,
    saidaInicial,
    saidaFinal,
    resultado,
    usuario,
    usuarioId,
    dataHora
  });
};

const listarFechamentos = async () => {
  return fechamentoRepository.getAllFechamentos();
};

export default {
  registrarFechamento,
  listarFechamentos
};

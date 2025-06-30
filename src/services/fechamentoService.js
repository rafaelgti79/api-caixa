import fechamentoRepository from '../repositories/fechamentoRepository.js';


const registrarFechamento = async (data) => {
  const {
    maquinaId, maquina, saidaInicial, saidaFinal,
    resultado, usuario, usuarioId, dataHora
  } = data;

  if (!maquinaId || !maquina || !saidaInicial || !saidaFinal || !resultado || !usuario) {
    throw new Error('Todos os campos obrigatórios devem ser preenchidos');
  }

  const dataHoje = dataHora.split('T')[0];
  const existente = await fechamentoRepository.buscarPorUsuarioMaquinaData(usuario, maquinaId, dataHoje);

  if (existente) {
    return fechamentoRepository.atualizarFechamento(existente.id, data);
  } else {
    return fechamentoRepository.salvarFechamento(data);
  }
};

const marcarFechamentoComoFechado = async (id) => {
  return fechamentoRepository.marcarFechamentoComoFechado(id);
};

const listarFechamentos = async () => {
  return fechamentoRepository.getAllFechamentos();
};

const fecharTodos = async () => {
  const fechamentos = await listarFechamentos();
  for (const f of fechamentos) {
    await marcarFechamentoComoFechado(f.id);
  }
};

export default {
  registrarFechamento,
  listarFechamentos,
  marcarFechamentoComoFechado,
  fecharTodos
};



/*backup 
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

const fecharTodos = async () => {
  const fechamentos = await fechamentoRepository.getAllFechamentos();
  for (const fechamento of fechamentos) {
    await fechamentoRepository.marcarFechamentoComoFechado(fechamento.id);
  }
};

const listarFechamentos = async () => {
  return fechamentoRepository.getAllFechamentos();
};

const marcarFechamentoComoFechado = async (id) => {
  return fechamentoRepository.marcarFechamentoComoFechado(id);
};

export default {
  registrarFechamento,
  fecharTodos,
  listarFechamentos,
  marcarFechamentoComoFechado
};
*/
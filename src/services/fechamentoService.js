import fechamentoRepository from '../repositories/fechamentoRepository.js';


const registrarFechamento = async (data) => {
  const {
    maquinaId,
    maquina,
    entradaFinal,
    saidaFinal,
    resultado,
    usuario,
    usuarioId,
    dataHora,
    caixaId   // <- adiciona aqui
  } = data;

  if (!maquinaId || !maquina || entradaFinal === undefined || saidaFinal === undefined || resultado === undefined || !usuario) {
    throw new Error('Todos os campos obrigatórios devem ser preenchidos');
  }

  const dataHoje = dataHora.split('T')[0];

  const existente = await fechamentoRepository.buscarPorUsuarioMaquinaData(usuario, maquinaId, dataHoje);

  if (!existente) {
    return fechamentoRepository.salvarFechamento(data);
  }

  if (existente.fechado === 0) {
    return fechamentoRepository.atualizarFechamento(existente.id, {
      ...existente,
      ...data
    });
  }

  return fechamentoRepository.salvarFechamento(data);
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

const atualizarFechamento = async (id, dados) => {
  return fechamentoRepository.atualizarFechamento(id, dados);
};


export default {
  registrarFechamento,
  listarFechamentos,
  marcarFechamentoComoFechado,
  fecharTodos,
  atualizarFechamento
};



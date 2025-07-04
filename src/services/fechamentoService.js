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
    dataHora
  } = data;

  if (!maquinaId || !maquina || entradaFinal === undefined || saidaFinal === undefined || resultado === undefined || !usuario) {
    throw new Error('Todos os campos obrigatórios devem ser preenchidos');
  }

  const dataHoje = dataHora.split('T')[0];

  // 🔍 Verifica se já existe fechamento para essa máquina e esse usuário HOJE, e está em aberto
  const existente = await fechamentoRepository.buscarPorUsuarioMaquinaData(usuario, maquinaId, dataHoje);

  if (!existente) {
    // ✅ Não existe => cria novo
    return fechamentoRepository.salvarFechamento(data);
  }

  if (existente.fechado === 0) {
    // ⚠️ Já existe um em aberto => atualiza
    return fechamentoRepository.atualizarFechamento(existente.id, {
      ...existente,
      ...data
    });
  }

  // ✅ Já existe, mas está fechado => cria um novo registro (reabertura por algum motivo)
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
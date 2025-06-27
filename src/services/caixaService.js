import caixaRepository from '../repositories/caixaRepository.js';

const abrirCaixa = async (data) => {
  const { fundoInicial, data: dt, setor, loja, usuario, status  } = data;
  if ( !fundoInicial || !dt || !setor || !loja || !usuario ) {
    throw new Error('Todos campos são obrigatórios');
  }
  return caixaRepository.criarCaixa({ fundoInicial, data: dt, setor, loja, usuario, status  });
};

const listarCaixas = async () => {
  return caixaRepository.getAllCaixas();
};

// caixaService.js
const buscarStatusAtual = async (usuario) => {
  return caixaRepository.obterStatusCaixaAtual(usuario);
};

const atualizarCaixa = async (id, dados) => {
  return caixaRepository.atualizarCaixa(id, dados);
};


export default {
  abrirCaixa,
  listarCaixas,
  buscarStatusAtual,
  atualizarCaixa
};

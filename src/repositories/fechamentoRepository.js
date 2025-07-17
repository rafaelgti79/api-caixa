import { db } from '../database/sqlite.js';


const buscarPorUsuarioMaquinaData = (usuario, maquinaId, data) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM fecharmaquinas
      WHERE usuario = ? AND maquinaId = ? AND dataHora LIKE ? AND (fechado IS NULL OR fechado = 0)
    `;
    db.get(query, [usuario, maquinaId, `${data}%`], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};



const salvarFechamento = ({
  maquinaId,
  maquina,
  entradaInicial,
  entradaFinal,
  saidaInicial,
  saidaFinal,
  resultado,
  usuario,
  usuarioId,
  dataHora,
  fechado = false,
  caixaId = null     // <--- novo campo
}) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO fecharmaquinas (
        maquinaId, maquina, entradaInicial, entradaFinal,
        saidaInicial, saidaFinal, resultado,
        usuario, usuarioId, dataHora, fechado, caixaId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [maquinaId, maquina, entradaInicial, entradaFinal, saidaInicial, saidaFinal, resultado, usuario, usuarioId, dataHora, fechado, caixaId],
      function (err) {
        if (err) return reject(err);
        resolve({
          id: this.lastID,
          maquinaId, maquina, entradaInicial, entradaFinal,
          saidaInicial, saidaFinal, resultado,
          usuario, usuarioId, dataHora, fechado, caixaId
        });
      }
    );
  });
};

const atualizarFechamento = (id, dados) => {
  const campos = [];
  const valores = [];

  // Adiciona apenas os campos definidos
  if (dados.maquina !== undefined) {
    campos.push('maquina = ?');
    valores.push(dados.maquina);
  }
  if (dados.entradaInicial !== undefined) {
    campos.push('entradaInicial = ?');
    valores.push(dados.entradaInicial);
  }
  if (dados.entradaFinal !== undefined) {
    campos.push('entradaFinal = ?');
    valores.push(dados.entradaFinal);
  }
  if (dados.saidaInicial !== undefined) {
    campos.push('saidaInicial = ?');
    valores.push(dados.saidaInicial);
  }
  if (dados.saidaFinal !== undefined) {
    campos.push('saidaFinal = ?');
    valores.push(dados.saidaFinal);
  }
  if (dados.resultado !== undefined) {
    campos.push('resultado = ?');
    valores.push(dados.resultado);
  }
  if (dados.usuarioId !== undefined) {
    campos.push('usuarioId = ?');
    valores.push(dados.usuarioId);
  }
  if (dados.dataHora !== undefined) {
    campos.push('dataHora = ?');
    valores.push(dados.dataHora);
  }
  if (dados.caixaId !== undefined) {
    campos.push('caixaId = ?');
    valores.push(dados.caixaId);
  }

  if (campos.length === 0) {
    return Promise.resolve({ id }); // Nada para atualizar
  }

  const query = `
    UPDATE fecharmaquinas
    SET ${campos.join(', ')}
    WHERE id = ?
  `;
  valores.push(id);

  return new Promise((resolve, reject) => {
    db.run(query, valores, function (err) {
      if (err) return reject(err);
      resolve({ id, ...dados });
    });
  });
};




const marcarFechamentoComoFechado = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE fecharmaquinas SET fechado = 1 WHERE id = ?';
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ success: true, id });
    });
  });
};

const getAllFechamentos = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM fecharmaquinas ORDER BY id DESC';
    db.all(query, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export default {
  buscarPorUsuarioMaquinaData,
  salvarFechamento,
  atualizarFechamento,
  marcarFechamentoComoFechado,
  getAllFechamentos
};




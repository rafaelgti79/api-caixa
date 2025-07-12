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
  const {
    maquina,
    entradaInicial = null,
    entradaFinal = null,
    saidaInicial = null,
    saidaFinal = null,
    resultado = null,
    usuarioId,
    dataHora,
    caixaId = null      // <--- novo campo
  } = dados;

  return new Promise((resolve, reject) => {
    const query = `
      UPDATE fecharmaquinas
      SET maquina = ?, entradaInicial = ?, entradaFinal = ?,
          saidaInicial = ?, saidaFinal = ?, resultado = ?,
          usuarioId = ?, dataHora = ?, caixaId = ?
      WHERE id = ?
    `;
    db.run(query,
      [maquina, entradaInicial, entradaFinal, saidaInicial, saidaFinal, resultado, usuarioId, dataHora, caixaId, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, ...dados });
      }
    );
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




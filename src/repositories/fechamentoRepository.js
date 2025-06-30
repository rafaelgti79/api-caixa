import { db } from '../database/sqlite.js';


const buscarPorUsuarioMaquinaData = (usuario, maquinaId, data) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM fecharmaquinas WHERE usuario = ? AND maquinaId = ? AND dataHora LIKE ?`,
      [usuario, maquinaId, `${data}%`],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

const salvarFechamento = ({
  maquinaId,
  maquina,
  saidaInicial,
  saidaFinal,
  resultado,
  usuario,
  usuarioId,
  dataHora
}) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO fecharmaquinas (
        maquinaId, maquina, saidaInicial, saidaFinal,
        resultado, usuario, usuarioId, dataHora
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [maquinaId, maquina, saidaInicial, saidaFinal, resultado, usuario, usuarioId, dataHora],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, maquinaId, maquina, saidaInicial, saidaFinal, resultado, usuario, usuarioId, dataHora });
      }
    );
  });
};

const atualizarFechamento = (id, dados) => {
  const {
    maquina,
    saidaInicial,
    saidaFinal,
    resultado,
    usuarioId,
    dataHora,
  } = dados;

  return new Promise((resolve, reject) => {
    const query = `
      UPDATE fecharmaquinas
      SET maquina = ?, saidaInicial = ?, saidaFinal = ?, resultado = ?, usuarioId = ?, dataHora = ?
      WHERE id = ?
    `;
    db.run(query, [maquina, saidaInicial, saidaFinal, resultado, usuarioId, dataHora, id], function (err) {
      if (err) reject(err);
      else resolve({ id, ...dados });
    });
  });
};

const marcarFechamentoComoFechado = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE fecharmaquinas SET fechado = 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ success: true, id });
    });
  });
};

const getAllFechamentos = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM fecharmaquinas ORDER BY id DESC`, [], (err, rows) => {
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




/*backup
const salvarFechamento = ({
  maquinaId,
  maquina,
  saidaInicial,
  saidaFinal,
  resultado,
  usuario,
  usuarioId,
  dataHora
}) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO fecharmaquinas (
        maquinaId,
        maquina,
        saidaInicial,
        saidaFinal,
        resultado,
        usuario,
        usuarioId,
        dataHora
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(
      query,
      [maquinaId, maquina, saidaInicial, saidaFinal, resultado, usuario, usuarioId, dataHora],
      function (err) {
        if (err) return reject(err);
        resolve({
          id: this.lastID,
          maquinaId,
          maquina,
          saidaInicial,
          saidaFinal,
          resultado,
          usuario,
          usuarioId,
          dataHora
        });
      }
    );
  });
};

const marcarFechamentoComoFechado = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE fecharmaquinas SET fechado = 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ success: true, id });
    });
  });
};

const getAllFechamentos = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM fecharmaquinas ORDER BY id DESC', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export default {
  salvarFechamento,
  marcarFechamentoComoFechado,
  getAllFechamentos
};
*/
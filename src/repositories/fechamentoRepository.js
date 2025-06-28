import { db } from '../database/sqlite.js';

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

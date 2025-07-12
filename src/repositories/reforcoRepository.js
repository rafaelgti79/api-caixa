// src/repositories/despesaRepository.js
import { db } from '../database/sqlite.js';

const criarReforco = ({ valor, usuario, data, caixaId }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO reforco (valor, usuario, data, caixaId)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [valor, usuario, data, caixaId], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, valor, usuario, data, caixaId });
    });
  });
};


const listarReforco = (caixaId = null) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM reforco';
    const params = [];

    if (caixaId) {
      sql += ' WHERE caixaId = ?';
      params.push(caixaId);
    }

    sql += ' ORDER BY id DESC';

    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};


const marcarReforcoComoFechado = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE reforco SET fechado = 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ success: true });
    });
  });
};


export default {
  criarReforco,
  listarReforco,
  marcarReforcoComoFechado
};

// src/repositories/despesaRepository.js
import { db } from '../database/sqlite.js';

const criarDinheiro = ({ valor, usuario, data, caixaId }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO dinheiro (valor, usuario, data, caixaId)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [valor, usuario, data, caixaId], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, valor, usuario, data, caixaId });
    });
  });
};

const listarDinheiro = (caixaId = null) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM dinheiro';
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

const marcarDinheiroComoFechado = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE dinheiro SET fechado = 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ success: true });
    });
  });
};


export default {
  criarDinheiro,
  listarDinheiro,
  marcarDinheiroComoFechado
};

// src/repositories/despesaRepository.js
import { db } from '../database/sqlite.js';

const criarSangria = ({ descricao, valor, nome, loja, usuario, data, caixaId }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO sangria (descricao, valor, nome, loja, usuario, data, caixaId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [descricao, valor, nome, loja, usuario, data, caixaId], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, descricao, valor, nome, loja, usuario, data, caixaId });
    });
  });
};

const listarSangria = (caixaId = null) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM sangria';
    const params = [];

    if (caixaId) {
      query += ' WHERE caixaId = ? ORDER BY id DESC';
      params.push(caixaId);
    } else {
      query += ' ORDER BY id DESC';
    }

    db.all(query, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const marcarSangriaComoFechada = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE sangria SET fechado = 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ success: true });
    });
  });
};



export default {
  criarSangria,
  listarSangria,
  marcarSangriaComoFechada
};

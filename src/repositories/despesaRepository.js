// src/repositories/despesaRepository.js
import { db } from '../database/sqlite.js';

const criarDespesa = ({ descricao, valor, categoria, loja, usuario, data, caixaId }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO despesas (descricao, valor, categoria, loja, usuario, data, caixaId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [descricao, valor, categoria, loja, usuario, data, caixaId], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, descricao, valor, categoria, loja, usuario, data, caixaId });
    });
  });
};


const listarDespesas = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM despesas ORDER BY id DESC', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const listarDespesasPorCaixaId = (caixaId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM despesas WHERE caixaId = ? ORDER BY id DESC';
    db.all(query, [caixaId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};


const marcarDespesaComoFechada = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE despesas SET fechado = 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ success: true });
    });
  });
};


export default {
  criarDespesa,
  marcarDespesaComoFechada,
  listarDespesas,
  listarDespesasPorCaixaId
};

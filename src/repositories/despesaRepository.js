// src/repositories/despesaRepository.js
import { db } from '../database/sqlite.js';

const criarDespesa = ({ descricao, valor, categoria, loja, usuario, data }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO despesas (descricao, valor, categoria, loja, usuario, data)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [descricao, valor, categoria, loja, usuario, data], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, descricao, valor, categoria, loja, usuario, data });
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

export default {
  criarDespesa,
  listarDespesas
};

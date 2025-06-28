// src/repositories/despesaRepository.js
import { db } from '../database/sqlite.js';

const criarDinheiro = ({ valor, usuario, data }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO dinheiro (valor, usuario, data)
      VALUES (?, ?, ?)
    `;
    db.run(sql, [valor, usuario, data], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, valor, usuario, data });
    });
  });
};

const listarDinheiro = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM dinheiro ORDER BY id DESC', [], (err, rows) => {
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

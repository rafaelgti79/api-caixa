// src/repositories/despesaRepository.js
import { db } from '../database/sqlite.js';

const criarReforco = ({ valor, usuario, data }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO reforco (valor, usuario, data)
      VALUES (?, ?, ?)
    `;
    db.run(sql, [valor, usuario, data], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, valor, usuario, data });
    });
  });
};

const listarReforco = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM reforco ORDER BY id DESC', [], (err, rows) => {
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

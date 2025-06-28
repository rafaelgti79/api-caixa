// src/repositories/cartaoRepository.js
import { db } from "../database/sqlite.js";

const criarCartao = ({ valor, tipo, usuario, data }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO cartao (valor, tipo, usuario, data) VALUES (?, ?, ?, ?)`;
    db.run(sql, [valor, tipo, usuario, data], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, valor, tipo, usuario, data });
    });
  });
};

const listarCartoes = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM cartao", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const marcarCartaoComoFechado = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE cartao SET fechado = 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ success: true });
    });
  });
};


export default {
  criarCartao,
  listarCartoes,
  marcarCartaoComoFechado
};

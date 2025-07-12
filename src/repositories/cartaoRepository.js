// src/repositories/cartaoRepository.js
import { db } from "../database/sqlite.js";

const criarCartao = ({ valor, tipo, usuario, data, caixaId }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO cartao (valor, tipo, usuario, data, caixaId)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(sql, [valor, tipo, usuario, data, caixaId], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, valor, tipo, usuario, data, caixaId });
    });
  });
};


const listarCartoes = (caixaId = null) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM cartao";
    const params = [];

    if (caixaId !== null) {
      sql += " WHERE caixaId = ?";
      params.push(caixaId);
    }

    db.all(sql, params, (err, rows) => {
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

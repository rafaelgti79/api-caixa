// src/repositories/despesaRepository.js
import { db } from '../database/sqlite.js';

const criarSangria = ({ descricao, valor, nome, loja, usuario, data  }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO sangria (descricao, valor, nome, loja, usuario, data )
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [descricao, valor, nome, loja, usuario, data ], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, descricao, valor, nome, loja, usuario, data  });
    });
  });
};

const listarSangria = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM sangria ORDER BY id DESC', [], (err, rows) => {
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

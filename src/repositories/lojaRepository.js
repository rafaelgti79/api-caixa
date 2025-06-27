// src/repositories/lojaRepository.js
import { db } from "../database/sqlite.js";

const criarLoja = (nomeLoja) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO lojas (loja) VALUES (?)", [nomeLoja], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, loja: nomeLoja });
    });
  });
};

const listarLojas = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM lojas", [], (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

export default {
  criarLoja,
  listarLojas,
};

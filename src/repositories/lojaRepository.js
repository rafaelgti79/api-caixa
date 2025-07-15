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

const deletarLoja = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM lojas WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) reject(err);
      else if (this.changes === 0) reject(new Error("Loja não encontrada"));
      else resolve({ message: "Loja deletada com sucesso" });
    });
  });
};

export default {
  criarLoja,
  listarLojas,
  deletarLoja
};

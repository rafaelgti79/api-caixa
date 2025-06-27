// src/repositories/jogosRepository.js
import { db } from "../database/sqlite.js";

const criarJogo = ({ nomedojogo, valor }) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO jogos (nomedojogo, valor) VALUES (?, ?)";
    db.run(sql, [nomedojogo, valor], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, nomedojogo, valor });
    });
  });
};

const listarJogos = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM jogos", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export default {
  criarJogo,
  listarJogos,
};

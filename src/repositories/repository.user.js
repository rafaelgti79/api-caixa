// src/repositories/repository.user.js
import { db } from "../database/sqlite.js";

const buscarPorNome = (nome) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM contas WHERE nome = ?", [nome], (err, row) => {
       if (err) {
        console.error("Erro no banco:", err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const criarConta = ({ nome, senha, tipo, porcentagem }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO contas (nome, senha, tipo, porcentagem) VALUES (?, ?, ?, ?)",
      [nome, senha, tipo, porcentagem],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};

const listarContas = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM contas", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const atualizarConta = (id, { nome, senha, tipo, porcentagem }) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE contas SET nome = ?, senha = ?, tipo = ?, porcentagem = ? WHERE id = ?`,
      [nome, senha, tipo, porcentagem, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id });
      }
    );
  });
};

const deletarConta = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM contas WHERE id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};


export default {
  buscarPorNome,
  criarConta,
  listarContas,
  atualizarConta,
  deletarConta
};

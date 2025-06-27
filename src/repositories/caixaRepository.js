import { db } from '../database/sqlite.js';

const criarCaixa = ({ fundoInicial, data, setor, loja, usuario, status  }) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO caixa (fundoInicial, data, setor, loja, usuario, status )
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [fundoInicial, data, setor, loja, usuario, status ], function(err) {
      if (err) return reject(err);
      resolve({ id: this.lastID,  fundoInicial, data, setor, loja, usuario, status });
    });
  });
};

const getAllCaixas = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM caixa ORDER BY id DESC', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// caixaRepository.js
const obterStatusCaixaAtual = (usuario) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT status FROM caixa WHERE usuario = ? ORDER BY id DESC LIMIT 1`;
    db.get(sql, [usuario], (err, row) => {
      if (err) return reject(err);
      resolve(row?.status || 'fechado');
    });
  });
};

const atualizarCaixa = (id, dados) => {
  return new Promise((resolve, reject) => {
    const campos = [];
    const valores = [];

    for (const [chave, valor] of Object.entries(dados)) {
      campos.push(`${chave} = ?`);
      valores.push(valor);
    }

    const sql = `UPDATE caixa SET ${campos.join(', ')} WHERE id = ?`;
    valores.push(id);

    db.run(sql, valores, function (err) {
      if (err) return reject(err);
      resolve({ id, ...dados });
    });
  });
};



export default {
  criarCaixa,
  getAllCaixas,
  obterStatusCaixaAtual,
  atualizarCaixa
};

import { db } from '../database/sqlite.js';

const listarHistorico = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM historicocaixa ORDER BY data DESC', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const salvarHistorico = (dados) => {
  return new Promise((resolve, reject) => {
    const {
      usuario, data, entrada, saida, bruto, liquido, composicaoTotal, sobra, falta,
      cartao, dinheiro, despesas, sangria, fundoInicial, reforco, dinheiroLiquido
    } = dados;

    db.run(
      `INSERT INTO historicocaixa 
        (usuario, data, entrada, saida, bruto, liquido, composicaoTotal, sobra, falta,
         cartao, dinheiro, despesas, sangria, fundoInicial, reforco, dinheiroLiquido)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [usuario, data, entrada, saida, bruto, liquido, composicaoTotal, sobra, falta,
       cartao, dinheiro, despesas, sangria, fundoInicial, reforco, dinheiroLiquido],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};

export default {
  listarHistorico,
  salvarHistorico,
};

import { db } from "../database/sqlite.js";

const criarMaquina = (maquina) => {
  const {
    loja,
    numeroMaquina,
    jogo,
    valorJogo,
    maquineiro,
    setor,
    inicial,
    final,
  } = maquina;

  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO maquinas
      (loja, numeroMaquina, jogo, valorJogo, maquineiro, setor, inicial, final)
      VALUES (?,?,?,?,?,?,?,?)
    `;
    db.run(
      sql,
      [
        loja,
        numeroMaquina,
        jogo,
        valorJogo,
        maquineiro,
        setor,
        inicial,
        final,
      ],
      function (err) {
        err
          ? reject(err)
          : resolve({ id: this.lastID, ...maquina });
      }
    );
  });
};

const listarMaquinas = (fechada = null) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM maquinas";
    const params = [];

    if (fechada !== null) {
      sql += " WHERE fechada = ?";
      params.push(fechada ? 1 : 0);
    }

    db.all(sql, params, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
};


const atualizarMaquina = (id, campos) => {
  return new Promise((resolve, reject) => {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(campos)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    values.push(id);

    const sql = `UPDATE maquinas SET ${fields.join(', ')} WHERE id = ?`;

    db.run(sql, values, function (err) {
      err ? reject(err) : resolve({ id, ...campos });
    });
  });
};


/*
const listarMaquinas = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM maquinas", [], (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
};
*/
export default { criarMaquina, listarMaquinas, atualizarMaquina };

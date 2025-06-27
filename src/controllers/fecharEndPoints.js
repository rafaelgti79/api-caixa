// controllers/fecharMaquinasController.js
import { db } from '../database/sqlite.js';

const deletarDespesas = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM despesas WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar registro' });
    }
    res.status(200).json({ message: 'Registro deletado com sucesso' });
  });
};

const deletarSangrias = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM sangria WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar registro' });
    }
    res.status(200).json({ message: 'Registro deletado com sucesso' });
  });
};

const deletarCartao = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM cartao WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar registro' });
    }
    res.status(200).json({ message: 'Registro deletado com sucesso' });
  });
};

const deletarDinheiro = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM dinheiro WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar registro' });
    }
    res.status(200).json({ message: 'Registro deletado com sucesso' });
  });
};

const deletarReforco = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM reforco WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar registro' });
    }
    res.status(200).json({ message: 'Registro deletado com sucesso' });
  });
};

export default {
  deletarDespesas,
  deletarSangrias,
  deletarCartao,
  deletarDinheiro,
  deletarReforco

};

// controllers/fecharMaquinasController.js
import { db } from '../database/sqlite.js';

const deletar = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM fecharmaquinas WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar registro' });
    }
    res.status(200).json({ message: 'Registro deletado com sucesso' });
  });
};

export default {
  deletar,
  // outros métodos...
};

// controllers/usuarioController.js
import usuarioService from "../services/service.user.js"; // ✅ CORRETO

const loginUsuario = async (req, res) => {
  console.log("Requisição recebida:", req.body);
  const { nome, senha } = req.body;

  try {
    const contas = await usuarioService.validarLogin(nome, senha);
    if (!contas) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    res.status(200).json({ contas });
  } catch (error) {
    console.error("Erro no login:", error); // para ver no console
    res.status(500).json({ error: error.message });
  }
};

const criarConta = async (req, res) => {
  try {
    const novaConta = await usuarioService.criarConta(req.body);
    res.status(201).json(novaConta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listarContas = async (req, res) => {
  try {
    const contas = await usuarioService.listarContas();
    res.json(contas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const atualizarConta = async (req, res) => {
  try {
    const id = req.params.id;
    const contaAtualizada = await usuarioService.atualizarConta(id, req.body);
    res.json(contaAtualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletarConta = async (req, res) => {
  try {
    await usuarioService.deletarConta(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export default {
  criarConta,
  listarContas,
  loginUsuario,
  atualizarConta,
  deletarConta
};

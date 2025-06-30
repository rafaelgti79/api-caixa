import express from "express";
import controllerUser from "./controllers/controller.user.js";
import cartaoController from "../src/controllers/cartaoController.js"
import lojaController from "./controllers/lojaController.js";
import jogosController from "./controllers/jogosController.js";
import maquinasController from "./controllers/maquinasController.js";
import historicoCaixaController from "./controllers/historicoCaixaController.js";
import caixaController from "./controllers/caixaController.js";
import fechamentoController from "./controllers/fechamentoController.js";
import despesaController from "./controllers/despesaController.js";
import reforcoController from "./controllers/reforcoController.js";
import dinheiroController from "./controllers/dinheiroController.js";
import sangriaController from "./controllers/sangriaController.js";
import fecharMaquinasController from "./controllers/fecharMaquinasController.js";
import fecharEndPoints from "./controllers/fecharEndPoints.js";


const router = express.Router();

// Usuarios
router.post('/login', controllerUser.loginUsuario);
router.post('/conta', controllerUser.criarConta);
router.get('/conta', controllerUser.listarContas);
router.put("/conta/:id", controllerUser.atualizarConta);
router.delete("/conta/:id", controllerUser.deletarConta);


// Cartão
router.post("/cartao", cartaoController.criarCartao);
router.get("/cartao", cartaoController.listarCartoes);
router.delete('/cartao/:id', fecharEndPoints.deletarCartao);
router.patch('/cartao/:id', cartaoController.marcarComoFechado);



//Lojas
router.post("/lojas", lojaController.criarLoja);
router.get("/lojas", lojaController.listarLojas);

//Jogo
router.post("/jogos", jogosController.criarJogo);
router.get("/jogos", jogosController.listarJogos);

//Maquinas
router.post("/maquinas", maquinasController.criarMaquina);
router.get("/maquinas", maquinasController.listarMaquinas);
router.put("/maquinas/:id", maquinasController.atualizarMaquina);



//Historico Caixa
router.post('/caixa', caixaController.abrirCaixa);
router.get('/caixa', caixaController.listarCaixas);
router.get('/caixa/status', caixaController.verificarStatusCaixa);
router.patch('/caixa/:id', caixaController.atualizarCaixa);
router.put('/caixa/:id', caixaController.atualizarCaixa);
// Historico Caixa
router.get('/historicocaixa', historicoCaixaController.listarHistorico);
router.post('/historicocaixa', historicoCaixaController.salvarHistorico);

//Fechar Caixa
router.post('/fecharmaquinas', fechamentoController.registrarFechamento);
router.get('/fecharmaquinas', fechamentoController.listarFechamentos);
router.delete('/fecharmaquinas/:id', fecharMaquinasController.deletar);
 router.patch('/fecharmaquinas/:id', fechamentoController.marcarComoFechado);


//Despesas
router.post('/despesas', despesaController.criarDespesa);
router.get('/despesas', despesaController.listarDespesas);
router.delete('/despesas/:id', fecharEndPoints.deletarDespesas);
router.patch('/despesas/:id', despesaController.marcarComoFechado);



//Reforco
router.post('/reforco', reforcoController.criarReforco);
router.get('/reforco', reforcoController.listarReforco);
router.delete('/reforco/:id', fecharEndPoints.deletarReforco);
router.patch('/reforco/:id', reforcoController.marcarComoFechado);



//Dinheiro
router.post('/dinheiro', dinheiroController.criarDinheiro);
router.get('/dinheiro', dinheiroController.listarDinheiro);
router.delete('/dinheiro/:id', fecharEndPoints.deletarDinheiro);
router.patch('/dinheiro/:id', dinheiroController.marcarComoFechado);



//Sangria
router.post('/sangria', sangriaController.criarSangria);
router.get('/sangria', sangriaController.listarSangria);
router.delete('/sangria/:id', fecharEndPoints.deletarSangrias);
router.patch('/sangria/:id', sangriaController.marcarComoFechado);





export default router;
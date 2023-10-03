const express = require("express");
const { verificarSenhaBanco, verificarSenhaConta, verificarSenhaContaOrigem } = require("./intermediadores/verificarSenhas");
const { verificarCamposUsuario, verificarContaExistente, verificarContaBody, verificarContaBodyOrigem, verificarDadosSaldoExtrato } = require("./intermediadores/verificarDados");
const { listarContas, criarConta, atualizarUsuarioConta, excluirConta, consultarSaldo, emitirExtrato } = require("./controladores/contas");
const { depositar, sacar, transferir } = require("./controladores/transacoes");

const rotas = express();

rotas.get("/contas", verificarSenhaBanco, listarContas);
rotas.post("/contas", verificarCamposUsuario, criarConta);
rotas.put("/contas/:numeroConta/usuario", verificarCamposUsuario, verificarContaExistente, atualizarUsuarioConta);
rotas.delete("/contas/:numeroConta", verificarContaExistente, excluirConta);
rotas.post("/transacoes/depositar", verificarContaBody, depositar);
rotas.post("/transacoes/sacar", verificarContaBody, verificarSenhaConta, sacar);
rotas.post("/transacoes/transferir", verificarContaBodyOrigem, verificarSenhaContaOrigem, transferir);
rotas.get("/contas/saldo", verificarDadosSaldoExtrato, consultarSaldo);
rotas.get("/contas/extrato", verificarDadosSaldoExtrato, emitirExtrato);

module.exports = rotas;
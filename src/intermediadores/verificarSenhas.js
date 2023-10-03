const { banco, contas } = require("../bancodedados.js");

const verificarSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: "A senha do banco deve ser informada!" });
    }
    if (senha_banco !== banco.senha) {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }

    next();
}

const verificarSenhaConta = (req, res, next) => {
    const { numero_conta, senha } = req.body;
    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

    if (!senha) {
        return res.status(400).json({ mensagem: "A senha deve ser informada!" });
    }
    if (contaExistente.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "A senha informada é inválida!" });
    }

    next();
}

const verificarSenhaContaOrigem = (req, res, next) => {
    const { numero_conta_origem, senha } = req.body;
    const contaExistenteOrigem = contas.find(conta => conta.numero === Number(numero_conta_origem));

    if (!senha) {
        return res.status(400).json({ mensagem: "A senha deve ser informada!" });
    }
    if (contaExistenteOrigem.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "A senha informada é inválida!" });
    }

    next();
}

module.exports = {
    verificarSenhaBanco,
    verificarSenhaConta,
    verificarSenhaContaOrigem
}
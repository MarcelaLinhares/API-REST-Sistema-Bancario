const { depositos, saques, transferencias } = require("../bancodedados");
const { format } = require("date-fns");
const { contas } = require("../bancodedados");

const depositar = (req, res) => {
    const { valor, numero_conta } = req.body;

    try {
        if (valor === undefined || valor === null) {
            return res.status(400).json({ mensagem: "O valor é obrigatório!" });
        }
        if (valor <= 0) {
            return res.status(403).json({ mensagem: "O valor do depósito deve ser maior que zero!" });
        }

        const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

        contaExistente.saldo += valor;

        const novoDeposito = {
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta,
            valor
        }

        depositos.push(novoDeposito);

        return res.status(201).json();
    } catch {
        return res.json(`Erro ao realizar depósito na conta: ${erro.message}`);
    }
}

const sacar = (req, res) => {
    const { numero_conta, valor } = req.body;

    try {
        const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

        if (valor === undefined || valor === null) {
            return res.status(400).json({ mensagem: "O valor é obrigatório!" });
        }
        if (valor <= 0) {
            return res.status(403).json({ mensagem: "O valor do saque deve ser maior que zero!" });
        }
        if (valor > contaExistente.saldo) {
            return res.status(403).json({ mensagem: "Saldo insuficiente para o saque!" });
        }

        contaExistente.saldo -= valor;

        const novoSaque = {
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta,
            valor
        }

        saques.push(novoSaque);

        return res.status(201).json();
    } catch {
        return res.json(`Erro ao realizar saque na conta: ${erro.message}`);
    }
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body;

    try {
        const contaExistenteOrigem = contas.find(conta => conta.numero === Number(numero_conta_origem));
        const contaExistenteDestino = contas.find(conta => conta.numero === Number(numero_conta_destino));

        if (!numero_conta_destino) {
            return res.status(400).json({ mensagem: "O número da conta de destino é obrigatório!" });
        }
        if (valor === undefined || valor === null) {
            return res.status(400).json({ mensagem: "O valor é obrigatório!" });
        }
        if (isNaN(Number(numero_conta_destino))) {
            return res.status(400).json({ mensagem: "O número da conta de destino informada é inválido!" });
        }
        if (!contaExistenteDestino) {
            return res.status(404).json({ mensagem: "Conta bancária de destino não encontrada!" });
        }
        if (valor <= 0) {
            return res.status(403).json({ mensagem: "O valor do depósito deve ser maior que zero!" });
        }
        if (valor > contaExistenteOrigem.saldo) {
            return res.status(403).json({ mensagem: "Saldo insuficiente!" });
        }

        contaExistenteOrigem.saldo -= valor;
        contaExistenteDestino.saldo += valor;

        const novaTransferencia = {
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta_origem,
            numero_conta_destino,
            valor
        }

        transferencias.push(novaTransferencia);

        return res.status(201).json();
    } catch {
        return res.json(`Erro ao realizar transferência na conta: ${erro.message}`);
    }
}

module.exports = {
    depositar,
    sacar,
    transferir
}
const { contas, depositos, saques, transferencias } = require("../bancodedados");

let numeroProximaContaCriada = 1;

const listarContas = (req, res) => {
    return res.json(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        if (!cpf) {
            return res.status(400).json({ mensagem: "O cpf deve ser informado!" });
        }
        if (!email) {
            return res.status(400).json({ mensagem: "O e-mail deve ser informado!" });
        }

        const novaConta = {
            numero: numeroProximaContaCriada++,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }

        contas.push(novaConta);

        return res.status(201).json();
    } catch {
        return res.json(`Erro ao cadastrar nova conta: ${erro.message}`);
    }
}

const atualizarUsuarioConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    try {
        const contaExistente = contas.find(conta => conta.numero === Number(numeroConta));

        contaExistente.usuario.nome = nome;
        contaExistente.usuario.data_nascimento = data_nascimento;
        contaExistente.usuario.telefone = telefone;
        contaExistente.usuario.senha = senha;
        if (cpf) {
            contaExistente.usuario.cpf = cpf;
        }
        if (email) {
            contaExistente.usuario.email = email;
        }

        return res.status(200).json();
    } catch {
        return res.json(`Erro ao atualizar usuário da conta: ${erro.message}`);
    }
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    try {
        const contaExistente = contas.find(conta => conta.numero === Number(numeroConta));
        const indiceConta = contas.findIndex(conta => conta.numero === Number(numeroConta));

        if (contaExistente.saldo !== 0) {
            return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
        }
        if (indiceConta < 0) {
            return res.status(404).json({ mensagem: "Não existe conta a ser excluída para o número informado!" });
        }

        contas.splice(indiceConta, 1);

        return res.status(204).json();
    } catch {
        return res.json(`Erro ao excluir conta: ${erro.message}`);
    }
}

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query;
    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

    const consultaSaldo = {
        saldo: contaExistente.saldo
    }

    return res.json(consultaSaldo);
}

const emitirExtrato = (req, res) => {
    const { numero_conta } = req.query;

    const depositosConta = depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saquesConta = saques.filter(saque => saque.numero_conta === numero_conta);
    const transferenciasRealizadasConta = transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta);
    const transferenciasRecebidasConta = transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta);

    const emissaoExtrato = {
        depositos: depositosConta,
        saques: saquesConta,
        transferenciasEnviadas: transferenciasRealizadasConta,
        transferenciasRecebidas: transferenciasRecebidasConta
    }

    return res.json(emissaoExtrato);
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta,
    consultarSaldo,
    emitirExtrato
}
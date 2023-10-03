const { contas } = require("../bancodedados");

const verificarCamposUsuario = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "O nome é obrigatório!" });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: "A data de nascimento é obrigatória!" });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: "O telefone é obrigatório!" });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: "A senha é obrigatória!" });
    }

    const cpfExistente = contas.find(conta => conta.usuario.cpf === cpf);
    const emailExistente = contas.find(conta => conta.usuario.email === email);

    if (cpfExistente || emailExistente) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    }

    next();
}

const verificarContaExistente = (req, res, next) => {
    const numeroDaConta = Number(req.params.numeroConta);

    if (isNaN(numeroDaConta)) {
        return res.status(400).json({ mensagem: "O número da conta informada é inválido" });
    }

    const contaExistente = contas.find(conta => conta.numero === numeroDaConta);

    if (!contaExistente) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    next();
}

const verificarContaBody = (req, res, next) => {
    const numeroDaConta = req.body.numero_conta;

    if (!numeroDaConta) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório!" });
    }
    if (isNaN(Number(numeroDaConta))) {
        return res.status(400).json({ mensagem: "O número da conta informada é inválido" });
    }

    const contaExistente = contas.find(conta => conta.numero === Number(numeroDaConta));

    if (!contaExistente) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    next();
}

const verificarContaBodyOrigem = (req, res, next) => {
    const numeroDaConta = req.body.numero_conta_origem;

    if (!numeroDaConta) {
        return res.status(400).json({ mensagem: "O número da conta de origem é obrigatório!" });
    }
    if (isNaN(Number(numeroDaConta))) {
        return res.status(400).json({ mensagem: "O número da conta de origem informada é inválido!" });
    }

    const contaExistenteOrigem = contas.find(conta => conta.numero === Number(numeroDaConta));

    if (!contaExistenteOrigem) {
        return res.status(404).json({ mensagem: "Conta bancária de origem não encontrada!" });
    }

    next();
}

const verificarDadosSaldoExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query;
    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));

    if (numero_conta === undefined || numero_conta === null) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório!" });
    }
    if (isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: "O número da conta informada é inválido" });
    }
    if (!contaExistente) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }
    if (senha === undefined || senha === null) {
        return res.status(400).json({ mensagem: "A senha deve ser informada!" });
    }
    if (contaExistente.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "A senha informada é inválida!" });
    }

    next();
}

module.exports = {
    verificarCamposUsuario,
    verificarContaExistente,
    verificarContaBody,
    verificarContaBodyOrigem,
    verificarDadosSaldoExtrato
}
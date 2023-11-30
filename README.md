># API-REST-Sistema-Bancario
## 📂 Descrição do projeto
Projeto realizado como Desafio do Módulo 02 do curso de Desenvolvimento de Software com foco em Back-end da Cubos Academy, com o objetivo de nos fornecer a prática na criação do zero de uma API REST.

A API RESTful do Sistema Bancário foi desenvolvida para realizar operações bancárias e cadastrais de um Banco Digital, com imput dos dados através do Body, Query e da URL no framework Insomnia.

## ⚙ Funcionalidades
* Criar conta bancária

* Listar contas bancárias

* Atualizar os dados do usuário da conta bancária

* Excluir uma conta bancária

* Depositar em uma conta bancária

* Sacar de uma conta bancária

* Transferir valores entre contas bancárias

* Consultar saldo da conta bancária

* Emitir extrato bancário

## 🛠 Linguagens e Ferramentas utilizadas
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)

## Executando o projeto

Para começar a utilizar a API REST do Sistema Bancário na sua máquina, siga estas etapas:

```shell
# 1. Faça o Fork do repositório

# 2. Clone o projeto

git clone <um-dos-links-abaixo>

HTTPS:
https://github.com/MarcelaLinhares/API-REST-Sistema-Bancario.git

SSH:
git@github.com:MarcelaLinhares/API-REST-Sistema-Bancario.git

# 3. No VS Code instale as dependências

npm install

# 4. Execute o servidor

npm run dev

```

Para realizar as requisições com os verbos GET, POST, PUT, DELETE use o framework Insomnia ou similar.

Abra o insomnia e use o caminho:
http://localhost:3000/

## Endpoints no Insomnia
- [ ] Criar Conta Bancária - **POST**
```javascript
http://localhost:3000/contas
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
 "nome": "Exemplo",
 "cpf": "00000000000",
 "data_nascimento": "01/01/1991",
 "telefone": "21900000000",
 "email": "exemplo@exemplo.com",
 "senha": "1234"
}
```

<img src="./imgsReadme/img2_Criar conta bancária.png" >

- [ ] Listar Contas Bancárias - **GET**
```javascript
http://localhost:3000/contas?senha_banco=Cubos123Bank
```

<img src="./imgsReadme/img1_Listar contas bancárias.png" >

- [ ] Atualizar Usuário da Conta Bancária - **PUT**
```javascript
http://localhost:3000/contas/:numeroConta/usuario
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
 "nome": "Exemplo",
 "cpf": "00000000000",
 "data_nascimento": "01/01/1991",
 "telefone": "21900000000",
 "email": "exemplo@exemplo.com",
 "senha": "1234"
}
```

<img src="./imgsReadme/img3_Atualizar usuário da conta bancária.png" >

- [ ] Excluir Conta Bancária - **DELETE**

```javascript
http://localhost:3000/contas/:numeroConta
```

<img src="./imgsReadme/img4_Excluir conta.png" >

- [ ] Depositar - **POST**
```javascript
http://localhost:3000/transacoes/depositar
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
 "numero_conta": "1",
 "valor": 5000
}
```

<img src="./imgsReadme/img5_Depositar.png" >

- [ ] Sacar - **POST**
```javascript
http://localhost:3000/transacoes/sacar
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
 "numero_conta": "1",
 "valor": 120,
 "senha": "1234"
}
```

<img src="./imgsReadme/img6_Sacar.png" >

- [ ] Transferir - **POST**
```javascript
http://localhost:3000/transacoes/transferir
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
 "numero_conta_origem": "1",
"numero_conta_destino": "2",
 "valor": 2000,
 "senha": "1234"
}
```

<img src="./imgsReadme/img7_Transferir.png" >

- [ ] Consultar Saldo - **GET**
```javascript
http://localhost:3000/contas/saldo?numero_conta=1&senha=1234
```

<img src="./imgsReadme/img8_Consultar saldo.png" >

- [ ] Emitir Extrato - **GET**
```javascript
http://localhost:3000/contas/extrato?numero_conta=1&senha=1234
```

<img src="./imgsReadme/img9_Emitir extrato.png" >

## Contribua com o Projeto

- [ ] Realize o Fork
- [ ] Faça as modificações
- [ ] Realize o Pull Request (PR)

## Desenvolvedores

<table>
  <tr>
    <td align="center"><a href="https://github.com/MarcelaLinhares"><img src="https://avatars.githubusercontent.com/u/141354578?v=4" width="50px;" alt=""/><br /><sub><b>Marcela Linhares</b></sub></a><br /></td>

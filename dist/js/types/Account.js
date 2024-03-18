import { TipoTransacao } from "./TipoTransacao.js";
let saldo = 3000;
const KEY_TRANSACOES = 'transacoes';
const transacoes = JSON.parse(localStorage.getItem(KEY_TRANSACOES), (key, value) => {
    if (key == "data") {
        return new Date(value);
    }
    return value;
}) || [];
function debitar(valor) {
    if (valor < 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
        throw new Error("Saldo Insuficiente!");
    }
    saldo -= valor;
}
function depositar(valor) {
    if (valor < 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    saldo += valor;
}
const Account = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    registerTransaction(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if ([TipoTransacao.TRANSFERENCIA, TipoTransacao.PAGAMENTO_BOLETO].includes(novaTransacao.tipoTransacao)) {
            debitar(novaTransacao.valor);
        }
        else {
            alert('Tipo de transação inválido');
            return;
        }
        transacoes.push(novaTransacao);
        console.log('aqui', transacoes);
        localStorage.setItem(KEY_TRANSACOES, JSON.stringify(transacoes));
    }
};
export default Account;

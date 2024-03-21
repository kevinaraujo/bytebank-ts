import { TipoTransacao } from "./TipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem('saldo')) || 0;
const KEY_TRANSACOES = 'transacoes';
const transacoes = JSON.parse(localStorage.getItem(KEY_TRANSACOES), (key, value) => {
    if (key === "data") {
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
    localStorage.setItem('saldo', saldo.toString());
}
function depositar(valor) {
    if (valor < 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    saldo += valor;
    localStorage.setItem('saldo', saldo.toString());
}
const Account = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = JSON.parse(JSON.stringify(transacoes)); // structuredClone(transacoes); deep clone
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => {
            console.log(t1, t2);
            console.log(typeof t1, typeof t2);
            return t2.data.getTime() - t1.data.getTime();
        });
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "2-digit" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            const lastIndex = gruposTransacoes.length - 1;
            gruposTransacoes[lastIndex].transacoes.push(transacao);
        }
        return gruposTransacoes;
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
        //console.log('transacoes => ', this.getGruposTransacoes());
        localStorage.setItem(KEY_TRANSACOES, JSON.stringify(transacoes));
    }
};
export default Account;

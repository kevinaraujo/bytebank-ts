import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = JSON.parse(localStorage.getItem('saldo')) || 0;
const KEY_TRANSACOES = 'transacoes';

const transacoes: Transacao[] = JSON.parse(localStorage.getItem(KEY_TRANSACOES), (key:string, value: string) => {
    if (key === "data") {
        return new Date(value);
    }

    return value;
}) || [];

function debitar(valor: number): void {
    if (valor < 0) { 
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }

    if (valor > saldo) { 
        throw new Error("Saldo Insuficiente!");
    }

    saldo -= valor;
    localStorage.setItem('saldo', saldo.toString());
}


function depositar(valor: number): void {
    if (valor < 0) { 
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    
    saldo += valor;
    localStorage.setItem('saldo', saldo.toString());
}

const Account = {
    getSaldo(): number {
        return saldo;
    },
    getDataAcesso(): Date {
        return new Date();
    },
    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes:GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());

        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric"});
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
    registerTransaction(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);

        } else if([TipoTransacao.TRANSFERENCIA,TipoTransacao.PAGAMENTO_BOLETO].includes(novaTransacao.tipoTransacao)) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;

        } else {
            alert('Tipo de transação inválido');
            return;
        }
        
        transacoes.push(novaTransacao);
        localStorage.setItem(KEY_TRANSACOES, JSON.stringify(transacoes));
        console.log('getGruposTransacoes => ', this.getGruposTransacoes());
    }
}

export default Account;
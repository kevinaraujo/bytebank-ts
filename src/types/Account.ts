import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = 3000;

function debitar(valor: number): void {
    if (valor < 0) { 
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }

    if (valor > saldo) { 
        throw new Error("Saldo Insuficiente!");
    }

    saldo -= valor;
}


function depositar(valor: number): void {
    if (valor < 0) { 
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    
    saldo += valor;
}

const Account = {
    getSaldo(): number {
        return saldo;
    },
    getDataAcesso(): Date {
        return new Date();
    },
    registerTransaction(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);

        } else if([TipoTransacao.TRANSFERENCIA,TipoTransacao.PAGAMENTO_BOLETO].includes(novaTransacao.tipoTransacao)) {
            debitar(novaTransacao.valor);

        } else {
            alert('Tipo de transação inválido');
            return;
        }
        console.log(novaTransacao);
    }
}

export default Account;
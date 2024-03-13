import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = 3000;

const Account = {
    getSaldo(): number {
        return saldo;
    },
    getDataAcesso(): Date {
        return new Date();
    },
    registerTransaction(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            saldo += novaTransacao.valor;
        } else if([TipoTransacao.TRANSFERENCIA,TipoTransacao.PAGAMENTO_BOLETO].includes(novaTransacao.tipoTransacao)) {
            saldo -= novaTransacao.valor;
        } else {
            alert('Tipo de transação inválido');
            return;
        }
        console.log(novaTransacao);
    }
}

export default Account;
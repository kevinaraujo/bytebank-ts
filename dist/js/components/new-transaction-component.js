import { TipoTransacao } from "../types/TipoTransacao.js";
import { getSaldo, updateSaldo } from "./balance-component.js";
const elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!elementoForm.checkValidity()) {
        alert('Preencha todos os dados!');
        return false;
    }
    const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
    const inputValor = elementoForm.querySelector('#valor');
    const inputData = elementoForm.querySelector('#data');
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    let saldo = getSaldo();
    if (tipoTransacao == TipoTransacao.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert('Tipo de transação inválido');
        return;
    }
    updateSaldo(saldo);
    const novaTransacao = {
        tipoTransacao,
        valor,
        data
    };
    console.log(novaTransacao);
    elementoForm.reset();
});

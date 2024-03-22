import SaldoComponent from "./balance-component.js";
import Account from "../types/Account.js";
const elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', function (e) {
    try {
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
        console.log('teste', inputData.value, 'teste', data);
        const novaTransacao = {
            tipoTransacao,
            valor,
            data
        };
        Account.registerTransaction(novaTransacao);
        SaldoComponent.update();
        elementoForm.reset();
    }
    catch (err) {
        alert(err.message);
    }
});

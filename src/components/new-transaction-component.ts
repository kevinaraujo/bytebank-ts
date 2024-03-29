import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import SaldoComponent from "./balance-component.js";
import Account from "../types/Account.js";
import ExtractComponent from "./extract-component.js";

const elementoForm = document.querySelector('.block-nova-transacao form') as HTMLFormElement;
elementoForm.addEventListener('submit', function(e) {
    try {
        e.preventDefault();

        if (!elementoForm.checkValidity()) {
            alert('Preencha todos os dados!');
            return false;
        }

        const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao') as HTMLSelectElement;
        const inputValor = elementoForm.querySelector('#valor') as HTMLInputElement;
        const inputData = elementoForm.querySelector('#data') as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value + " 00:00:00");
       
        const novaTransacao: Transacao = {
            tipoTransacao,
            valor,
            data
        };

        Account.registerTransaction(novaTransacao);
        SaldoComponent.update();
        ExtractComponent.update();
        elementoForm.reset();
    } catch (err) {
        alert(err.message);
    }
});
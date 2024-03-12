import { formatValue, formatDate } from "../utils/formatters.js";
import { FormatoData } from "../types/formatoData.js";

let saldo = 3000;

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;
  

if (elementoDataAcesso != null) {
    const dataAcesso: Date = new Date();
    elementoDataAcesso.textContent = formatDate(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
}

export function getSaldo(): number {
    return saldo;
}

updateSaldo(saldo);

export function updateSaldo(newSaldo: number): void {
    saldo = newSaldo;

    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatValue(saldo);
    }  
}
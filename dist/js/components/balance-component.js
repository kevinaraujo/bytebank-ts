import { formatValue, formatDate } from "../utils/formatters.js";
import { FormatoData } from "../types/formatoData.js";
import Account from "../types/Account.js";
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector(".block-saldo time");
if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formatDate(Account.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
renderSaldo();
function renderSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatValue(Account.getSaldo());
    }
}
const SaldoComponent = {
    update() {
        renderSaldo();
    }
};
export default SaldoComponent;

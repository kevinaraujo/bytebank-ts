var saldo = 3000;
var elementoSaldo = document.querySelector('.saldo-valor .valor');
var elementoDataAcesso = document.querySelector(".block-saldo time");
if (elementoSaldo != null) {
    elementoSaldo.textContent = formatValue(saldo);
}
if (elementoDataAcesso != null) {
    var dataAcesso = new Date();
    elementoDataAcesso.textContent = formatDate(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
}

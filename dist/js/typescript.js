var valor = 3000;
var isPago = false;
var qualquer = "";
qualquer = 22;
// Arrays
var lista = [];
lista.push(13, 3, 11.5, 0);
var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao["DEPOSITO"] = "Dep\u00F3sito";
    TipoTransacao["TRANSAFERENCIA"] = "Transfer\u00EAncia";
    TipoTransacao["PGTO_BOLETO"] = "Pgto de Boleto";
})(TipoTransacao || (TipoTransacao = {}));
;
var novaTransacao = {
    tipoTransacao: TipoTransacao.DEPOSITO,
    data: new Date,
    valor: 0
};

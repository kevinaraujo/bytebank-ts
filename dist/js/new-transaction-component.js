var elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!elementoForm.checkValidity()) {
        alert('Preencha todos os dados!');
        return false;
    }
    var inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
    var inputValor = elementoForm.querySelector('#valor');
    var inputData = elementoForm.querySelector('#data');
    var tipoTransacao = inputTipoTransacao.value;
    var valor = inputValor.valueAsNumber;
    var data = new Date(inputData.value);
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
    elementoSaldo.textContent = formatValue(saldo);
    var novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoForm.reset();
});

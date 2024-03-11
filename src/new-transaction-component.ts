const elementoForm = document.querySelector('.block-nova-transacao form') as HTMLFormElement;
elementoForm.addEventListener('submit', function(e) {
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
    let data: Date = new Date(inputData.value);

    if (tipoTransacao == TipoTransacao.DEPOSITO) {
        saldo += valor;
    } else if(tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    } else {
        alert('Tipo de transação inválido');
        return;
    }

    elementoSaldo.textContent = formatValue(saldo);

    const novaTransacao: Transacao = {
        tipoTransacao,
        valor,
        data
    };

    console.log(novaTransacao);
    elementoForm.reset();
});
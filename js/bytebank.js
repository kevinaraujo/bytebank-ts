let saldo = 3000;

const elementoSaldo = document.querySelector('.saldo-valor .valor');
elementoSaldo.textContent = saldo;


const elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!elementoForm.checkValidity()) {
        alert('Preencha todos os dados!');
        return false;
    }

    const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
    const inputValor = elementoForm.querySelector('#valor');
    const inputData = elementoForm.querySelector('#data');

    let tipoTransacao = inputTipoTransacao.value;
    
    let valor = inputValor.value;
    let data = inputData.value;

    if (tipoTransacao == 'Depósito') {
        saldo += valor;
    } else if(tipoTransacao == 'Transferência' || tipoTransacao == 'Pagamento de Boleto') {
        saldo -= valor;
    } else {
        alert('Tipo de transação inválido');
        return;
    }

    elementoSaldo.textContent = saldo;

    const novaTransacao = {
        tipoTransacao,
        valor,
        data
    };

    console.log(novaTransacao);
    elementoForm.reset();
});
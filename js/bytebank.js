let saldo = 3000;

const elementoValor = document.querySelector('.saldo-valor .valor');
elementoValor.textContent = saldo;


const elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!elementoForm.checkValidity()) {
        alert('Preencha todos os dados!');
        return false;
    }
});
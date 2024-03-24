import Account from "../types/Account.js";
import { FormatoData } from "../types/formatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatValue, formatDate } from "../utils/formatters.js";

const elementoRegistroExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderExtract();
function renderExtract(): void {
    const gruposTransacoes: GrupoTransacao[] = Account.getGruposTransacoes();

    elementoRegistroExtrato.innerHTML = "";
    
    let htmlRegistroTransacoes: string = "";

    for (let grupoTransacao of gruposTransacoes) {
        let htmlItem: string = "";

        for (let transacao of grupoTransacao.transacoes) {
            htmlItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor">${formatValue(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatDate(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `;
        }

        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlItem}
            </div>
        `;
    }

    if(htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = "<div>Não há transações.</div>";
    }

    elementoRegistroExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtractComponent = {
    update(): void {
        renderExtract();
    }
}

export default ExtractComponent;
import { FormatoData } from "../types/formatoData.js";

export function formatValue(value: number): string {
    return value.toLocaleString("pt-br", { currency: "BRL", style: "currency" });
}

export function formatDate(date: Date, format: FormatoData = FormatoData.PADRAO): string {
    if (format === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return date.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    } else if (format === FormatoData.DIA_MES) {
        return date.toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    }

    return date.toLocaleDateString("pt-br");
}
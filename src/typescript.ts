let valor: number = 3000;

let isPago: boolean = false;
let qualquer: any = "";
qualquer = 22;

// Arrays
const lista: number[] = [];
lista.push(13, 3, 11.5, 0);

//Tipos personalizados
type Transacao = {
    tipoTransacao: string,
    data: Date,
    valor: number
};

const novaTransacao: Transacao = {
    tipoTransacao: "",
    data: new Date,
    valor: 0
};
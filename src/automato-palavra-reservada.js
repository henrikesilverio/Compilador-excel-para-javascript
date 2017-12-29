'use strict'

var alfabeto = [
    [
        { "padrao": /^S$/, "proximoEstado": 1 }
    ],
    [
        { "padrao": /^U$/, "proximoEstado": 2 }
    ],
    [
        { "padrao": /^M$/, "proximoEstado": 3 }
    ],
    [
        { "padrao": /^I$/, "proximoEstado": 4 },
        { "padrao": /.*/, "proximoEstado": null }
    ],
    [
        { "padrao": /^F$/, "proximoEstado": null }
    ]
];

function automato(cadeia) {
    var indice = 0;
    var linha = 0;
    var coluna = 0;
    var estado = { "proximoEstado": 0 };
    var simbolo;

    while (estado.proximoEstado !== null) {
        linha = estado.proximoEstado;
        coluna = 0;
        estado = alfabeto[linha][coluna++];
        simbolo = cadeia[indice] === undefined ? "" : cadeia[indice++];
        while (estado != undefined && !estado.padrao.test(simbolo)) {
            estado = alfabeto[linha][coluna++];
        }
        if (estado === undefined) {
            estado = linha === 0
                ? { "proximoEstado": 0 }
                : alfabeto[--linha][0];
            break;
        }
    }
    return estado.proximoEstado === null
        ? "Cadeia aceita!"
        : "Cadeia não aceita!";
}

module.exports = automato;
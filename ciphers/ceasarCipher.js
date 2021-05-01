export class CesarCipher {
    constructor() { };

    encrypt(str, key) {
        let num = key % 26;
        //introduzir nº positivo
        if (num < 0) {
            console.log("Introduza um nº maior ou igual a 0")
        }
        let output = "";
        //percorre cada caracter e vai buscar o caracter que vamos juntar
        for (let i = 0; i < str.length; i++) {
            let charEncript = str[i];
            //encontrar ascii
            if (charEncript.match(/[a-z]/i)) {
                //ascii code
                let code = str.charCodeAt(i);
                //maiusculas
                if (code >= 65 && code <= 90) {
                    charEncript = String.fromCharCode(((code - 65 + num) % 26) + 65);
                }
                //minusculas
                else if (code >= 97 && code <= 122) {
                    charEncript = String.fromCharCode(((code - 97 + num) % 26) + 65)
                }
            }
            output += charEncript;
        }
        return output;
    }

    decrypt(str, key) {
        let num = key % 26; //assegura que vamos buscar a posição correta se o nº passado for maior que 26
        let output = "";
        //percorrer a string e trazer indice
        for (let i = 0; i < str.length; i++) {
            let charDecript = str[i];
            //Obter resultado concatenado, preocupar com min e maisculas dado os Ascii codes
            //fazer o match do range e passar retirar código ASCII - .charCodeAt(i), retirar -65
            if (charDecript.match(/[a-z]/i)) {
                let code = str.charCodeAt(i);
            //fazer as maiscu .fromChartCode retirar -65
            if (code >= 65 && code <= 90) {
                charDecript = String.fromCharCode(((code + 65 - num) % 26) + 65);
            }
            else if (code >= 97 && code <= 122) {
                charDecript = String.fromCharCode(((code + 96 - num) % 26) + 65);
            }
        }
            output += charDecript;
        }
        return output;
    }
}

export class NumericalAlphabetCipher {
    constructor() { };

    encrypt(str, key) {
        

        if (num < 0) {
            console.log("Introduza um nº maior ou igual a 0");
        }

        let output = "";
        

        //itera a string
        for (let i = 0; i < str.lenght; i++) {
            let charEncript = str[i];
            console.log("cenas1");
            //.match, transforma a correspondência entre uma str e expressão regular
            //Exp. Regular -> padrões usados p/ selecionar combinações de chars numa string
            if (charEncript.match(/[a-z]/i)) {
                //.charCodeAt(), encontra index ascii code
                let code = str.charCodeAt(i);
                console.log("cenas");

                //minusculas
                if (code >= 65 && code <= 90) {
                    charEncript = parseInt(code);
                }
                else if (code >= 97 && code <= 122) {
                    charEncript = parseInt(code);               
                }
                
                output+= charEncript;
            }
              return output
        }
    }
};
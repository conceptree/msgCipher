export class InvertedAlphabetCipher {
    constructor() {};

    encrypt(str) {

        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
        var alphabet1 = "abcdefghijklmnopqrstuvwxyz";
        var tebahpla1 = "zyxwvutsrqponmlkjihgfedcba";
        let decoded_string = "";

        for (var i = 0; i < str.length; i++) {
            var coded_letra = str.charAt(i);

            if (/[^a-zA-Z]/.test(str[i])) {
                decoded_string = decoded_string + str[i];
            } else if (str[i] === str[i].toUpperCase()) {
                var letraPosMayus = alphabet.indexOf(coded_letra);
                var tebLetraPosMayus = tebahpla.charAt(letraPosMayus);
                decoded_string = decoded_string + tebLetraPosMayus;
            } else {
                var letraPosMinus1 = alphabet1.indexOf(coded_letra);
                var tebLetraPosMinus1 = tebahpla1.charAt(letraPosMinus1);
                decoded_string = decoded_string + tebLetraPosMinus1;
            }
        }
        return decoded_string;
    }
}
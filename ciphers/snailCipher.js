export class SnailCipher {
    constructor() {};

    encrypt(str, key) {
        let size = parseInt(key);
        let decoded_string = str;
        let value = 0,
            minCol = 0,
            minRow = 0;
        if (Number.isNaN(size)) {
            window.alert("A key tem de ser um numero");
            return decoded_string
        } else {
            var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var spiral = [size][size];
            decoded_string = str.replaceAll(/\s/g, "").toUpperCase();
            console.log(decoded_string);


        }

    }
}
export class SnailCipher {
    constructor() {};

    encrypt(str, key) {
        let size = parseInt(key);
        let decoded_string = str;
        var encryptedMessage = "";
        var spiralTest = new Array();
        let value = 0,
            minCol = 0,
            minRow = 0;
        if (Number.isNaN(size)) {
            window.alert("A key tem de ser um numero");
            return decoded_string
        } else {
            var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var spiral = Array(size).fill(null).map(() => Array(size));
            let maxCol = size - 1;
            let maxRow = size - 1;
            decoded_string = str.replaceAll(/\s/g, "").toUpperCase();
            var diff = (size * size) - decoded_string.length;
            if (decoded_string.length < (size * size)) {
                for (var i = 1; i <= diff; i++) {
                    var randomChartPosition = Math.floor(Math.random() * 23);
                    var randomLetter = alphabet.charAt(randomChartPosition);
                    decoded_string = decoded_string + randomLetter;
                }
            }
            if (decoded_string.length > size * size) {
                window.alert("O numero da altura/largura da tabela é demasiado pequeno.");
                return decoded_string
            }

            while (value < size * size) {
                for (var i = minRow; i <= maxRow; i++) {
                    spiral[i][minCol] = decoded_string.charAt(value);
                    value++;
                }

                for (var i = minCol + 1; 1 <= maxCol; i++) {
                    spiral[maxRow][i] = decoded_string.charAt(value);
                    value++;
                }

                for (var i = maxRow - 1; i >= minRow; i--) {
                    spiral[i][maxCol] = decoded_string.charAt(value);
                    value++;
                }

                for (var i = maxCol - 1; i >= minCol + 1; i--) {
                    spiral[minRow][i] = decoded_string.charAt(value);
                    value++;
                }

                minCol++;
                minRow++;
                maxCol--;
                maxRow--;
            }

            for (spiralTest in spiral) {
                console.log("teste de chegada ao ciclo spiralTest");
                for (var j = 0; j < spiral.length; j++) {
                    console("linha da espiral: " + spiralTest[j]);
                    encryptedMessage = encryptedMessage + spiralTest[j];
                }
            }

            return encryptedMessage
        }

    }
}
export class VerticalCipher {

    constructor() {

    }

    encrypt(str) {
        let result = [];
        let temp = [];
        let runs = 0;
        let charsNum = str.split("").length;
        str.split("").forEach(char => {
            if (charsNum !== 1) {
                if (runs === 4) {
                    runs = 0;
                    temp.reverse();
                    result = [...temp];
                } else {
                    temp.push(char);
                    runs++;
                }
                charsNum--;
            } else {
                result.push(char);
            }
        });
        return result;
    }

    decrypt(str) {

    }

}
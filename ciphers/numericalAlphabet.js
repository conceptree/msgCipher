export class NumericalAlphabetCipher {
    constructor() {
        this.alphabet = ["a", "b", "c", "d", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        this.nums = [];
        this.createNumsArray = (key) => {
            for (let i = key; i < key + 25; i++) {
                this.nums.push(i);
            }
        };
    }

    encrypt(str, key) {
        let result = [];

       this.createNumsArray(Number(key));

        str.split("").forEach(char => {
            result.push(this.nums[this.alphabet.indexOf(char.toLowerCase())], ",");
        });

        return result.join("");

    }

    decrypt(str,key){
        let result = [];

        this.createNumsArray(Number(key));

        str.split(",").forEach(num => {
            result.push(this.alphabet[this.nums.indexOf(Number(num))]);
        });

        return result.join("");
    }

}


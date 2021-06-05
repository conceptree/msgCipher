export class NumericalAlphabetCipher {
    constructor() {
        this.alphabet = ["a", "b", "c", "d", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        this.nums = []
        this.splitToDigit = function(numbers){
            return (numbers + '').split('').map((i) => {
                return Number(i);
            })
        }
    };

  

    encrypt(str, key) {
        let result = [];


        for (let i = key; i < key + 25; i++) {
            this.nums.push(i);
        }

        
        str.split("").forEach(char => {
            result.push(this.nums[this.alphabet.indexOf(char.toLowerCase())]);
        });

        return result.join("");

    }

    decryp(numbers,key){
        let result = [];

        for(let i = key; i < key + 25; i++){
            this.nums.push(i);
        }

        this.splitToDigit(numbers).forEach(numbers => {
            result.push(this.nums[this.alphabet.valueOf(numbers)]);
        });

        return result.join("");
    }
}


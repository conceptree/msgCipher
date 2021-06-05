class NumericalAlphabetCipher {
    constructor() {
        this.alphabet = ["a", "b", "c", "d", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        this.nums = [];
    };

    splitToDigit = function(numbers){
        return (numbers + '').split('').map((i) => {
            return Number(i);
        })
    }

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

        this.splitToDigit(numbers).forEach(num => {
            result.push(this.nums[this.alphabet.valueOf(num)]);
        });

        return result.join("");
    }
}

const numerical = new NumericalAlphabetCipher;
console.log(numerical.encrypt("ABC", 2));
console.log(numerical.decryp(234,2));
console.log(numerical.splitToDigit(100));

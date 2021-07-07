import { SnailArray } from "./util/snailArray.js";
export class SnailCipher {
    constructor() {
        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.snailArray = new SnailArray();
    }

    encrypt(str, key) {
        let chars = str.trim().replace(/\s/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").split("");

        key = Number(key);

        let templist = chars.reduce((all, one, i) => {
            const ch = Math.floor(i / key);
            all[ch] = [].concat((all[ch] || []), one);
            return all;
        }, []);

        templist.forEach(innerList => {
            while (innerList.length < key) {
                innerList.push(this.alphabet[Math.floor(Math.random() * this.alphabet.length)]);
            }
        });

        let result = this.snailArray.snail(templist);

        return result.join("").replace(/,/g, '');
    }

    decrypt(str, key) {
        const length = str.length;
        const square = Math.sqrt(length);
        let chars = str.split("");

        let templist = chars.reduce((all, one, i) => {
            const ch = Math.floor(i / square);
            all[ch] = [].concat((all[ch] || []), one);
            return all;
        }, []);

        var result = [];
        while (templist.length) {
            result.push(...templist.shift());
            templist.map(row => result.push(row.pop()))
            templist.reverse().map(row => row.reverse());
        }
        
        return result.join("");
    }

}
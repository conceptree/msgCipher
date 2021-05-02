export class CrabCipher {
    constructor() { };

    encrypt(msg){
        return msg.split("").reverse().join("");
    }

    decrypt(msg){
        return msg.split("").reverse().join("");
    }

}
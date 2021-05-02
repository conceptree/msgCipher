
export class Passa2MelrosCipher{

    constructor(){
        this.alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    }

    encrypt(msg){
        let result = msg.split("").map(char => {
            let random1 =  this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
            let random2 =  this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
            return char+random1+random2;
        });
        return result.join("");
    }

    decrypt(msg){
        
    }
}


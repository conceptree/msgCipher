export class FakeBrailleCipher{
    
    constructor(){
        this.square1 = [
            ["A","B","C"],
            ["D","E","F"],
            ["G","H","I"]
        ];
        this.square2 = [
            ["J","K","L"],
            ["M","N","O"],
            ["P","Q","R"]
        ];
        this.square3 = [
            ["S","T","U"],
            ["V","W","X"],
            ["Y","Z", ""]
        ];
        this.squares = [this.square1, this.square2, this.square3];
        this.specialChars = ["•","••","•••"];
    }

    encrypt(msg){
        const splitedMessage = msg.split("");
        let result = [];
        for(let i=0; i < this.squares.length; i++){
            
        }
    }

    decrypt(msg){

    }
}
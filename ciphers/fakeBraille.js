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

        this.squareA = [
            ["⠇", "⠇⠄", "⠇⠄⠄"],
            ["⠇⠂", "⠇⠆", "⠇⠆⠄"],
            ["⠇⠂⠂", "⠇⠆⠂", "⠇⠆⠆"],
        ];

        this.squareB = [
            ["⠇⠁", "⠇⠅", "⠇⠅⠄"],
            ["⠇⠃", "⠇⠇", "⠇⠇⠄"],
            ["⠇⠃⠂", "⠇⠇⠂", "⠇⠇⠆"],
        ];

        this.squareC = [
            ["⠇⠁⠁", "⠇⠅⠁", "⠇⠅⠅"],
            ["⠇⠃⠁", "⠇⠇⠁", "⠇⠇⠅"],
            ["⠇⠃⠃", "⠇⠇⠃", "⠇⠇⠇"],
        ];

        this.letters = [this.square1, this.square2, this.square3];
        this.brailles = [this.squareA, this.squareB, this.squareC];
    }

    encrypt(msg){
        
    }

    decrypt(msg){

    }
}
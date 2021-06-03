export class FakeBrailleCipher {

    constructor() {
        this.square1 = [
            ["A", "B", "C"],
            ["D", "E", "F"],
            ["G", "H", "I"]
        ];
        this.square2 = [
            ["J", "K", "L"],
            ["M", "N", "O"],
            ["P", "Q", "R"]
        ];
        this.square3 = [
            ["S", "T", "U"],
            ["V", "W", "X"],
            ["Y", "Z", ""]
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

    encrypt(msg) {
        let result = [];
        msg.toUpperCase().split("").forEach(char => {
            for(let i=0; i < this.letters.length; i++){
                for(let j=0; j < this.letters[i].length; j++){
                    for(let k=0; k < this.letters[i][j].length; k++){
                        if(this.letters[i][j].indexOf(char) > 0){
                            result.push(this.brailles[i][j][this.letters[i][j].indexOf(char)], "|");
                        }
                    }
                }
            }
        });
        return result.join("");
    }

    decrypt(msg) {
        let result = [];
        msg.split("|").forEach(char => {
            for(let i=0; i < this.brailles.length; i++){
                for(let j=0; j < this.brailles[i].length; j++){
                    for(let k=0; k < this.brailles[i][j].length; k++){
                        if(this.brailles[i][j].indexOf(char) > 0){
                            result.push(this.letters[i][j][this.brailles[i][j].indexOf(char)]);
                        }
                    }
                }
            }
        });
        return result.join("");
    }
}
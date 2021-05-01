import {CesarCipher} from '../ciphers/cesarCipher.js';
import {NumericalAlphabetCipher} from '../ciphers/numericalAlphabet.js';

class Main {
    constructor(){
        this.messageInput = document.querySelector("#messageInput");
        this.msgKeyInput = document.querySelector("#msgKeyInput");
        this.encryptButton = document.querySelector("#encryptButton");
        this.decryptButton = document.querySelector("#decryptButton");
        this.ciphersSelector = document.querySelector("#ciphers");
        this.getCiphers();
    }
    /// GET LIST OF AVAILABLE CIPHERS
    getCiphers(){
        fetch("../data/ciphers.json")
        .then(resp => {
            return resp.json();
        })
        .then(data => {
           this.ciphers = data;
           this.buildSelector();
           this.buildButtonListeners();
        })
        .catch(error => console.log(error));
    }
    ///BUILD CIPHERS SELECTOR
    buildSelector(){
        this.ciphers.forEach(cipher => {
            this.ciphersSelector.insertAdjacentHTML("beforeend",`<option>${cipher.name}</option>`)
        });
    }
    ///BUILD BUTTONS LISTENERS
    buildButtonListeners(){
        this.encryptButton = document.querySelector("#encryptButton");
        this.decryptButton = document.querySelector("#decryptButton");
        this.encryptButton.addEventListener("click", this.encrypt.bind(this));
        this.decryptButton.addEventListener("click", this.decrypt.bind(this));
    }
    ///ENCRYPT MESSAGE
    encrypt(){
        const cipher = this.ciphers[this.ciphers.findIndex(cipher => cipher.name == selectedCipher)];
        const message = this.messageInput.value;
        const selectedCipher = this.ciphersSelector.value;
        const key = this.msgKeyInput.value;
        if(selectedCipher !== "" || selectedCipher !== null){
            const cipherObj = eval(`new ${this.ciphers[this.ciphers.findIndex(cipher => cipher.name == selectedCipher)].object}();`);
        }
    }
    ///DECRYPT MESSAGE
    decrypt(){

    }
}

const main = new Main();




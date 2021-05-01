import {CesarCipher} from '../ciphers/ceasarCipher.js';
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
        })
        .catch(error => console.log(error));
    }
    ///BUILD CIPHERS SELECTOR
    buildSelector(){
        this.ciphers.forEach(cipher => {
            this.ciphersSelector.insertAdjacentHTML("beforeend",`<option>${cipher.name}</option>`)
        });
    }
    ///ENCRYPT MESSAGE
    encrypt(){

    }
    ///DECRYPT MESSAGE
    decrypt(){

    }
}

const main = new Main();




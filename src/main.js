import { firebaseConfig } from '../data/firebaseConfig.js';
import { CesarCipher } from '../ciphers/cesarCipher.js';
import { NumericalAlphabetCipher } from '../ciphers/numericalAlphabet.js';
import { CrabCipher } from '../ciphers/crabCipher.js';
import { Passa2MelrosCipher } from '../ciphers/passa2melros.js';
import { InvertedAlphabetCipher } from '../ciphers/invertedAlphabet.js';
import { SnailCipher } from '../ciphers/snailCipher.js';
import { FakeBrailleCipher } from '../ciphers/fakeBraille.js';
import { Passa1Melro } from '../ciphers/passa1melro.js';

class Main {
    constructor() {
            this.messageInput = document.querySelector("#messageInput");
            this.msgKeyInput = document.querySelector("#msgKeyInput");
            this.encryptButton = document.querySelector("#encryptButton");
            this.decryptButton = document.querySelector("#decryptButton");
            this.ciphersSelector = document.querySelector("#ciphers");
            this.getCiphers();
        }
        /// GET LIST OF AVAILABLE CIPHERS
    getCiphers() {
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
    buildSelector() {
            this.ciphers.forEach(cipher => {
                this.ciphersSelector.insertAdjacentHTML("beforeend", `<option>${cipher.name}</option>`)
            });
        }
        ///BUILD BUTTONS LISTENERS
    buildButtonListeners() {
            this.encryptButton = document.querySelector("#encryptButton");
            this.decryptButton = document.querySelector("#decryptButton");
            this.encryptButton.addEventListener("click", this.runCipher.bind(this));
            this.decryptButton.addEventListener("click", this.runCipher.bind(this));
        }
        ///ENCRYPT MESSAGE
    runCipher(event) {
        const action = event.target.id === "encryptButton" ? "encrypt" : "decrypt";
        const message = this.messageInput.value;
        const selectedCipher = this.ciphersSelector.value;
        const cipher = this.ciphers[this.ciphers.findIndex(cipher => cipher.name == selectedCipher)];
        const key = cipher.key ? this.msgKeyInput.value : null;
        if (selectedCipher !== "" || selectedCipher !== null) {
            const cipherObj = eval(`new ${cipher.object}();`);
            this.messageInput.value = cipherObj[action](message, key);
        }
    }
}

const main = new Main();
firebase.initializeApp(firebaseConfig);
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}
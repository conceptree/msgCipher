import { firebaseConfig } from '../data/firebaseConfig.js';
import { BitlyService } from '../data/bitlyService.js';
import { CesarCipher } from '../ciphers/cesarCipher.js';
import { NumericalAlphabetCipher } from '../ciphers/numericalAlphabet.js';
import { CrabCipher } from '../ciphers/crabCipher.js';
import { Passa2MelrosCipher } from '../ciphers/passa2melros.js';
import { InvertedAlphabetCipher } from '../ciphers/invertedAlphabet.js';
import { SnailCipher } from '../ciphers/snailCipher.js';
import { FakeBrailleCipher } from '../ciphers/fakeBraille.js';
import { Passa1Melro } from '../ciphers/passa1melro.js';
import { MorseNodes } from '../ciphers/morseNodes.js';
import { MountainMorse } from '../ciphers/mountainMorse.js';
import { HorizontalCipher } from '../ciphers/horizontalCipher.js';

export class Main {
    constructor() {
        this.bitlyService = new BitlyService();
        this.key = null;
        this.cipher = null;
        this.messageInput = document.querySelector("#messageInput");
        this.msgKeyInput = document.querySelector("#msgKeyInput");
        this.encryptButton = document.querySelector("#encryptButton");
        this.decryptButton = document.querySelector("#decryptButton");
        this.ciphersSelector = document.querySelector("#ciphers");
        this.sendWhatsAppBtn = document.querySelector("#sendWhatsappBtn");
        this.sendWhatsAppBtn.addEventListener("click", this.sendWhatsAppMsg.bind(this), true);
        this.ciphersSelector.addEventListener("change", this.keySelectorToggle.bind(this), true);
        this.msgKeyInput.addEventListener("change", (evt) => {
            this.key = evt.target.value;
        });
        this.getCiphers();
    }
    /// GET LIST OF AVAILABLE CIPHERS
    getCiphers() {
        fetch("./data/ciphers.json")
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                this.ciphers = data;
                this.buildSelector();
                this.buildButtonListeners();
                this.readUrl();
            })
            .catch(error => console.log(error));
    }
    ///BUILD CIPHERS SELECTOR
    buildSelector() {
        this.ciphers.forEach(cipher => {
            this.ciphersSelector.insertAdjacentHTML("beforeend", `<option>${cipher.name}</option>`);
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
        const cipherObj = eval(`new ${this.cipher.object}();`);
        this.messageInput.value = cipherObj[action](message, this.key);
    }
    ///KEY SELECTOR TOGGLE
    keySelectorToggle(evt) {
        this.cipher = this.ciphers[this.ciphers.findIndex(cipher => cipher.name == this.ciphersSelector.value)];
        this.msgKeyInput.parentElement.classList[this.cipher.key ? "remove" : "add"]("hidden");
    }
    ///SEND THE MESSAGE THROUGH WHATSAPP
    sendWhatsAppMsg() {
        const phone = document.querySelector("#whatsappInput").value;
        const message = document.querySelector("#messageInput").value;
        const cipher = this.ciphersSelector.value;
        const content = btoa(`${cipher}&key=${this.key}&message=${message}`);
        this.bitlyService.getShortenLink(`https://conceptree.github.io/msgCipher/?content=${content}`).then(resp => {
            window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${message + " DECRYPT IN " + resp.link}`);
        });
    }
    ///READ URL
    readUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('content');
        if(myParam !== "" && myParam !== undefined && myParam !== null){
            
            const cipherParam =  atob(myParam).split("&")[0];
            const key = atob(myParam).split("key=")[1].split("&")[0];
            const message = atob(myParam).split("message=")[1];
            const cipherIndex = this.ciphers.findIndex(el => el.name === cipherParam)+1;

            this.key = key;
            this.cipher = this.ciphers[this.ciphers.findIndex(cipher => cipher.name == cipherParam)];

            this.msgKeyInput.parentElement.classList[!key ? "add" : "remove"]("hidden");
            this.ciphersSelector.selectedIndex = cipherIndex;            
            this.messageInput.value = String(message);
            this.msgKeyInput.value = String(this.key);

            this.decryptButton.click();
        }
    }
}

const main = new Main();

firebase.initializeApp(firebaseConfig);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
} else {
    console.warn("Your browser does not support service workers!");
}
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
import { SmsCipher } from '../ciphers/smsCipher.js';

export class Main {
    constructor() {
        this.bitlyService = new BitlyService();
        this.jsEncrypt = new JSEncrypt();
        this.key = null;
        this.cipher = null;
        this.messageInput = document.querySelector("#messageInput");
        this.msgKeyInput = document.querySelector("#msgKeyInput");
        this.ciphersButton = document.querySelector("#ciphersbtn");
        this.rsaButton = document.querySelector("#rsabtn");
        this.rsaTimer = document.querySelector("#rsaTimer");
        this.privateKeyInput = document.querySelector("#privateKeyInput");
        this.publicKeyInput = document.querySelector("#publicKeyInput");
        this.sendWhatsAppBtn = document.querySelector("#sendWhatsappBtn");
        this.sendEmailBtn = document.querySelector("#sendEmailBtn");
        this.encryptButton = document.querySelector("#encryptButton");
        this.decryptButton = document.querySelector("#decryptButton");
        this.generateKeysButton = document.querySelector("#generateKeyBtn");
        this.keySizeSelector = document.querySelector("#keySizes");
        this.generateKeysButton.addEventListener("click", this.generateKeys.bind(this));
        this.encryptButton.addEventListener("click", this.runCipher.bind(this));
        this.decryptButton.addEventListener("click", this.runCipher.bind(this));
        this.ciphersButton.addEventListener("click", this.toggleViews.bind(this));
        this.rsaButton.addEventListener("click", this.toggleViews.bind(this));
        this.sendWhatsAppBtn.addEventListener("click", this.sendWhatsAppMsg.bind(this), true);
        this.sendEmailBtn.addEventListener("click", this.sendMailMsg.bind(this), true);
        this.msgKeyInput.addEventListener("change", (evt) => {
            this.key = evt.target.value;
        });
        this.keySizeSelector.addEventListener("change", (evt) => {
            this.keySize = evt.target.value.split("bit")[0].trim();
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
                this.readUrl();
            })
            .catch(error => console.log(error));
    }
    ///BUILD CIPHERS SELECTOR
    buildSelector() {
        this.ciphersSelector = document.querySelector("#ciphers");
        this.ciphers.forEach(cipher => {
            this.ciphersSelector.insertAdjacentHTML("beforeend", `<option>${cipher.name}</option>`);
        });
        this.ciphersSelector.addEventListener("change", (evt) => {
            this.cipher = this.ciphers[this.ciphers.findIndex(cipher => cipher.name == evt.target.value)];
            this.msgKeyInput.parentElement.classList[this.cipher.key ? "remove" : "add"]("hidden");
        });
    }
    ///ENCRYPT MESSAGE
    runCipher(event) {
        const action = event.target.id === "encryptButton" ? "encrypt" : "decrypt";
        const message = this.messageInput.value;
        const cipherObj = eval(`new ${this.cipher.object}();`);
        this.messageInput.value = cipherObj[action](message, this.key);
    }
    ///SEND THE MESSAGE THROUGH WHATSAPP
    sendWhatsAppMsg() {
        const phone = document.querySelector("#whatsappInput").value;
        const message = document.querySelector("#messageInput").value;
        const cipher = this.ciphersSelector.value;
        const content = btoa(`${cipher}&key=${this.key}&message=${message}`);
        this.bitlyService.getShortenLink(`https://conceptree.github.io/msgCipher/?content=${content}`).then(resp => {
            window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${message + " DECRYPT IN: " + resp.link}`);
        });
    }
    ///SEND THE MESSAGE THROUGH MAIL
    sendMailMsg() {
        const email = document.querySelector("#emailInput").value;
        const message = document.querySelector("#messageInput").value;
        const cipher = this.ciphersSelector.value;
        const content = btoa(`${cipher}&key=${this.key}&message=${message}`);
        this.bitlyService.getShortenLink(`https://conceptree.github.io/msgCipher/?content=${content}`).then(resp => {
            window.open(`mailto:${email}?subject=MsgCipher Message&body=${message + " DECRYPT IN " + resp.link}`);
        });
    }
    ///READ URL
    readUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('content');
        if (myParam !== "" && myParam !== undefined && myParam !== null) {

            const cipherParam = atob(myParam).split("&")[0];
            const key = atob(myParam).split("key=")[1].split("&")[0];
            const message = atob(myParam).split("message=")[1];
            const cipherIndex = this.ciphers.findIndex(el => el.name === cipherParam) + 1;

            this.key = key;
            this.cipher = this.ciphers[this.ciphers.findIndex(cipher => cipher.name == cipherParam)];

            this.msgKeyInput.parentElement.classList[!key ? "add" : "remove"]("hidden");
            this.ciphersSelector.selectedIndex = cipherIndex;
            this.messageInput.value = String(message);
            this.msgKeyInput.value = String(this.key);

            this.decryptButton.click();
        }
    }
    ///TOGGLE VIEWS
    toggleViews(evt) {
        document.querySelectorAll("form").forEach(form => {
            form.classList.add("hidden");
        });
        document.querySelectorAll(".nav-link").forEach(form => {
            form.classList.remove("active");
        });
        evt.target.classList.add("active");
        let visible = "";
        switch (evt.target.id) {
            case "ciphersbtn":
                visible = "ciphersForm";
                break;
            case "rsabtn":
                visible = "rsaForm";
                break;
        }
        document.querySelector("#" + visible).classList.remove("hidden");
    }
    ///GENERATE KEYS
    generateKeys() {
        let keySize = parseInt(this.keySize);
        let crypt = new JSEncrypt({ default_key_size: keySize });
        let async = document.querySelector("#asyncCheck").checked;
        let dt = new Date();
        let time = -(dt.getTime());
        if (async) {
            this.rsaTimer.textContent = '.';
            let load = setInterval(() => {
                let text = this.rsaTimer.textContent;
                this.rsaTimer.textContent = text + '.';
            }, 500);
            crypt.getKey(() => {
                clearInterval(load);
                dt = new Date();
                time += (dt.getTime());
                this.rsaTimer.textContent = 'Generated in ' + time + ' ms';
                this.privateKeyInput.value = crypt.getPrivateKey();
                this.publicKeyInput.value = crypt.getPublicKey();
            });
            return;
        }
        crypt.getKey();
        dt = new Date();
        time += (dt.getTime());
        this.rsaTimer.textContent = 'Generated in ' + time + ' ms';
        this.privateKeyInput.value = crypt.getPrivateKey();
        this.publicKeyInput.value = crypt.getPublicKey();
    }
}

const main = new Main();

firebase.initializeApp(firebaseConfig);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
} else {
    console.warn("Your browser does not support service workers!");
}
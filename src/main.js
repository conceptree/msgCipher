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
        this.key = null;
        this.cipher = null;
        this.messageInput = document.querySelector("#messageInput");
        this.msgKeyInput = document.querySelector("#msgKeyInput");
        this.ciphersButton = document.querySelector("#ciphersbtn");
        this.rsaButton = document.querySelector("#rsabtn");
        this.hashButton = document.querySelector("#hashbtn");
        this.rsaTimer = document.querySelector("#rsaTimer");
        this.rsaMessageContainer = document.querySelector("#rsaMessageContainer");
        this.rsaMessageInput = document.querySelector("#rsaMessageInput");
        this.privateKeyInput = document.querySelector("#privateKeyInput");
        this.publicKeyInput = document.querySelector("#publicKeyInput");
        this.sendWhatsAppBtn = document.querySelector("#sendWhatsappBtn");
        this.sendEmailBtn = document.querySelector("#sendEmailBtn");
        this.encryptButton = document.querySelector("#encryptButton");
        this.decryptButton = document.querySelector("#decryptButton");
        this.rsaEncryptButton = document.querySelector("#rsaEncryptButton");
        this.rsaDecryptButton = document.querySelector("#rsaDecryptButton");
        this.generateKeysButton = document.querySelector("#generateKeyBtn");
        this.hashMessageInput = document.querySelector("#hashMessageInput");
        this.keySizeSelector = document.querySelector("#keySizes");
        this.generateKeysButton.addEventListener("click", this.generateKeys.bind(this));
        this.encryptButton.addEventListener("click", this.runCipher.bind(this));
        this.decryptButton.addEventListener("click", this.runCipher.bind(this));
        this.rsaEncryptButton.addEventListener("click", this.rsaEncryption.bind(this));
        this.rsaDecryptButton.addEventListener("click", this.rsaEncryption.bind(this));
        this.ciphersButton.addEventListener("click", this.toggleViews.bind(this));
        this.rsaButton.addEventListener("click", this.toggleViews.bind(this));
        this.hashButton.addEventListener("click", this.toggleViews.bind(this));
        this.sendWhatsAppBtn.addEventListener("click", this.sendWhatsAppMsg.bind(this), true);
        this.sendEmailBtn.addEventListener("click", this.sendMailMsg.bind(this), true);
        this.hashMessageInput.addEventListener("input", this.hashMessage.bind(this), true);
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
        let content = this.currentTab === "ciphersForm" ? btoa(`tab=${this.currentTab}&cipher=${this.ciphersSelector.value}&key=${this.key}&message=${this.messageInput.value}`) : btoa(`tab=${this.currentTab}&privKey=${this.privateKeyInput.value}&pubKey=${this.publicKeyInput.value}&message=${this.rsaMessageInput.value}`);
        this.bitlyService.getShortenLink(`https://conceptree.github.io/msgCipher/?content=${content}`).then(resp => {
            window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${this.currentTab === "ciphersForm" ? this.messageInput.value : this.rsaMessageInput.value + " DECRYPT IN: " + resp.link}`);
        });
        
    }
    ///SEND THE MESSAGE THROUGH MAIL
    sendMailMsg() {
        const email = document.querySelector("#emailInput").value;
        let content = this.currentTab === "ciphersForm" ? btoa(`tab=${this.currentTab}&cipher=${this.ciphersSelector.value}&key=${this.key}&message=${this.messageInput.value}`) : btoa(`tab=${this.currentTab}&privKey=${this.privateKeyInput.value}&pubKey=${this.publicKeyInput.value}&message=${this.rsaMessageInput.value}`);
        this.bitlyService.getShortenLink(`https://conceptree.github.io/msgCipher/?content=${content}`).then(resp => {
            window.open(`mailto:${email}?subject=MsgCipher Message&body=${this.currentTab === "ciphersForm" ? this.messageInput.value : this.rsaMessageInput.value + " DECRYPT IN " + resp.link}`);
        });
    }
    ///READ URL
    readUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('content');
        if (myParam !== "" && myParam !== undefined && myParam !== null) {

            const tab = atob(myParam).split("tab=")[1].split("&")[0];

            if (tab !== "" && tab !== undefined && tab !== null) {
                this.toggleViews({target:document.querySelector(`#${tab === "ciphersForm" ? "ciphersbtn" : "rsabtn"}`)});
            } else {
                return;
            }

            if (this.currentTab === "ciphersForm") {
                const cipherParam = atob(myParam).split("&cipher=")[1].split("&key")[0];
                const key = atob(myParam).split("key=")[1].split("&message")[0];
                const message = atob(myParam).split("message=")[1];
                const cipherIndex = this.ciphers.findIndex(el => el.name === cipherParam) + 1;
                this.key = key;
                this.cipher = this.ciphers[this.ciphers.findIndex(cipher => cipher.name == cipherParam)];
                this.msgKeyInput.parentElement.classList[!key ? "add" : "remove"]("hidden");
                this.ciphersSelector.selectedIndex = cipherIndex;
                this.messageInput.value = String(message);
                this.msgKeyInput.value = String(this.key);
                this.decryptButton.click();
            } else {
                this.jsEncrypt = new JSEncrypt();
                this.rsaMessageContainer.classList.remove("hidden");
                this.privateKeyInput.value = atob(myParam).split("privKey=")[1].split("&")[0];
                this.publicKeyInput.value = atob(myParam).split("pubKey=")[1].split("&")[0];
                this.rsaMessageInput.value = atob(myParam).split("message=")[1];
                this.rsaEncryption({target:{id:"rsaDecryptButton"}});
            }

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
        this.currentTab = "";
        switch (evt.target.id) {
            case "ciphersbtn":
                this.currentTab = "ciphersForm";
            break;
            case "rsabtn":
                this.currentTab = "rsaForm";
            break;
            case "hashbtn":
                this.currentTab = "hashForm";
            break;
        }
        document.querySelector("#" + this.currentTab).classList.remove("hidden");
    }
    ///GENERATE KEYS
    generateKeys() {
        let keySize = parseInt(this.keySize);
        this.jsEncrypt = new JSEncrypt({ default_key_size: keySize });
        let async = document.querySelector("#asyncCheck").checked;
        let dt = new Date();
        let time = -(dt.getTime());
        if (async) {
            this.rsaTimer.textContent = '.';
            let load = setInterval(() => {
                let text = this.rsaTimer.textContent;
                this.rsaTimer.textContent = text + '.';
            }, 500);
            this.jsEncrypt.getKey(() => {
                clearInterval(load);
                dt = new Date();
                time += (dt.getTime());
                this.rsaTimer.textContent = 'Generated in ' + time + ' ms';
                this.privateKeyInput.value = this.jsEncrypt.getPrivateKey();
                this.publicKeyInput.value = this.jsEncrypt.getPublicKey();
                this.rsaMessageContainer.classList.remove("hidden");
            });
            return;
        }
        this.jsEncrypt.getKey();
        dt = new Date();
        time += (dt.getTime());
        this.rsaTimer.textContent = 'Generated in ' + time + ' ms';
        this.privateKeyInput.value = this.jsEncrypt.getPrivateKey();
        this.publicKeyInput.value = this.jsEncrypt.getPublicKey();
    }
    ///RSA ENCRYPTION
    rsaEncryption(evt) {
        // Set the private.
        this.jsEncrypt.setPrivateKey(this.privateKeyInput.value);
        switch (evt.target.id) {
            case "rsaEncryptButton":
                this.rsaMessageInput.value = this.jsEncrypt.encrypt(this.rsaMessageInput.value);
                break;
            case "rsaDecryptButton":
                this.rsaMessageInput.value = this.jsEncrypt.decrypt(this.rsaMessageInput.value);
                break;
        }
    }
    ///HASHING
    hashMessage(){
        document.querySelector("#md5MessageInput").value = CryptoJS.MD5(this.hashMessageInput.value);
        document.querySelector("#sha1MessageInput").value = CryptoJS.SHA1(this.hashMessageInput.value);
        document.querySelector("#sha256MessageInput").value = CryptoJS.SHA256(this.hashMessageInput.value);
        document.querySelector("#sha512MessageInput").value = CryptoJS.SHA512(this.hashMessageInput.value);
        document.querySelector("#sha3MessageInput").value = CryptoJS.SHA3(this.hashMessageInput.value);
    }
}

const main = new Main();

firebase.initializeApp(firebaseConfig);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
} else {
    console.warn("Your browser does not support service workers!");
}
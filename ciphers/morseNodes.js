export class MorseNodes {
    constructor() {
        this.alphabetEncode = {
            'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..',
            'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
            'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
            'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
            'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
            'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
            'y': '-.--', 'z': '--..',
            /* ' ': '/',
            '1': '.----', '2': '..---', '3': '...--', '4': '....-',
            '5': '.....', '6': '-....', '7': '--...', '8': '---..',
            '9': '----.', '0': '-----',*/
        }

        this.alphabetDecode = {
            '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd',
            '.': 'e', '..-.': 'f', '--.': 'g', '....': 'h',
            '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l',
            '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p',
            '--.-': 'q', '.-.': 'r', '...': 's', '-': 't',
            '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x',
            '-.--': 'y', '--..': 'z',
            /* '.----': '1', '..---': '2',
            '...--': '3', '....-': '4', '.....': '5', '-....': '6',
            '--...': '7', '---..': '8', '----.': '9', '-----': '0',*/
        }
    }

    encrypt(msg) {
        return msg.split('').map(char => char.split('').map(morse => this.alphabetEncode[morse]).join('')).join(' ');
    }

    decrypt(msg){
        return msg.split('   ').map(morse => morse.split(' ').map(char => this.alphabetDecode[char]).join('')).join(' ');
    }
}

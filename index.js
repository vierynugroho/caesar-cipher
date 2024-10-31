const readline = require('readline');
const r_interface = readline.createInterface({ input: process.stdin, output: process.stdout });

class Terminal {
	static input(prompt) {
		return new Promise((resolve) => {
			r_interface.question(prompt, (input) => {
				resolve(input);
			});
		});
	}

	static output(output) {
		console.log(output);
	}

	static tableOutput(output) {
		console.table(output);
	}

	static clear() {
		process.stdout.write('\x1b[2J\x1b[H');
	}

	static end() {
		r_interface.close();
		process.exit(0);
	}
}

const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

class Cryptography {
	static async caesarCipherEncrypt(text, shift) {
		let result = '';
		shift = shift % 26;

		for (let i = 0; i < text.length; i++) {
			text = text.toLowerCase();
			let char = text[i];

			if (char >= 'a' && char <= 'z') {
				let index = ALPHABET.indexOf(char);
				let newIndex = (index + shift) % 26;
				result += ALPHABET[newIndex];
				console.log(`${char} (${index + shift}) mod 26 : ${ALPHABET[newIndex]} (${newIndex})`);
			} else {
				result += char;
			}
		}
		return result;
	}

	static async exhaustiveKeySearch(ciphertext) {
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const results = [];

		for (let key = 0; key <= 25; key++) {
			let plaintext = '';
			for (let i = 0; i < ciphertext.length; i++) {
				const charIndex = alphabet.indexOf(ciphertext[i].toUpperCase());
				if (charIndex !== -1) {
					const newIndex = (charIndex - key + 26) % 26;
					plaintext += alphabet[newIndex];
				} else {
					plaintext += ciphertext[i];
				}
			}
			results.push({ key, plaintext });
		}

		return results;
	}
}

const run = async () => {
	let decryptedText = await Terminal.input('Masukkan teks untuk dienkripsi:\t');
	let shift = parseInt(await Terminal.input('Masukkan jumlah pergeseran (shift):\t'), 10);

	Terminal.output(await Cryptography.caesarCipherEncrypt(decryptedText, shift));

	let encryptedText = await Terminal.input('Masukkan ciphertext untuk dekripsi:\t');
	Terminal.tableOutput(await Cryptography.exhaustiveKeySearch(encryptedText));

	Terminal.end();
};

run();

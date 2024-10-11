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

class Cryptography {
	static async caesarCipherEncrypt(text, shift) {
		let result = '';
		shift = shift % 26;

		for (let i = 0; i < text.length; i++) {
			let char = text[i];

			if (char >= 'A' && char <= 'Z') {
				let newChar = String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
				result += newChar;
			} else if (char >= 'a' && char <= 'z') {
				let newChar = String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
				result += newChar;
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
					const newIndex = (charIndex - key + 26) % 26; // Menggunakan -key dan modulo 26 untuk pergeseran mundur
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

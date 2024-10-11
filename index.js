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
}

const run = async () => {
	let inputText = await Terminal.input('Masukkan teks untuk dienkripsi:\t');
	let shift = parseInt(await Terminal.input('Masukkan jumlah pergeseran (shift):\t'), 10);

	Terminal.output(await Cryptography.caesarCipherEncrypt(inputText, shift));
	Terminal.end();
};

run();

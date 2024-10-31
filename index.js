const readline = require('readline');
const r_interface = readline.createInterface({ input: process.stdin, output: process.stdout });

const TERMINAL_COLORS = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	underscore: '\x1b[4m',
	blink: '\x1b[5m',
	reverse: '\x1b[7m',
	hidden: '\x1b[8m',

	fg: {
		black: '\x1b[30m',
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m',
	},
	bg: {
		black: '\x1b[40m',
		red: '\x1b[41m',
		green: '\x1b[42m',
		yellow: '\x1b[43m',
		blue: '\x1b[44m',
		magenta: '\x1b[45m',
		cyan: '\x1b[46m',
		white: '\x1b[47m',
	},
};

const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

class Terminal {
	static input(prompt) {
		return new Promise((resolve) => {
			r_interface.question(prompt, (input) => {
				resolve(input);
			});
		});
	}

	static output(title, data) {
		console.log(TERMINAL_COLORS.bg.yellow, `======== ${title} ========`, TERMINAL_COLORS.reset);
		console.log(data);
	}

	static tableOutput(title, data) {
		console.log(TERMINAL_COLORS.bg.green, TERMINAL_COLORS.fg.white, `======== ${title} ========`, TERMINAL_COLORS.reset);
		console.table(data);
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
	static async caesarCipherEncrypt(plaintext, shift) {
		let result = '';
		let logEncrypt = [];

		shift = shift % 26;

		for (let i = 0; i < plaintext.length; i++) {
			plaintext = plaintext.toLowerCase();
			let char = plaintext[i];

			if (char >= 'a' && char <= 'z') {
				let index = ALPHABET.indexOf(char);
				let newIndex = (index + shift) % 26;
				result += ALPHABET[newIndex];
				logEncrypt.push({
					char: index,
					shift: shift,
					charShift: index + shift,
					charShift_mod_26: newIndex,
					cipher_char: ALPHABET[newIndex],
				});
			} else {
				result += char;
			}
		}
		return { result, logEncrypt };
	}

	static async exhaustiveKeySearch(ciphertext) {
		const results = [];

		for (let key = 0; key <= 25; key++) {
			let plaintext = '';
			for (let i = 0; i < ciphertext.length; i++) {
				const charIndex = ALPHABET.indexOf(ciphertext[i].toLowerCase());
				if (charIndex !== -1) {
					const newIndex = (charIndex - key + 26) % 26;
					plaintext += ALPHABET[newIndex].toUpperCase();
				} else {
					plaintext += ciphertext[i];
				}
			}
			results.push({ key, plaintext });
		}

		return { results };
	}
}

const run = async () => {
	// caesar cipher
	let plaintext = await Terminal.input('Masukkan teks untuk dienkripsi\t\t: ');
	let shift = parseInt(await Terminal.input('Masukkan jumlah pergeseran (shift)\t: '));

	const { result, logEncrypt } = await Cryptography.caesarCipherEncrypt(plaintext, shift);

	// exhaustive
	let cipherText = await Terminal.input('Masukkan ciphertext untuk dekripsi\t: ');
	const { results } = await Cryptography.exhaustiveKeySearch(cipherText);

	Terminal.tableOutput('Exhaustive Key', results);

	Terminal.output('Caesar Cipher', `Plaintext\t: ${plaintext}\nCiphertext\t: ${result}`);
	Terminal.tableOutput('LOG | Caesar Cipher', logEncrypt);

	Terminal.end();
};

run();

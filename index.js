const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

class Cryptography {
	static caesarCipherEncrypt(plaintext, shift) {
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
					char_index: `${char} - ${index}`,
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

	static caesarCipherDecrypt(ciphertext, shift) {
		let result = '';
		let logDecrypt = [];

		shift = shift % 26;

		for (let i = 0; i < ciphertext.length; i++) {
			ciphertext = ciphertext.toLowerCase();
			let char = ciphertext[i];

			if (char >= 'a' && char <= 'z') {
				let index = ALPHABET.indexOf(char);
				let newIndex = (index - shift + 26) % 26;
				result += ALPHABET[newIndex];
				logDecrypt.push({
					cipherChar_index: `${char} - ${index}`,
					shift: shift,
					cipherChar_Shift: index - shift,
					cipherChar_Shift_mod_26: newIndex,
					plain_char: ALPHABET[newIndex],
				});
			} else {
				result += char;
			}
		}
		return { result, logDecrypt };
	}

	static exhaustiveKeyDecrypt(ciphertext) {
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

	static exhaustiveKeyEncrypt(plaintext) {
		const results = [];

		for (let key = 0; key < ALPHABET.length; key++) {
			let ciphertext = '';

			for (let i = 0; i < plaintext.length; i++) {
				const char = plaintext[i].toLowerCase();
				const charIndex = ALPHABET.indexOf(char);

				if (charIndex !== -1) {
					const newIndex = (charIndex + key) % ALPHABET.length;
					ciphertext += ALPHABET[newIndex].toUpperCase();
				} else {
					ciphertext += plaintext[i];
				}
			}

			results.push({ key, ciphertext });
		}

		return { results };
	}
}

// const caesarEncrypt = Cryptography.caesarCipherEncrypt('awasi asterix', 3);
// const caesarDecrypt = Cryptography.caesarCipherDecrypt('dzdvl dvwhula', 3);
// const exhaustiveEncrypt = Cryptography.exhaustiveKeyEncrypt('awasi asterix');
// const exhaustiveDecrypt = Cryptography.exhaustiveKeyDecrypt('dzdvl dvwhula');

// console.log(caesarEncrypt.result);
// console.table(caesarEncrypt.logEncrypt);
// console.log(caesarDecrypt.result);
// console.table(caesarDecrypt.logDecrypt);

// console.log(exhaustiveDecrypt.results);
// console.table(exhaustiveEncrypt.results);

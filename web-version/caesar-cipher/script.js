const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function encrypt() {
  const plaintext = document.getElementById("plaintext").value.toLowerCase();
  const shift = parseInt(document.getElementById("shift").value) % 26;
  let ciphertext = "";
  let log = [];

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    if (ALPHABET.includes(char)) {
      const index = ALPHABET.indexOf(char);
      const newIndex = (index + shift) % 26;
      ciphertext += ALPHABET[newIndex];

      log.push({
        index: i,
        char: char,
        shift: shift,
        charShift: index + shift,
        charShift_mod_26: newIndex,
        cipher_char: ALPHABET[newIndex],
      });
    } else {
      ciphertext += char;
    }
  }

  document.getElementById("ciphertext").innerText = ciphertext.toUpperCase();
  updateLogTable(log);
}

function exhaustiveDecrypt() {
  const ciphertext = document.getElementById("ciphertextInput").value.toLowerCase();
  const results = [];

  for (let key = 0; key < 26; key++) {
    let plaintext = "";
    for (let i = 0; i < ciphertext.length; i++) {
      const charIndex = ALPHABET.indexOf(ciphertext[i]);
      if (charIndex !== -1) {
        const newIndex = (charIndex - key + 26) % 26;
        plaintext += ALPHABET[newIndex];
      } else {
        plaintext += ciphertext[i];
      }
    }
    results.push({ key: key, plaintext: plaintext.toUpperCase() });
  }

  updateExhaustiveResults(results);
}

function updateLogTable(log) {
  const logTable = document.getElementById("logTable");
  logTable.innerHTML = "";

  log.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2 text-center">${entry.index}</td>
      <td class="border p-2 text-center">${entry.char}</td>
      <td class="border p-2 text-center">${entry.shift}</td>
      <td class="border p-2 text-center">${entry.charShift}</td>
      <td class="border p-2 text-center">${entry.charShift_mod_26}</td>
      <td class="border p-2 text-center">${entry.cipher_char}</td>
    `;
    logTable.appendChild(row);
  });
}

function updateExhaustiveResults(results) {
  const resultsTable = document.getElementById("exhaustiveResults");
  resultsTable.innerHTML = "";

  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2 text-center">${result.key}</td>
      <td class="border p-2 text-center">${result.plaintext}</td>
    `;
    resultsTable.appendChild(row);
  });
}

import Cryptography from 'classic-cryptography';

const caesarEncrypt = Cryptography.caesarCipherEncrypt('awasi asterix', 3);
const caesarDecrypt = Cryptography.caesarCipherDecrypt('dzdvl dvwhula', 3);
const exhaustiveEncrypt = Cryptography.exhaustiveKeyEncrypt('awasi asterix');
const exhaustiveDecrypt = Cryptography.exhaustiveKeyDecrypt('dzdvl dvwhula');

console.log(caesarEncrypt.result);
console.table(caesarEncrypt.logEncrypt);

console.log(caesarDecrypt.result);
console.table(caesarDecrypt.logDecrypt);

console.table(exhaustiveDecrypt.results);
console.table(exhaustiveEncrypt.results);

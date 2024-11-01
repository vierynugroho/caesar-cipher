# How to use this package

```
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
```

### Caesar Cipher

Caesar Cipher is a type of substitution cipher where each letter in the plaintext is shifted a certain number of places down or up the alphabet. For example, with a shift of 3, the letter "A" becomes "D," "B" becomes "E," and so on. Caesar Cipher is simple and easy to break since it only involves shifting letters, making it vulnerable to brute-force attacks.

### Exhaustive Key Search

Exhaustive Key Search (or brute-force attack) in the context of Caesar Cipher is a method to decrypt a message by trying all possible keys. Since the Caesar Cipher has only 26 possible shifts (one for each letter of the alphabet), an attacker can test each shift until the original plaintext is revealed. This approach ensures that the correct key will eventually be found, but it’s feasible only because the Caesar Cipher has a limited key space (0-25).

### Credits

**created by: viery**

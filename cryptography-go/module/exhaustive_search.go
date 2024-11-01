package module

import (
	"fmt"
	"unicode"
)

type ExhaustiveSearch struct {
	CaesarCipher CaesarCipher
}

func (e *ExhaustiveSearch) decryptWithKey(key int) string {
	e.CaesarCipher.DecryptedText = nil
	for _, char := range e.CaesarCipher.Text {
		if unicode.IsLetter(char) {
			decryptedChar := e.CaesarCipher.shiftCharacter(char, -key)
			e.CaesarCipher.DecryptedText = append(e.CaesarCipher.DecryptedText, decryptedChar)
		} else {
			e.CaesarCipher.DecryptedText = append(e.CaesarCipher.DecryptedText, char)
		}
	}
	return string(e.CaesarCipher.DecryptedText)
}

func (e *ExhaustiveSearch) ExhaustiveKeySearch() {
	fmt.Printf("Ciphertext: %s\n\n", e.CaesarCipher.Text)

	fmt.Println("Key  | Decrypted Text")
	fmt.Println("----------------------")

	for key := 0; key < 26; key++ {
		decryptedText := e.decryptWithKey(key)
		fmt.Printf("%2d   | %s\n", key, decryptedText)
	}
}

package module

import (
	"fmt"
	"unicode"
)

type CaesarCipher struct {
	Text          string
	Shift         int
	ShiftedText   []rune
	DecryptedText []rune
}

func (c *CaesarCipher) shiftCharacter(char rune, shift int) rune {
	if unicode.IsLetter(char) {
		shiftBase := rune(shift % 26)
		var asciiOffset rune

		if unicode.IsLower(char) {
			asciiOffset = 'a'
		} else {
			asciiOffset = 'A'
		}

		return asciiOffset + (char-asciiOffset+shiftBase+26)%26
	}
	return char
}

func (c *CaesarCipher) Encrypt() {
	c.ShiftedText = []rune(c.Text)
	for i, char := range c.ShiftedText {
		c.ShiftedText[i] = c.shiftCharacter(char, c.Shift)
	}
}

func (c *CaesarCipher) Decrypt() {
	c.ShiftedText = []rune(c.Text)
	for i, char := range c.ShiftedText {
		c.ShiftedText[i] = c.shiftCharacter(char, -c.Shift)
	}
}

func (c *CaesarCipher) GetEncryptedText() string {
	return string(c.ShiftedText)
}

func (c *CaesarCipher) GetDecryptedText() string {
	return string(c.ShiftedText)
}

func (c *CaesarCipher) LogShiftTable(encrypt bool) {
	fmt.Printf("%-10s %-15s %-15s %-15s %-10s\n", "Index", "Char (sebelum)", "Char (sesudah)", "ASCII (sebelum)", "ASCII (sebelum)")
	fmt.Println("-----------------------------------------------------------------------")

	shift := c.Shift
	if !encrypt {
		shift = -c.Shift
	}

	for i, char := range c.Text {
		if unicode.IsLetter(char) {
			shiftedChar := c.shiftCharacter(char, shift)
			fmt.Printf("%-10d %-15c %-15c %-15d %-10d\n", i, char, shiftedChar, char, shiftedChar)
		} else {
			fmt.Printf("%-10d %-15c %-15c %-15d %-10d\n", i, char, char, char, char)
		}
	}
}

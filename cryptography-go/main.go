package main

import (
	"bufio"
	"cryptography/module"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func readInput(prompt string) string {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print(prompt)
	input, _ := reader.ReadString('\n')
	return strings.TrimSpace(input)
}

func getModeChoice() (int, error) {
	modeInput := readInput("Pilih mode (1 untuk enkripsi, 2 untuk dekripsi, 3 untuk exhaustive search): ")
	modeChoice, err := strconv.Atoi(modeInput)
	if err != nil || modeChoice < 1 || modeChoice > 3 {
		return 0, fmt.Errorf("pilihan tidak valid. Silakan pilih 1, 2, atau 3")
	}
	return modeChoice, nil
}

func getShift() (int, error) {
	shiftInput := readInput("Masukkan jumlah pergeseran: ")
	shift, err := strconv.Atoi(shiftInput)
	if err != nil {
		return 0, fmt.Errorf("jumlah pergeseran harus berupa angka")
	}
	return shift, nil
}

func main() {
	modeChoice, err := getModeChoice()
	if err != nil {
		fmt.Println(err)
		return
	}

	inputText := readInput("Masukkan teks: ")

	cipher := module.CaesarCipher{
		Text: inputText,
	}

	exhaustive := module.ExhaustiveSearch{
		CaesarCipher: cipher,
	}

	if modeChoice == 1 {
		shift, err := getShift()
		if err != nil {
			fmt.Println(err)
			return
		}
		cipher.Shift = shift
		cipher.Encrypt()
		fmt.Println("Teks terenkripsi:", cipher.GetEncryptedText())
		fmt.Println("")
		cipher.LogShiftTable(true)
	} else if modeChoice == 2 {
		shift, err := getShift()
		if err != nil {
			fmt.Println(err)
			return
		}
		cipher.Shift = shift
		cipher.Decrypt()
		fmt.Println("Teks terdekripsi:", cipher.GetDecryptedText())
		fmt.Println("")
		cipher.LogShiftTable(false)
	} else if modeChoice == 3 {
		exhaustive.CaesarCipher.Text = inputText
		fmt.Println("Hasil Exhaustive Search:")
		exhaustive.ExhaustiveKeySearch()
	}
}

package main

import (
	"bufio"
	"cryptography-go/module"
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
	fmt.Println("\nSilahkan Pilih Mode yang diinginkan")
	fmt.Println("1. Caesar Cipher")
	fmt.Println("2. Exhaustive Key Search")
	fmt.Printf("3. Exit\n\n")
	modeInput := readInput("Pilihan mode: ")
	modeChoice, err := strconv.Atoi(modeInput)
	if err != nil || modeChoice < 1 || modeChoice > 3 {
		return 0, fmt.Errorf("pilihan tidak valid. Silakan pilih 1, 2, atau 3")
	}
	return modeChoice, nil
}

func getShift() (int, error) {
	shiftInput := readInput("\nMasukkan jumlah pergeseran: ")
	shift, err := strconv.Atoi(shiftInput)
	if err != nil {
		return 0, fmt.Errorf("jumlah pergeseran harus berupa angka")
	}
	return shift, nil
}

func getInputText() (module.CaesarCipher, module.ExhaustiveSearch) {
	inputText := readInput("\nMasukkan teks: ")

	cipher := module.CaesarCipher{
		Text: inputText,
	}

	exhaustive := module.ExhaustiveSearch{
		CaesarCipher: cipher,
	}

	return cipher, exhaustive
}

func main() {
	for {
		modeChoice, err := getModeChoice()
		if err != nil {
			fmt.Println(err)
			continue
		}

		switch modeChoice {
		case 1:
			fmt.Println("\nPilih opsi Caesar Cipher:")
			fmt.Println("1. Encrypt Text")
			fmt.Println("2. Decrypt Text")
			optionInput := readInput("\nMasukkan pilihan: ")
			option, err := strconv.Atoi(optionInput)
			if err != nil || (option != 1 && option != 2) {
				fmt.Println("Pilihan tidak valid. Silakan pilih 1 atau 2.")
				continue
			}

			cipher, _ := getInputText()
			shift, err := getShift()
			if err != nil {
				fmt.Println(err)
				continue
			}
			cipher.Shift = shift

			if option == 1 {
				cipher.Encrypt()
				fmt.Println("Teks terenkripsi:", cipher.GetEncryptedText())
				cipher.LogShiftTable(true)
			} else if option == 2 {
				cipher.Decrypt()
				fmt.Println("Teks terdekripsi:", cipher.GetDecryptedText())
				cipher.LogShiftTable(false)
			}

		case 2:
			_, exhaustive := getInputText()
			fmt.Println("Hasil Exhaustive Search:")
			exhaustive.ExhaustiveKeySearch()

		case 3:
			fmt.Println("Keluar dari program.")
			return

		default:
			fmt.Println("Pilihan tidak valid. Silakan pilih 1, 2, atau 3.")
		}
	}
}

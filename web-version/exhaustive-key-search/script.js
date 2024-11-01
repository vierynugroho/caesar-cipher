document.addEventListener("DOMContentLoaded", function() {
    function caesarShift(text, shift) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) { // Huruf besar A-Z
                result += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
            } else if (charCode >= 97 && charCode <= 122) { // Huruf kecil a-z
                result += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
            } else {
                result += text[i];
            }
        }
        return result;
    }

    function displayTable(text) {
        const outputTable = document.getElementById("outputTable");
        outputTable.innerHTML = "";

        let table = document.createElement("table");
        table.className = "min-w-full bg-white border border-gray-300 rounded-lg border-collapse"; // border-collapse ditambahkan

        let headerRow = document.createElement("tr");
        headerRow.className = "bg-gray-200";

        let headerShift = document.createElement("th");
        headerShift.textContent = "Shift";
        headerShift.className = "px-4 py-2 border border-gray-300 font-semibold";
        headerRow.appendChild(headerShift);

        let headerResult = document.createElement("th");
        headerResult.textContent = "Hasil";
        headerResult.className = "px-4 py-2 border border-gray-300 font-semibold";
        headerRow.appendChild(headerResult);

        table.appendChild(headerRow);

        for (let shift = 1; shift <= 25; shift++) {
            let row = document.createElement("tr");
            row.className = shift % 2 === 0 ? "bg-gray-100" : "bg-white";

            let shiftCell = document.createElement("td");
            shiftCell.textContent = shift;
            shiftCell.className = "px-4 py-2 border border-gray-300"; // border ditambahkan
            row.appendChild(shiftCell);

            let resultCell = document.createElement("td");
            resultCell.textContent = caesarShift(text, shift);
            resultCell.className = "px-4 py-2 border border-gray-300"; // border ditambahkan
            row.appendChild(resultCell);

            table.appendChild(row);
        }
        
        outputTable.appendChild(table);
    }

    window.encrypt = function() {
        const inputText = document.getElementById("inputText").value;
        if (inputText === "") {
            alert("Masukkan teks untuk dienkripsi.");
            return;
        }
        displayTable(inputText);
    }

    window.decrypt = function() {
        const inputText = document.getElementById("inputText").value;
        if (inputText === "") {
            alert("Masukkan teks untuk didekripsi.");
            return;
        }
        displayTable(inputText);
    }
});

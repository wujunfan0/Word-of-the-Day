async function loadWord() {
    try {
        const response = await fetch("words.json");

        if (!response.ok) {
            throw new Error("Could not load dataset");
        }

        const words = await response.json();

        if (!Array.isArray(words) || words.length === 0) {
            throw new Error("Dataset is empty or invalid");
        }

        const startDate = new Date("2026-01-01");
        const today = new Date();

        const timeDifference = today - startDate;
        const dayNumber = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        const selectedWord = words[dayNumber % words.length];

        document.getElementById("word").textContent = selectedWord.word;
        document.getElementById("definition").textContent = selectedWord.definition;
        document.getElementById("example").textContent = selectedWord.example;
    } catch (error) {
        console.error("ERROR:", error);
        document.getElementById("word").textContent = "Error";
        document.getElementById("definition").textContent = "Could not load the dataset.";
        document.getElementById("example").textContent = "";
    }
}

loadWord();
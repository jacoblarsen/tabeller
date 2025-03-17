document.addEventListener("DOMContentLoaded", () => {
    const tableSelect = document.getElementById("table-select");
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");
    const feedbackElement = document.getElementById("feedback");
    const submitButton = document.getElementById("submit");
    const correctCountElement = document.getElementById("correct-count");
    const timeSpentElement = document.getElementById("time-spent");

    let num1, num2;

    let realCount = 2;
    let correctCount = realCount;
    let numberOfDiplomas = 0;
    let startTime = Date.now();

    function updateTimeSpent() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeSpentElement.textContent = elapsedTime;
    }

    function ShowDiploma(numberOfDiplomas) {
        document.querySelector("#dip"+numberOfDiplomas).style.display = "block";
        document.querySelector("#game").style.display = "none";
        setTimeout(() => {
                document.querySelector("#dip"+numberOfDiplomas).style.display = "none";
                document.querySelector("#game").style.display = "block";
        }, 8000);
        
        fetch(`php/send.php?numberOfDiplomas=${numberOfDiplomas}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(data => {
                console.log("Request successful:", data);
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });

        if(numberOfDiplomas === 3) {
            //Send mail til far
            numberOfDiplomas = 0; 
        }
    }

    function generateQuestion() {
        const selectedTable = tableSelect.value;

        if (selectedTable === "all") {
            num1 = Math.floor(Math.random() * 7) + 4; // Tal mellem 4 og 10
        } else {
            num1 = parseInt(selectedTable, 10);
        }

        num2 = Math.floor(Math.random() * 7) + 4; // Tal mellem 4 og 10
        questionElement.textContent = `Hvad er ${num1} x ${num2}?`;
    }

    submitButton.addEventListener("click", () => {
        const userAnswer = parseInt(answerElement.value, 10);
        if (userAnswer === num1 * num2) {
            feedbackElement.textContent = "Korrekt! Godt klaret!";
            feedbackElement.classList.add("correct-feedback"); // Tilføj pink farve
            correctCount--;
        } else {
            feedbackElement.textContent = `Forkert. Det rigtige svar er ${num1 * num2}.`;
            feedbackElement.classList.remove("correct-feedback"); // Fjern pink farve
            correctCount = realCount;
        }
        if(correctCount === 0) {
            numberOfDiplomas++;
            correctCount = realCount;
            ShowDiploma(numberOfDiplomas);
        }
        correctCountElement.textContent = correctCount;
        answerElement.value = "";
        generateQuestion();
        answerElement.focus();
    });

    tableSelect.addEventListener("change", () => {
        generateQuestion();
        answerElement.focus();
    });

    // Start timer
    setInterval(updateTimeSpent, 1000);

    // Start spillet
    generateQuestion();
    answerElement.focus();
});
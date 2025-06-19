let string = "";
const input = document.querySelector("input");
const buttons = document.querySelectorAll(".button");
const showHistoryBtn = document.getElementById("showHistoryBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const historyPanel = document.querySelector(".historyPanel");
const historyList = document.getElementById("historyList");
const historyKey = "calc_history";


// Save to localStorage
function saveToHistory(entry) {
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    history.push(entry);
    localStorage.setItem(historyKey, JSON.stringify(history));
}

// Display history
function displayHistory() {
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    historyList.innerHTML = "<h3>Check Your History</h3>";
    if (history.length === 0) {
        historyList.innerHTML = "<h3>No history found</h3>";
        return;
    }
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Toggle history panel
showHistoryBtn.addEventListener("click", () => {
    historyPanel.classList.toggle("show");
    if (historyPanel.classList.contains("show")) {
        displayHistory();
    }
});


// Clear history
clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem(historyKey);
    historyList.innerHTML = "<h3>History cleared</h3>";

    setTimeout(()=>{
        displayHistory();
    },1000)
});

//Safe evaluation
function evaluateExpression(expr) {
    try {
        return new Function('return ' + expr)();
    } catch {
        return "Invalid";
    }
}


//Handle button clicks
buttons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        const val = evt.target.innerHTML;   
        if (val === "=") {
            const result = evaluateExpression(string);
            input.value = `Answer is ${result}`;
            saveToHistory(`${string} = ${result}`);
            string = result.toString();
            setTimeout(() => {
                string = "";
                input.value = "READY";
            }, 1000);

        } else if (val === "AC") {
            string = "";
            input.value = "All CLEAR";
            setTimeout(() => {
                input.value = "IN USE";
            }, 500);

        } else if (val === "DEL") {
            if (string.length > 0) {
                const deletedChar = string.slice(-1);
                string = string.slice(0, -1);
                input.value = `DELETED = ${deletedChar}`;
                setTimeout(() => {
                    input.value = string.length > 0 ? string : "IN USE";
                }, 500);
            } else {
                input.value = "Nothing to Delete";
                setTimeout(() => {
                    input.value = "IN USE";
                }, 500);
            }

        } else {
            string += val;
            input.value = string;
        }
    });
});






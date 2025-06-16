let string = "";
const input = document.querySelector("input");
const buttons = document.querySelectorAll(".button");

function evaluateExpression(expr) {
    try {
        return new Function('return ' + expr)();
    } catch {
        return "Invalid";
    }
}

Array.from(buttons).forEach((button) => {
    button.addEventListener("click", (evt) => {
        const val = evt.target.innerHTML;

        if (val === "=") {
            const result = evaluateExpression(string);
            input.value = `your answer is ${result}`;
            string = result.toString();
            setTimeout(() => {
                string = "";
                input.value = "READY";
            }, 1000);

        } else if (val === "C") {
            string = "";
            input.value = "CLEAR";
            setTimeout(() => {
                input.value = "IN USE";
            }, 500);

        } else if (val === "DEL") {
            if (string.length > 0) {
                const deletedChar = string.slice(-1);
                string = string.slice(0, -1);
                input.value = `DELETED = ${deletedChar}`;
                setTimeout(() => {
                    input.value = string.length > 0 ? string : "CALCULATOR";
                }, 400);
            } else {
                input.value = "nothing to delete";
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



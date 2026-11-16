type Operator = "+" | "-" | "×" | "÷";

let current = "0";                  // the number being typed
let previous: number | null = null; // the number before the operator
let operator: Operator | null = null;
let startNew = false;               // true when the next digit starts a fresh number

const display = document.getElementById("display") as HTMLDivElement;

function calculate(a: number, b: number, op: Operator): number {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? NaN : a / b;
  }
}

function format(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  return String(parseFloat(n.toFixed(10))); // avoids 0.1 + 0.2 = 0.30000000000000004
}

function isOperator(key: string): key is Operator {
  return key === "+" || key === "-" || key === "×" || key === "÷";
}

function updateDisplay(): void {
  display.textContent = current;
}

function pressKey(key: string): void {
  if (/^[0-9]$/.test(key)) {
    current = current === "0" || startNew ? key : current + key;
    startNew = false;
  } else if (key === ".") {
    if (startNew) {
      current = "0.";
      startNew = false;
    } else if (!current.includes(".")) {
      current += ".";
    }
  } else if (key === "C") {
    current = "0";
    previous = null;
    operator = null;
    startNew = false;
  } else if (isOperator(key)) {
    if (Number.isNaN(parseFloat(current))) return; // ignore after "Error"
    if (previous !== null && operator !== null && !startNew) {
      previous = calculate(previous, parseFloat(current), operator);
      current = format(previous);
    } else {
      previous = parseFloat(current);
    }
    operator = key;
    startNew = true;
  } else if (key === "=") {
    if (previous !== null && operator !== null) {
      current = format(calculate(previous, parseFloat(current), operator));
      previous = null;
      operator = null;
      startNew = true;
    }
  }
  updateDisplay();
}

document.querySelectorAll<HTMLButtonElement>(".buttons button").forEach(button => {
  button.addEventListener("click", () => pressKey(button.dataset.key ?? ""));
});

updateDisplay();
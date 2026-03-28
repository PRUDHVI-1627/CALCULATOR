// CALCULATOR PROGRAM

const display = document.getElementById('display');
const expression = document.getElementById('expression');

let currentOp = null;
let prevVal = '';
let shouldReset = false;

// Ripple effect on every button click
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const r = document.createElement('span');
        r.className = 'ripple-ring';
        r.style.left = (btn.offsetWidth / 2 - 20) + 'px';
        r.style.top  = (btn.offsetHeight / 2 - 20) + 'px';
        btn.appendChild(r);
        setTimeout(() => r.remove(), 400);
    });
});

function appendToDisplay(val) {
    if (shouldReset) {
        display.value = '';
        shouldReset = false;
    }
    if (val === '.' && display.value.includes('.')) return;
    if (display.value === '0' && val !== '.') {
        display.value = val;
        return;
    }
    display.value += val;
}

function clearDisplay() {
    display.value = '';
    expression.textContent = '';
    currentOp = null;
    prevVal = '';
    shouldReset = false;
}

function toggleSign() {
    if (!display.value) return;
    display.value = display.value.startsWith('-')
        ? display.value.slice(1)
        : '-' + display.value;
}

function percentage() {
    if (!display.value) return;
    display.value = parseFloat(display.value) / 100;
}

const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

function setOp(op) {
    if (display.value === '' && prevVal === '') return;
    if (prevVal !== '' && !shouldReset) {
        calculate(true);
    }
    prevVal = display.value || prevVal;
    currentOp = op;
    expression.textContent = prevVal + ' ' + opSymbols[op];
    shouldReset = true;
}

function calculate(chain = false) {
    if (!currentOp || prevVal === '') return;
    const a = parseFloat(prevVal);
    const b = parseFloat(display.value);
    let result;

    try {
        if (currentOp === '+') result = a + b;
        else if (currentOp === '-') result = a - b;
        else if (currentOp === '*') result = a * b;
        else if (currentOp === '/') {
            if (b === 0) {
                display.value = 'Error';
                expression.textContent = '';
                currentOp = null;
                prevVal = '';
                return;
            }
            result = a / b;
        }

        const rounded = parseFloat(result.toPrecision(10));

        if (!chain) {
            expression.textContent = prevVal + ' ' + opSymbols[currentOp] + ' ' + display.value + ' =';
            currentOp = null;
            prevVal = '';
        }

        display.value = rounded;
        shouldReset = true;

    } catch (e) {
        display.value = 'Error';
        expression.textContent = '';
        currentOp = null;
        prevVal = '';
    }
}

// Keyboard support
document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    else if (e.key === '.') appendToDisplay('.');
    else if (e.key === '+') setOp('+');
    else if (e.key === '-') setOp('-');
    else if (e.key === '*') setOp('*');
    else if (e.key === '/') { e.preventDefault(); setOp('/'); }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Backspace') display.value = display.value.slice(0, -1);
    else if (e.key === 'Escape') clearDisplay();
});
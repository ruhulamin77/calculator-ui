// selection starts
function $(id) {
  return document.getElementById(id);
}

const previousOperandElement = $('output').children[0];
const currentOperandElement = $('output').children[1];
const ACButton = $('all-clear');
const deleteButton = $('delete');
const equalsBtn = $('equals');
const operationButtons = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');
// selection starts

let currentOperand = '';
let previousOperand = '';
let operation = '';

function appendNumber(number) {
  if (number == '.' && currentOperand.includes('.')) return;
  currentOperand += number;
}

function getDisplayNumber(number) {
  const floatNum = parseFloat(number);
  if (isNaN(floatNum)) return '';
  return floatNum.toLocaleString();
}

function updateDisplay() {
  currentOperandElement.innerText = getDisplayNumber(currentOperand);
  previousOperandElement.innerText = `${getDisplayNumber(
    previousOperand
  )} ${operation}`;
}

equalsBtn.addEventListener('click', function (e) {
  compute();
  updateDisplay();
});

function choseOperation(operator) {
  if (!currentOperand) return;
  if (currentOperand !== '') {
    compute();
  }
  operation = operator;
  previousOperand = currentOperand;
  currentOperand = '';
}
function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = '';
}
deleteButton.addEventListener('click', function (e) {
  deleteFun();
  updateDisplay();
});
ACButton.addEventListener('click', function () {
  clear();
  updateDisplay();
});
function compute() {
  const prev = Number(previousOperand);
  const current = Number(currentOperand);
  switch (operation) {
    case '÷':
      currentOperand = prev / current;
      break;
    case '*':
      currentOperand = prev * current;
      break;
    case '+':
      currentOperand = prev + current;
      break;
    case '-':
      currentOperand = prev - current;
      break;
    case '%':
      currentOperand = prev % current;
      break;
    default:
      return;
  }
  previousOperand = '';
  operation = '';
}

function deleteFun() {
  currentOperand = currentOperand.slice(0, -1);
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    choseOperation(button.innerText);
    updateDisplay();
  });
});

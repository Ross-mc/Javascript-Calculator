const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    storedAnswer: null,
  };
  
  
  function inputNumber(number) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = number;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    }
  
  }
  
  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;
    if (!calculator.displayValue.includes(dot)){
      calculator.displayValue += dot;
    }
  }
  
  function positiveNegative() {
    if (calculator.waitingForSecondOperand === true) return;
    if (calculator.displayValue != '0'){
      calculator.displayValue *= -1;
    }
  }
  
  
  function enterStoredAnswer() {
    if (calculator.storedAnswer == null){
      calculator.displayValue = 'No stored answer';
      return;
    }
    if (calculator.firstOperand == null) {
      calculator.firstOperand = calculator.storedAnswer;
      calculator.displayValue = calculator.storedAnswer;
    } else if (calculator.firstOperand != null){
      calculator.displayValue = calculator.storedAnswer;
      calculator.waitingForSecondOperand = false;
        console.log(calculator);
    return;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);
  //need to add some function to prevent dividing by zero = infinity!
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
      calculator.storedAnswer = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  
  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };
  
  
  
  
  function partialResetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
  }
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    calculator.storedAnswer = null;
    console.log(calculator);
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.inputs');
  keys.addEventListener('click', (event) => {
     const target = event.target;
  if (!target.matches('button')){
    return;
  }
  if (target.classList.contains('operator')){
    handleOperator(target.value);
  updateDisplay();
    return
  }
  if (target.classList.contains('decimal')){
    inputDecimal(target.value);
  updateDisplay();
    return;
  }
    
  if (target.classList.contains('plusMinus')){
  positiveNegative();
  updateDisplay();
    return;
  }
  
  if (target.classList.contains('ac')){
  resetCalculator();
  updateDisplay();
    return;
  }
  if (target.classList.contains('clear')){
  partialResetCalculator();
  updateDisplay();
    return;
  }
   if (target.classList.contains('ans')){
  enterStoredAnswer();
  updateDisplay();
    return;
  }
  inputNumber(target.value);
  updateDisplay();
                
  });
  
function calculator() {
  return {
    current: "",
    append(char) {
      this.current += char;
    },
    clear() {
      this.current = "";
    },
    deleteLast() {
      if (this.current.length > 0) {
        this.current = this.current.pop();
      }
    },

    calculate() {
      try {
        if (this.current.includes("%")) {
          this.current = this.computePercentage(this.current);
        } else {
          this.current = eval(this.current);
        }
      } catch (error) {
        this.current = "Error";
      }
    },
    computePercentage(expression) {
      const regex = /(\d+\.?\d*)([+\-*/])(\d+\.?\d*)%/;
      const match = expression.match(regex);

      if (match) {
        const [_,num1, operator, num2] = match;
        const percentage = (parseFloat(num2) / 100) * parseFloat(num1);
        switch (operator) {
          case '+':
            return parseFloat(num1) + percentage;
          case '-':
            return parseFloat(num1) - percentage;
          case '/':
            return parseFloat(num1) / percentage;
          case '*':
            return parseFloat(num1) * percentage;
        }
      }
      return expression;
    },
    initialize() {
      document.addEventListener("keyup", (event) => {
        if (event.key >= "0" && event.key <= "9") {
          this.append(event.key);
        } else if (["+", "-", "/", "*"].includes(event.key)) {
          this.append(event.key);
        } else if (event.key === "Enter") {
          this.calculate();
        } else if (event.key === "Backspace") {
          this.deleteLast();
        } else if (event.key === "Delete") {
          this.clear();
        } else if (event.key === "=") {
          this.calculate();
        } else if (event.key === "%") {
          this.append("%");
        } else if (event.key === ".") {
          this.append(".");
        }
      });
    },
  };
}

const isValidateParentheses = (s) => {
    const stack = [];
    const map = {
      "}": "{",
      "]": "[",
      ")": "(",
    };
    for (const c of s) {
      if (!(c in map)) {
        stack.push(c);
        continue;
      }
      if (stack[stack.length - 1] === map[c]) {
        stack.pop();
        continue;
      }
      return false;
    }
    return stack.length === 0;
  };

  isValidateParentheses("]");
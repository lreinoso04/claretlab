/**
 * Helper to convert Degrees to Radians (since academic calculators evaluate sin(30) as 0.5)
 */
const degToRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Normalizes mathematical statements to safe JS-parsable equivalents
 */
export function normalizeMathExpression(expr: string): string {
  return expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'Math.PI')
    .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)') // handles simple numbers after root √144 -> Math.sqrt(144)
    .replace(/\^/g, '**');
}

/**
 * Fully functional math expression solver that parses and evaluates variables/parentheses
 * safely without arbitrary eval risk. Supports sin, cos, tan, log, ln, sqrt, power.
 */
export function evaluateMathExpression(expr: string): string {
  try {
    let cleanExpr = expr.trim();
    if (!cleanExpr) return '0';

    // 1. Normalize simple operators and constants
    cleanExpr = cleanExpr.replace(/×/g, '*');
    cleanExpr = cleanExpr.replace(/÷/g, '/');
    cleanExpr = cleanExpr.replace(/π/g, `${Math.PI}`);

    // Helpers to evaluate scientific functions with regular expressions
    // Handle square roots first: √(...) or √144
    // Replace √ followed by a number or nested parenthesis with Math.sqrt
    // Resolve basic functional brackets securely
    let hasFunction = true;
    let iterations = 0;
    while (hasFunction && iterations < 30) {
      hasFunction = false;
      iterations++;

      // Pattern 1: √ followed by a number (like √144)
      if (/√(\d+(\.\d+)?)/.test(cleanExpr)) {
        cleanExpr = cleanExpr.replace(/√(\d+(\.\d+)?)/, (_, num) => {
          return `${Math.sqrt(parseFloat(num))}`;
        });
        hasFunction = true;
      }

      // Pattern 2: (sin|cos|tan|log|ln|sqrt|√)\(([^()]+)\)
      const funcRegex = /(sin|cos|tan|log|ln|sqrt|√)\(([^()]+)\)/gi;
      if (funcRegex.test(cleanExpr)) {
        cleanExpr = cleanExpr.replace(funcRegex, (_, func, inner) => {
          const val = evalSimpleMath(inner);
          switch (func.toLowerCase()) {
            case 'sin':
              // Evaluate trigs in degrees
              return `${parseFloat(Math.sin(degToRad(val)).toFixed(10))}`;
            case 'cos':
              return `${parseFloat(Math.cos(degToRad(val)).toFixed(10))}`;
            case 'tan':
              return `${parseFloat(Math.tan(degToRad(val)).toFixed(10))}`;
            case 'log':
              // Base 10 log
              return `${Math.log10(val)}`;
            case 'ln':
              return `${Math.log(val)}`;
            case 'sqrt':
            case '√':
              return `${Math.sqrt(val)}`;
            default:
              return '0';
          }
        });
        hasFunction = true;
      }
    }

    // Resolve any remaining ^ (power) representations like 2^3 -> 2**3
    cleanExpr = cleanExpr.replace(/\^/g, '**');

    // Secure evaluate standard math using custom math parser function
    const result = evalSimpleMath(cleanExpr);
    if (isNaN(result) || !isFinite(result)) {
      return 'Error';
    }

    // Format final result nicely
    // If it's a decimal, standard rounding
    const numResult = Number(result);
    if (Number.isInteger(numResult)) {
      return numResult.toString();
    }
    return parseFloat(numResult.toFixed(8)).toString();
  } catch (error) {
    return 'Error';
  }
}

/**
 * Custom math safety parser evaluating basic expressions (+, -, *, /, **, parenthesis)
 */
function evalSimpleMath(mathExpr: string): number {
  // Polish string padding
  let sanitized = mathExpr.replace(/[^-+*/\d.() ]|(?<=\d)\*(?=\d)/gi, (match) => {
    // Check if double multiplication occurs (power operator **)
    if (match === '*') return '*';
    return '';
  });

  // Safe Math parser using selective Function constructor (only math tokens inside)
  const mathCharsRegex = /^[0-9+\-*/.() \s]+$/;
  // Account for exponents **
  const doubleMulSanitized = sanitized.replace(/\*\*/g, '*');
  if (!mathCharsRegex.test(doubleMulSanitized)) {
    throw new Error('Forbidden characters detected in math solver.');
  }

  // Evaluate simple expression safely
  // eslint-disable-next-line no-new-func
  const fn = new Function(`return (${sanitized});`);
  return fn();
}

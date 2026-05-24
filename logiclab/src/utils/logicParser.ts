// AST Node definitions for Propositional Logic Parser
type ASTNode =
  | { type: 'variable'; name: string }
  | { type: 'not'; operand: ASTNode }
  | { type: 'and'; left: ASTNode; right: ASTNode }
  | { type: 'or'; left: ASTNode; right: ASTNode }
  | { type: 'implies'; left: ASTNode; right: ASTNode }
  | { type: 'iff'; left: ASTNode; right: ASTNode };

/**
 * Normalizes input logic expression by cleaning whitespace and matching Spanish equivalents
 */
export function normalizeExpression(expr: string): string {
  return expr
    .replace(/\s+/g, '')
    .replace(/~/g, '¬')
    .replace(/!/g, '¬')
    .replace(/&/g, '∧')
    .replace(/\|/g, '∨')
    .replace(/->/g, '→')
    .replace(/<->/g, '↔')
    .replace(/iff/gi, '↔')
    .replace(/implies/gi, '→')
    .replace(/and/gi, '∧')
    .replace(/or/gi, '∨')
    .replace(/not/gi, '¬');
}

/**
 * Extracts distinct propositional variables (P, Q, R) sorted alphabetically
 */
export function extractVariables(expr: string): string[] {
  const vars = new Set<string>();
  const normalized = normalizeExpression(expr);
  for (const char of normalized) {
    if (['P', 'Q', 'R'].includes(char)) {
      vars.add(char);
    }
  }
  return Array.from(vars).sort();
}

/**
 * Minimalist parser to evaluate the truth value of a statement under a specific valuation
 */
export function evaluateExpression(expr: string, valuation: { [v: string]: boolean }): boolean {
  const normalized = normalizeExpression(expr);
  
  // Handlers for syntax tokens
  let index = 0;

  function peek(): string {
    return normalized[index] || '';
  }

  function consume(): string {
    return normalized[index++] || '';
  }

  // Parsing precedence: ↔ (iff) < → (implies) < ∨ (or) < ∧ (and) < ¬ (not)
  function parseIff(): ASTNode {
    let node = parseImplies();
    while (peek() === '↔') {
      consume(); // consume '↔'
      const right = parseImplies();
      node = { type: 'iff', left: node, right };
    }
    return node;
  }

  function parseImplies(): ASTNode {
    let node = parseOr();
    while (peek() === '→') {
      consume(); // consume '→'
      const right = parseOr();
      node = { type: 'implies', left: node, right };
    }
    return node;
  }

  function parseOr(): ASTNode {
    let node = parseAnd();
    while (peek() === '∨') {
      consume(); // consume '∨'
      const right = parseAnd();
      node = { type: 'or', left: node, right };
    }
    return node;
  }

  function parseAnd(): ASTNode {
    let node = parseUnary();
    while (peek() === '∧') {
      consume(); // consume '∧'
      const right = parseUnary();
      node = { type: 'and', left: node, right };
    }
    return node;
  }

  function parseUnary(): ASTNode {
    if (peek() === '¬') {
      consume(); // consume '¬'
      const operand = parseUnary();
      return { type: 'not', operand };
    }
    return parsePrimary();
  }

  function parsePrimary(): ASTNode {
    const char = peek();
    if (char === '(') {
      consume(); // consume '('
      const node = parseIff();
      if (peek() === ')') {
        consume(); // consume ')'
      }
      return node;
    }
    if (['P', 'Q', 'R'].includes(char)) {
      consume(); // consume variable
      return { type: 'variable', name: char };
    }
    // Default fallback to avoid crash
    consume();
    return { type: 'variable', name: 'P' };
  }

  // Parse root
  let ast: ASTNode;
  try {
    ast = parseIff();
  } catch (e) {
    return false;
  }

  // Evaluator function against AST
  function evalNode(node: ASTNode): boolean {
    switch (node.type) {
      case 'variable':
        return valuation[node.name] ?? false;
      case 'not':
        return !evalNode(node.operand);
      case 'and':
        return evalNode(node.left) && evalNode(node.right);
      case 'or':
        return evalNode(node.left) || evalNode(node.right);
      case 'implies':
        // A → B is ¬A ∨ B
        return !evalNode(node.left) || evalNode(node.right);
      case 'iff':
        return evalNode(node.left) === evalNode(node.right);
      default:
        return false;
    }
  }

  return evalNode(ast);
}

/**
 * Builds the complete Truth Table data structure
 */
export interface TruthTableResult {
  variables: string[];
  headers: string[];
  rows: {
    values: { [v: string]: boolean };
    finalValue: boolean;
  }[];
  isTautology: boolean;
  isContradiction: boolean;
  isContingency: boolean;
}

export function generateTruthTable(expr: string): TruthTableResult | null {
  const variables = extractVariables(expr);
  if (variables.length === 0) return null;

  const totalVariations = 1 << variables.length; // 2^n
  const rows = [];

  for (let i = 0; i < totalVariations; i++) {
    const valuation: { [v: string]: boolean } = {};
    for (let vIdx = 0; vIdx < variables.length; vIdx++) {
      // Create high-to-low bit valuation for traditional academic tables (True, True, then True, False)
      const bitShift = variables.length - 1 - vIdx;
      valuation[variables[vIdx]] = ((i >> bitShift) & 1) === 0; // standard sequence matching V/V -> V/F -> F/V -> F/F
    }

    const finalValue = evaluateExpression(expr, valuation);
    rows.push({
      values: valuation,
      finalValue
    });
  }

  const allTrue = rows.every(r => r.finalValue);
  const allFalse = rows.every(r => !r.finalValue);

  return {
    variables,
    headers: [...variables, normalizeExpression(expr)],
    rows,
    isTautology: allTrue,
    isContradiction: allFalse,
    isContingency: !allTrue && !allFalse
  };
}

import { Token } from './02-tokenizer'

// Abstract Syntax Tree
export type AST =
  | {
      type: 'literal'
      value: number
    }
  | {
      type: 'operation'
      operator: '+' | '-' | '*' | '/'
      left: AST
      right: AST
    }

// look-ahead, look-back

export function parse(tokens: Token[]): AST {
  if (tokens.length === 0) {
    throw new Error('Unexpected empty tokens')
  }

  let index = 0
  let token: Token | undefined = tokens[index]

  function parseExpression() {
    return parseLevel2()
  }

  // add, sub
  function parseLevel2(): AST {
    let left = parseLevel1()
    while (
      token &&
      token.type === 'operator' &&
      (token.value === '+' || token.value === '-')
    ) {
      let operator = token.value
      token = tokens[++index]
      let right = parseLevel1()
      left = { type: 'operation', operator, left, right }
    }
    return left
  }

  // mul, div
  function parseLevel1(): AST {
    let left = parseLevel0()
    while (
      token &&
      token.type === 'operator' &&
      (token.value === '*' || token.value === '/')
    ) {
      let operator = token.value
      token = tokens[++index]
      let right = parseLevel0()
      left = { type: 'operation', operator, left, right }
    }
    return left
  }

  // literal
  function parseLevel0(): AST {
    if (token?.type === 'literal') {
      let literalAST: AST = token
      token = tokens[++index]
      return literalAST
    }
    throw new Error(
      `Unexpected token, expect literal, got: ${JSON.stringify(token)}`,
    )
  }

  return parseExpression()
}

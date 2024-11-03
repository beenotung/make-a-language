import { AST } from './03-parser'

export type MachineCode =
  | {
      operator: 'PUSH'
      value: number
    }
  | {
      operator: 'ADD' | 'SUB' | 'MUL' | 'DIV'
    }
  | {
      operator: 'POP'
    }

export function* codeGen(ast: AST): Generator<MachineCode> {
  if (ast.type === 'literal') {
    yield { operator: 'PUSH', value: ast.value }
    return
  }
  if (ast.type === 'operation') {
    yield* codeGen(ast.left)
    yield* codeGen(ast.right)
    switch (ast.operator) {
      case '+':
        yield { operator: 'ADD' }
        break
      case '-':
        yield { operator: 'SUB' }
        break
      case '*':
        yield { operator: 'MUL' }
        break
      case '/':
        yield { operator: 'DIV' }
        break
      default:
        throw new Error(`Unsupported operator: ${JSON.stringify(ast)}`)
    }
    return
  }
  throw new Error(`Unsupported AST: ${JSON.stringify(ast)}`)
}

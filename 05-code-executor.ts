import { MachineCode } from './04-code-generator'

const MAX_STACK_SIZE = 1000

export function* executeCode(codes: MachineCode[]): Generator<number> {
  let stack: number[] = []

  function push(value: number) {
    if (stack.length >= MAX_STACK_SIZE) {
      throw new Error('Stack overflow')
    }
    stack.push(value)
  }

  function pop(): number {
    if (stack.length === 0) {
      throw new Error('Pop from empty stack')
    }
    return stack.pop()!
  }

  for (let code of codes) {
    switch (code.operator) {
      case 'PUSH':
        push(code.value)
        break
      case 'POP':
        yield pop()
        break
      case 'ADD': {
        let right = pop()
        let left = pop()
        push(left + right)
        break
      }
      case 'SUB': {
        let right = pop()
        let left = pop()
        push(left - right)
        break
      }
      case 'MUL': {
        let right = pop()
        let left = pop()
        push(left * right)
        break
      }
      case 'DIV': {
        let right = pop()
        let left = pop()
        push(left / right)
        break
      }
      default:
        throw new Error(`Unsupported machine code: ${JSON.stringify(code)}`)
    }
  }
}

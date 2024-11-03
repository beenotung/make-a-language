import { expect } from 'chai'
import { MachineCode } from './04-code-generator'
import { codeGen } from './04-code-generator'
import { AST } from './03-parser'

describe('Code Generator TestSuit', () => {
  it('should generate code for a single literal', () => {
    let ast: AST = { type: 'literal', value: 4 }
    let expected: MachineCode[] = [{ operator: 'PUSH', value: 4 }]
    let actual = Array.from(codeGen(ast))
    expect(actual).to.deep.equals(expected)
  })

  it('should generate code for single addition-expression', () => {
    let ast: AST = {
      type: 'operation',
      operator: '+',
      left: { type: 'literal', value: 4 },
      right: { type: 'literal', value: 56 },
    }
    let expected: MachineCode[] = [
      { operator: 'PUSH', value: 4 },
      { operator: 'PUSH', value: 56 },
      { operator: 'ADD' },
    ]
    let actual = Array.from(codeGen(ast))
    expect(actual).to.deep.equals(expected)
  })

  it('should generate code for chained addition-expression', () => {
    let ast: AST = {
      type: 'operation',
      operator: '+',
      left: { type: 'literal', value: 4 },
      right: {
        type: 'operation',
        operator: '+',
        left: { type: 'literal', value: 56 },
        right: { type: 'literal', value: 789 },
      },
    }
    let expected: MachineCode[] = [
      { operator: 'PUSH', value: 4 },
      { operator: 'PUSH', value: 56 },
      { operator: 'PUSH', value: 789 },
      { operator: 'ADD' },
      { operator: 'ADD' },
    ]
    let actual = Array.from(codeGen(ast))
    expect(actual).to.deep.equals(expected)
  })

  it('should generate code for multiply before addition', () => {
    let code = '2 * 3 + 4'
    let ast: AST = {
      type: 'operation',
      operator: '+',
      left: {
        type: 'operation',
        operator: '*',
        left: { type: 'literal', value: 2 },
        right: { type: 'literal', value: 3 },
      },
      right: { type: 'literal', value: 4 },
    }
    let expected: MachineCode[] = [
      { operator: 'PUSH', value: 2 },
      { operator: 'PUSH', value: 3 },
      { operator: 'MUL' },
      { operator: 'PUSH', value: 4 },
      { operator: 'ADD' },
    ]
    let actual = Array.from(codeGen(ast))
    expect(actual).to.deep.equals(expected)
  })

  it('should generate code for addition before multiply', () => {
    let code = '2 + 3 * 4'
    let ast: AST = {
      type: 'operation',
      operator: '+',
      left: { type: 'literal', value: 2 },
      right: {
        type: 'operation',
        operator: '*',
        left: { type: 'literal', value: 3 },
        right: { type: 'literal', value: 4 },
      },
    }
    let expected: MachineCode[] = [
      { operator: 'PUSH', value: 2 },
      { operator: 'PUSH', value: 3 },
      { operator: 'PUSH', value: 4 },
      { operator: 'MUL' },
      { operator: 'ADD' },
    ]
    let actual = Array.from(codeGen(ast))
    expect(actual).to.deep.equals(expected)
  })
})

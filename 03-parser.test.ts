import { expect } from 'chai'
import { Token } from './02-tokenizer'
import { AST, parse } from './03-parser'

describe('Parser TestSuit', () => {
  it('should parse a single literal', () => {
    let tokens: Token[] = [{ type: 'literal', value: 2 }]
    let expected: AST = { type: 'literal', value: 2 }
    expect(parse(tokens)).to.deep.equals(expected)
  })

  it('should parse a single addition-expression', () => {
    let tokens: Token[] = [
      { type: 'literal', value: 4 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 56 },
    ]
    let expected: AST = {
      type: 'operation',
      operator: '+',
      left: { type: 'literal', value: 4 },
      right: { type: 'literal', value: 56 },
    }
    expect(parse(tokens)).to.deep.equals(expected)
  })

  it('should reject invalid expressions', () => {
    let tokens: Token[] = [
      { type: 'operator', value: '+' },
      { type: 'operator', value: '+' },
      { type: 'operator', value: '+' },
    ]
    expect(() => parse(tokens)).to.throw('Unexpected token')
  })

  it('should parse chained addition-expression', () => {
    let tokens: Token[] = [
      { type: 'literal', value: 4 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 56 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 789 },
    ]
    /* 

4 + 56 + 789

    +
   / \
  +   789
 / \
4   56

*/
    let expected: AST = {
      type: 'operation',
      operator: '+',
      left: {
        type: 'operation',
        operator: '+',
        left: { type: 'literal', value: 4 },
        right: { type: 'literal', value: 56 },
      },
      right: { type: 'literal', value: 789 },
    }
    let actual = parse(tokens)
    expect(actual).to.deep.equals(expected)
  })

  it('should parse subtraction-expression', () => {
    let tokens: Token[] = [
      { type: 'literal', value: 4 },
      { type: 'operator', value: '-' },
      { type: 'literal', value: 56 },
    ]
    let expected: AST = {
      type: 'operation',
      operator: '-',
      left: { type: 'literal', value: 4 },
      right: { type: 'literal', value: 56 },
    }
    let actual = parse(tokens)
    expect(actual).to.deep.equals(expected)
  })

  it('should parse single multiplication-expression', () => {
    let tokens: Token[] = [
      { type: 'literal', value: 4 },
      { type: 'operator', value: '*' },
      { type: 'literal', value: 5 },
    ]
    let expected: AST = {
      type: 'operation',
      operator: '*',
      left: { type: 'literal', value: 4 },
      right: { type: 'literal', value: 5 },
    }
    let actual = parse(tokens)
    expect(actual).to.deep.equals(expected)
  })

  it('should parse multiply before addition', () => {
    let tokens: Token[] = [
      { type: 'literal', value: 4 },
      { type: 'operator', value: '*' },
      { type: 'literal', value: 5 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 6 },
    ]
    let expected: AST = {
      type: 'operation',
      operator: '+',
      left: {
        type: 'operation',
        operator: '*',
        left: { type: 'literal', value: 4 },
        right: { type: 'literal', value: 5 },
      },
      right: { type: 'literal', value: 6 },
    }
    let actual = parse(tokens)
    expect(actual).to.deep.equals(expected)
  })

  it('should parse addition before multiplication', () => {
    let tokens: Token[] = [
      { type: 'literal', value: 4 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 5 },
      { type: 'operator', value: '*' },
      { type: 'literal', value: 6 },
    ]
    let expected: AST = {
      type: 'operation',
      operator: '+',
      left: { type: 'literal', value: 4 },
      right: {
        type: 'operation',
        operator: '*',
        left: { type: 'literal', value: 5 },
        right: { type: 'literal', value: 6 },
      },
    }
    let actual = parse(tokens)
    console.dir({ actual, expected }, { depth: 20 })
    expect(actual).to.deep.equals(expected)
  })
})

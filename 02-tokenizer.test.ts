import { expect } from 'chai'
import { Token, tokenize } from './02-tokenizer'

describe('Tokenizer TestSuit', () => {
  it('should tokenize single-digit positive integer', () => {
    let code: string = '2'
    let expected: Token[] = [{ type: 'literal', value: 2 }]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should tokenize multiple-digit positive integer', () => {
    let code: string = '234'
    let expected: Token[] = [{ type: 'literal', value: 234 }]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should tokenize addition operator', () => {
    let code: string = '+'
    let expected: Token[] = [{ type: 'operator', value: '+' }]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should tokenize multiple tokens', () => {
    let code: string = '2+3'
    let expected: Token[] = [
      { type: 'literal', value: 2 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 3 },
    ]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should omit spaces', () => {
    let code: string = '2  +3'
    let expected: Token[] = [
      { type: 'literal', value: 2 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 3 },
    ]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should omit all types of whitespace', () => {
    let code: string = `
\t2
  +
\t3
`
    let expected: Token[] = [
      { type: 'literal', value: 2 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 3 },
    ]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should tokenize chained addition', () => {
    let code: string = '4+56+789'
    let expected: Token[] = [
      { type: 'literal', value: 4 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 56 },
      { type: 'operator', value: '+' },
      { type: 'literal', value: 789 },
    ]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should tokenize subtraction operator', () => {
    let code: string = '-'
    let expected: Token[] = [{ type: 'operator', value: '-' }]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should tokenize multiplication operator', () => {
    let code: string = '*'
    let expected: Token[] = [{ type: 'operator', value: '*' }]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })

  it('should tokenize division operator', () => {
    let code: string = '/'
    let expected: Token[] = [{ type: 'operator', value: '/' }]
    expect(Array.from(tokenize(code))).to.deep.equals(expected)
  })
})

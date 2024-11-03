import { MachineCode } from './04-code-generator'
import { executeCode } from './05-code-executor'
import { expect } from 'chai'

describe('Code Executor TestSuit', () => {
  it('should echo a literal number', () => {
    let code: MachineCode[] = [
      { operator: 'PUSH', value: 2 },
      { operator: 'POP' },
    ]
    let outputs = Array.from(executeCode(code))
    expect(outputs).to.deep.equal([2])
  })

  it('should add two numbers', () => {
    let code: MachineCode[] = [
      { operator: 'PUSH', value: 2 },
      { operator: 'PUSH', value: 3 },
      { operator: 'ADD' },
      { operator: 'POP' },
    ]
    let outputs = Array.from(executeCode(code))
    expect(outputs).to.deep.equal([5])
  })

  it('should subtract two numbers', () => {
    let code: MachineCode[] = [
      { operator: 'PUSH', value: 2 },
      { operator: 'PUSH', value: 3 },
      { operator: 'SUB' },
      { operator: 'POP' },
    ]
    let outputs = Array.from(executeCode(code))
    expect(outputs).to.deep.equal([-1])
  })

  it('should multiply two numbers', () => {
    let code: MachineCode[] = [
      { operator: 'PUSH', value: 2 },
      { operator: 'PUSH', value: 3 },
      { operator: 'MUL' },
      { operator: 'POP' },
    ]
    let outputs = Array.from(executeCode(code))
    expect(outputs).to.deep.equal([6])
  })

  it('should divide two numbers', () => {
    let code: MachineCode[] = [
      { operator: 'PUSH', value: 6 },
      { operator: 'PUSH', value: 3 },
      { operator: 'DIV' },
      { operator: 'POP' },
    ]
    let outputs = Array.from(executeCode(code))
    expect(outputs).to.deep.equal([2])
  })

  it('should do chained addition', () => {
    let code: MachineCode[] = [
      { operator: 'PUSH', value: 2 },
      { operator: 'PUSH', value: 3 },
      { operator: 'PUSH', value: 4 },
      { operator: 'ADD' },
      { operator: 'ADD' },
      { operator: 'POP' },
    ]
    let outputs = Array.from(executeCode(code))
    expect(outputs).to.deep.equal([9])
  })

  it('should do addition before multiply', () => {
    // 20 * (3 + 4)
    // 20 * 7
    // 140
    let code: MachineCode[] = [
      { operator: 'PUSH', value: 20 },
      { operator: 'PUSH', value: 3 },
      { operator: 'PUSH', value: 4 },
      { operator: 'ADD' },
      { operator: 'MUL' },
      { operator: 'POP' },
    ]
    let outputs = Array.from(executeCode(code))
    expect(outputs).to.deep.equal([140])
  })

  it('should do multiply before addition', () => {
    // 20 + (3 * 4)
    // 20 + 12
    // 32
    let code: MachineCode[] = [
      { operator: 'PUSH', value: 20 },
      { operator: 'PUSH', value: 3 },
      { operator: 'PUSH', value: 4 },
      { operator: 'MUL' },
      { operator: 'ADD' },
      { operator: 'POP' },
    ]
    let outputs = Array.from(executeCode(code))
    expect(outputs).to.deep.equal([32])
  })
})

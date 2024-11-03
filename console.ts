import { createIO } from 'cli-helpers'
import { tokenize } from './02-tokenizer'
import { parse } from './03-parser'
import { codeGen } from './04-code-generator'
import { executeCode } from './05-code-executor'

// REPL with JIT (Just-In-Time) compilation
async function main() {
  let io = createIO()

  async function read() {
    return await io.question('> ')
  }

  function evaluate(code: string) {
    let tokens = Array.from(tokenize(code))
    let ast = parse(tokens)
    let machineCode = Array.from(codeGen(ast))
    machineCode.push({ operator: 'POP' })
    return executeCode(machineCode)
  }

  function print(stream: Generator<number>) {
    for (let value of stream) {
      console.log(value)
    }
  }

  repl: for (;;) {
    let text = await read()
    text = text.trim()
    if (!text) {
      continue
    }
    switch (text) {
      case '.exit':
      case 'exit':
      case 'exit()':
      case 'bye':
      case 'quit':
        break repl
    }
    let result = evaluate(text)
    print(result)
  }

  io.close()
}

main()

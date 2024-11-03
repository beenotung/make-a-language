export type Token =
  | {
      type: 'literal'
      value: number
    }
  | {
      type: 'operator'
      value: '+' | '-' | '*' | '/'
    }

export function* tokenize(code: string): Generator<Token> {
  for (let i = 0; i < code.length; ) {
    let char = code[i]
    switch (char) {
      case '+':
      case '-':
      case '*':
      case '/':
        yield { type: 'operator', value: char }
        i++
        break
      case ' ':
      case '\t':
      case '\n':
      case '\r':
        i++
        break
      default: {
        if (isDigit(char)) {
          let value = Number(char)
          i++
          while (i < code.length) {
            let char = code[i]
            if (isDigit(char)) {
              value = value * 10 + Number(char)
              i++
            } else {
              break
            }
          }
          yield { type: 'literal', value }
          break
        }
        throw new Error(`Unexpected character: ${JSON.stringify(char)}`)
      }
    }
  }
}

function isDigit(char: string): boolean {
  return '0' <= char && char <= '9'
}

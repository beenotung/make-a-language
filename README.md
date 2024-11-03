# Make a Programming Language

A programming language implementation built with TDD, demonstrating how to parse source code, generate machine code, and execute it through an interactive REPL interface.

The language can be evolved iteratively with more features.

Live Coding Video Playback: https://youtube.com/live/ULzVRmtWo3U

## Key steps

1. programming language: source code in text
2. tokenizing: text -> tokens
3. parsing: tokens -> AST (Abstract Syntax Tree)
4. generate code: AST -> machine code
5. execute code: machine code -> result (outputs)

## Repl

Read-Eval-Print Loop

1. read: get source code in text from console
2. eval(compile): tokenize text -> tokens
3. eval(compile): parse tokens -> AST
4. eval(compile): translate AST -> machine code
5. eval(execute): execute machine code -> result
6. print: display result to console
7. loop: repeat from step 1

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
